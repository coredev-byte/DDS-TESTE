import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { projects, type Project } from "@/content/projects";
import { Reveal, RevealHeading } from "@/components/ui/reveal";
import { PlanSketch } from "@/components/ui/plan-sketch";
import { TrackedLink } from "@/components/ui/tracked-link";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button-styles";
import { ProjectGallery } from "./project-gallery";

function ProjectCard({ project, wide }: { project: Project; wide: boolean }) {
  return (
    <Reveal as="article" className={wide ? "md:col-span-2" : ""}>
      <div
        className={`relative overflow-hidden bg-paper-2 ${wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}
      >
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          placeholder="blur"
          sizes={wide ? "(min-width: 48rem) 90vw, 100vw" : "(min-width: 48rem) 45vw, 100vw"}
          className="object-cover"
        />
      </div>
      <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">
        <span>{project.category}</span>
        {project.location && <span className="text-slate">· {project.location}</span>}
      </div>
      <h3 className="text-h3 mt-2 text-ink">{project.title}</h3>
      <p className="mt-2 max-w-[38rem] leading-relaxed text-slate">{project.summary}</p>
      {project.services.length > 0 && (
        <p className="mt-3 text-sm text-ink/80">{project.services.join(" · ")}</p>
      )}
      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-2">
          <ProjectGallery title={project.title} images={[project.cover, ...project.gallery]} />
        </div>
      )}
    </Reveal>
  );
}

function ProjectsPlaceholder() {
  return (
    <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-12">
      <Reveal className="flex flex-col overflow-hidden border border-ink/12 bg-paper-2/60 p-6 sm:p-8 md:col-span-7 md:row-span-2">
        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-slate">
          Portfólio em preparação
        </span>
        <PlanSketch
          variant={1}
          className="my-6 aspect-[4/3] max-h-[19rem] w-full flex-1 text-ink/25"
        />
        <div className="mt-auto max-w-[28rem] border-t border-ink/12 pt-5">
          <p className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            Os próximos projetos da DDS serão publicados aqui.
          </p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">
            Cada projeto trará fotografias da obra, a categoria, a descrição do serviço executado e
            a localidade geral, quando autorizada pelo cliente.
          </p>
        </div>
      </Reveal>

      <Reveal
        delay={80}
        className="relative hidden min-h-[16rem] overflow-hidden border border-ink/12 bg-paper-2/60 md:col-span-5 md:block"
      >
        <PlanSketch variant={2} className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)] text-ink/20" />
        <span className="absolute bottom-5 left-6 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-slate">
          Espaço reservado
        </span>
      </Reveal>

      <Reveal
        delay={140}
        className="flex flex-col justify-between gap-8 bg-ink p-6 text-paper sm:p-8 md:col-span-5"
      >
        <div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold">
            Enquanto isso
          </p>
          <p className="mt-3 max-w-[22rem] leading-relaxed text-paper/80">
            Acompanhe a rotina e as publicações da {site.name} no Instagram.
          </p>
        </div>
        <TrackedLink
          href={site.contact.instagramUrl}
          external
          event="instagram_click"
          eventParams={{ location: "projects" }}
          className={`${buttonStyles.secondary} self-start`}
        >
          <InstagramIcon size={18} />
          {site.contact.instagramHandle}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </TrackedLink>
      </Reveal>
    </div>
  );
}

export function Projects() {
  const hasProjects = projects.length > 0;

  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="on-light section-y bg-paper text-ink"
    >
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-gold-deep">Projetos</p>
            <RevealHeading id="projetos-title" className="text-h2 mt-5" text="Obras executadas pela DDS." />
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={80}>
            <p className="leading-relaxed text-slate">
              {hasProjects
                ? "Uma seleção de obras realizadas pela DDS Reformas, apresentadas com autorização dos clientes."
                : "Este espaço é dedicado exclusivamente a obras reais da DDS Reformas. Para manter a transparência, nenhuma foto de banco de imagens é apresentada aqui como projeto executado."}
            </p>
          </Reveal>
        </div>

        {hasProjects ? (
          <div className="mt-14 grid gap-x-6 gap-y-14 md:mt-16 md:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} wide={i % 3 === 0} />
            ))}
          </div>
        ) : (
          <ProjectsPlaceholder />
        )}
      </div>
    </section>
  );
}
