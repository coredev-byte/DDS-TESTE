"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectImage } from "@/content/projects";

type ProjectGalleryProps = {
  title: string;
  images: ProjectImage[];
};

/** Galeria em <dialog> nativo: foco, Esc e leitura por tecnologia assistiva. */
export function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const total = images.length;
  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
    };
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
  }, [total]);

  if (!total) return null;
  const current = images[index];

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIndex(0);
          dialogRef.current?.showModal();
        }}
        className="inline-flex min-h-11 items-center text-sm font-semibold text-ink underline decoration-gold-deep underline-offset-[6px]"
      >
        Ver galeria ({total} {total === 1 ? "foto" : "fotos"})
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`Galeria — ${title}`}
        className="m-auto h-[100dvh] max-h-none w-screen max-w-none bg-ink/95 p-0 text-paper backdrop:bg-ink/80"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="container-x flex h-full flex-col py-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-paper/80">
              {title} <span className="tabular text-stone">· {index + 1}/{total}</span>
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="inline-flex size-11 items-center justify-center"
              aria-label="Fechar galeria"
            >
              <X className="size-6" strokeWidth={1.5} />
            </button>
          </div>
          <figure className="relative my-4 flex-1">
            <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
          </figure>
          {total > 1 && (
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="inline-flex size-12 items-center justify-center border border-paper/25 hover:border-gold"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="inline-flex size-12 items-center justify-center border border-paper/25 hover:border-gold"
                aria-label="Próxima foto"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
