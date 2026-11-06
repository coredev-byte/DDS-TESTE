"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { STAGE_LABEL, type ProjectImage } from "@/content/projects";
import { getLenis } from "@/lib/smooth-scroll";

type LightboxProps = {
  title: string;
  images: ProjectImage[];
  /** Índice aberto; null = fechado. */
  index: number | null;
  onChange: (index: number | null) => void;
};

/** Galeria em tela cheia: teclado, deslizar no celular, miniaturas e rótulo da etapa. */
export function Lightbox({ title, images, index, onChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const [shown, setShown] = useState(index ?? 0);
  const total = images.length;

  const go = useCallback(
    (delta: number) => onChange(((index ?? 0) + delta + total) % total),
    [index, onChange, total],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index === null) {
      if (dialog.open) dialog.close();
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShown(index);
    if (!dialog.open) {
      dialog.showModal();
      getLenis()?.stop();
    }
    const thumb = thumbsRef.current?.children[index] as HTMLElement | undefined;
    thumb?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [index]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      getLenis()?.start();
      onChange(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("keydown", onKey);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("keydown", onKey);
    };
  }, [go, onChange]);

  const current = images[shown];

  return (
    <dialog
      ref={dialogRef}
      data-lenis-prevent=""
      aria-label={`Fotos da obra: ${title}`}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-ink p-0 text-paper backdrop:bg-ink/90"
      onClick={(e) => {
        if (e.target === e.currentTarget) dialogRef.current?.close();
      }}
    >
      <div className="flex h-full flex-col">
        <div className="container-x flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-paper">{title}</p>
            <p className="text-xs text-stone">
              <span className="text-gold-light">{STAGE_LABEL[current.stage]}</span>
              <span className="tabular"> · {shown + 1} de {total}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex size-11 shrink-0 items-center justify-center border border-paper/15 hover:border-gold"
            aria-label="Fechar galeria"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <figure
          className="relative flex-1 select-none"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <Image
            key={shown}
            src={current.src}
            alt={current.alt}
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="object-contain"
          />
          {/* pré-carrega as fotos vizinhas para a navegação ficar instantânea */}
          {[shown + 1, shown - 1].map((i) => {
            const img = images[(i + total) % total];
            return total > 1 ? (
              <Image key={`pre-${i}`} src={img.src} alt="" fill sizes="100vw" loading="eager" className="pointer-events-none object-contain opacity-0" aria-hidden="true" />
            ) : null;
          })}
          <figcaption className="sr-only">{current.alt}</figcaption>
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-paper backdrop-blur-sm hover:bg-ink max-sm:hidden"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-paper backdrop-blur-sm hover:bg-ink max-sm:hidden"
                aria-label="Próxima foto"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}
        </figure>

        <div ref={thumbsRef} className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none]" aria-label="Miniaturas">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onChange(i)}
              aria-label={`Ver foto ${i + 1}: ${STAGE_LABEL[img.stage]}`}
              aria-current={i === shown ? "true" : undefined}
              className={`relative h-16 w-12 shrink-0 overflow-hidden border transition-opacity ${
                i === shown ? "border-gold opacity-100" : "border-transparent opacity-50 hover:opacity-90"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="48px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </dialog>
  );
}
