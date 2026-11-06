"use client";

import Image from "next/image";
import { useState } from "react";
import { Images } from "lucide-react";
import { STAGE_LABEL, type Project, type Stage } from "@/content/projects";
import { Lightbox } from "./lightbox";

const ORDER: Stage[] = ["antes", "durante", "depois"];

/**
 * Sequência Antes → Durante → Concluído: uma foto por etapa (as demais
 * ficam na galeria). No celular vira um carrossel horizontal.
 */
export function ProjectStages({ project }: { project: Project }) {
  const [open, setOpen] = useState<number | null>(null);
  const { images } = project;

  const stages = ORDER.map((stage) => {
    const list = images.filter((img) => img.stage === stage);
    const lead = stage === "depois" ? project.cover : list[0];
    return { stage, lead, count: list.length, index: images.indexOf(lead) };
  }).filter((s) => s.lead);

  return (
    <>
      <div className="relative mt-10 md:mt-12">
        {/* Linha do tempo */}
        <div className="mb-5 hidden grid-cols-[1fr_1fr_1.35fr] gap-4 md:grid lg:gap-6" aria-hidden="true">
          {stages.map((s, i) => (
            <div key={s.stage} className="relative flex items-center gap-3">
              <span className={`size-2.5 shrink-0 rounded-full ${s.stage === "depois" ? "bg-gold" : "border border-gold/70"}`} />
              {i < stages.length - 1 && (
                <span data-line="" className="h-px flex-1 bg-gradient-to-r from-gold/60 to-gold/10" />
              )}
            </div>
          ))}
        </div>

        <ol
          className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-[1fr_1fr_1.35fr] md:gap-4 md:overflow-visible md:px-0 lg:gap-6"
          aria-label={`Etapas da obra: ${project.title}`}
        >
          {stages.map((s) => (
            <li key={s.stage} className="w-[78%] shrink-0 snap-start xs:w-[70%] sm:w-[46%] md:w-auto">
              <button
                type="button"
                onClick={() => setOpen(s.index)}
                className="group/st relative block aspect-[3/4] w-full overflow-hidden bg-graphite text-left md:aspect-auto md:h-[clamp(22rem,42vw,34rem)]"
                aria-label={`${STAGE_LABEL[s.stage]}: ${s.lead.alt}. Abrir galeria`}
              >
                <Image
                  src={s.lead.src}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes={s.stage === "depois" ? "(min-width: 48rem) 40vw, 78vw" : "(min-width: 48rem) 28vw, 78vw"}
                  className="object-cover object-[50%_65%] transition-transform duration-700 ease-out group-hover/st:scale-[1.03] motion-reduce:transition-none"
                />
                <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" aria-hidden="true" />
                <span
                  className={`absolute left-3 top-3 inline-flex items-center rounded-full px-3 py-1.5 text-[0.75rem] font-semibold ${
                    s.stage === "depois" ? "bg-gold text-ink" : "bg-ink/75 text-paper backdrop-blur-sm"
                  }`}
                >
                  {STAGE_LABEL[s.stage]}
                </span>
                {s.count > 1 && (
                  <span className="tabular absolute bottom-3 right-3 inline-flex items-center gap-1.5 text-xs font-medium text-paper/90">
                    <Images className="size-3.5" aria-hidden="true" />+{s.count - 1}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setOpen(0)}
          className="group/arrow inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-paper underline decoration-gold decoration-1 underline-offset-[6px] hover:decoration-2"
        >
          <Images className="size-4 text-gold" aria-hidden="true" />
          Ver todas as fotos ({images.length})
        </button>
        <p className="text-xs text-stone md:hidden">Deslize para ver as etapas</p>
      </div>

      <Lightbox title={project.title} images={images} index={open} onChange={setOpen} />
    </>
  );
}
