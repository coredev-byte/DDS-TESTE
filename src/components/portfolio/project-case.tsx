import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { Reveal, RevealHeading } from "@/components/ui/reveal";
import { TrackedLink } from "@/components/ui/tracked-link";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { arrowIcon } from "@/components/ui/button-styles";
import { ProjectStages } from "./project-stages";

export function ProjectCase({ project, index }: { project: Project; index: number }) {
  const titleId = `obra-${project.slug}`;
  return (
    <section
      id={project.slug}
      aria-labelledby={titleId}
      className={`section-y relative ${index % 2 ? "bg-graphite" : "bg-ink"}`}
    >
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-gold">
              <span className="tabular">{String(index + 1).padStart(2, "0")}</span> · {project.category}
              {project.location ? ` · ${project.location}` : ""}
            </p>
            <RevealHeading id={titleId} className="text-h2 mt-4 text-paper" text={project.title} />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={80}>
            <p className="leading-relaxed text-paper/75">{project.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Serviços executados">
              {project.services.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-paper/15 px-3 py-1 text-[0.8125rem] font-medium text-paper/80"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <ProjectStages project={project} />
        </Reveal>

        <Reveal className="mt-10 flex flex-col gap-3 border-t border-paper/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.9375rem] text-stone">Tem um espaço parecido para transformar?</p>
          <TrackedLink
            href={whatsappUrl(whatsappMessages.portfolio(project.title))}
            external
            event="whatsapp_click"
            eventParams={{ location: `portfolio_${project.slug}` }}
            className="group/arrow inline-flex min-h-11 items-center gap-2.5 self-start text-[0.9375rem] font-semibold text-gold-light hover:text-gold sm:self-auto"
          >
            <WhatsAppIcon size={17} />
            Quero um orçamento assim
            <ArrowRight className={arrowIcon} aria-hidden="true" />
          </TrackedLink>
        </Reveal>
      </div>
    </section>
  );
}
