import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { projects } from "@/content/projects";
import { Reveal, RevealHeading } from "@/components/ui/reveal";
import { TrackedLink } from "@/components/ui/tracked-link";
import { arrowIcon, arrowLink, buttonStyles } from "@/components/ui/button-styles";

/** Vitrine na página inicial: as obras em destaque e o caminho para o portfólio completo. */
export function Projects() {
  const featured = projects.slice(0, 2);

  return (
    <section id="projetos" aria-labelledby="projetos-title" className="on-light section-y bg-paper text-ink">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-gold-deep">Portfólio</p>
            <RevealHeading id="projetos-title" className="text-h2 mt-5" text="Obras executadas pela DDS." />
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={80}>
            <p className="leading-relaxed text-slate">
              Do espaço bruto ao acabamento: veja como o ambiente estava, a execução e o resultado
              de obras reais da {site.name}.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-6 lg:gap-8">
          {featured.map((p, i) => {
            const before = p.images.find((img) => img.stage === "antes");
            return (
              <Reveal
                as="article"
                key={p.slug}
                delay={i * 100}
                className={i === 0 ? "md:col-span-7" : "md:col-span-5 md:pt-24"}
              >
                <a href={`/portfolio#${p.slug}`} className="group/card block" aria-label={`Ver a obra: ${p.title}`}>
                  <div className={`relative overflow-hidden bg-paper-2 ${i === 0 ? "aspect-[4/5]" : "aspect-[3/4]"}`}>
                    <Image
                      src={p.cover.src}
                      alt={p.cover.alt}
                      fill
                      placeholder="blur"
                      sizes={i === 0 ? "(min-width: 48rem) 55vw, 100vw" : "(min-width: 48rem) 40vw, 100vw"}
                      className="object-cover object-[50%_72%] transition-transform duration-700 ease-out group-hover/card:scale-[1.03] motion-reduce:transition-none"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1.5 text-[0.75rem] font-semibold text-ink">
                      Concluído
                    </span>
                    {before && (
                      <span className="absolute bottom-3 left-3 block w-[30%] max-w-36 overflow-hidden border-2 border-paper shadow-[0_12px_30px_-8px_rgb(0_0_0/0.6)]">
                        <span className="relative block aspect-[3/4]">
                          <Image src={before.src} alt="" fill sizes="144px" className="object-cover" />
                        </span>
                        <span className="absolute inset-x-0 bottom-0 bg-ink/75 py-1 text-center text-[0.6875rem] font-semibold text-paper">
                          Antes
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">
                    {p.category} · {p.services.join(" · ")}
                  </p>
                  <h3 className="text-h3 mt-2 text-ink">{p.title}</h3>
                  <span className={`${arrowLink} mt-1 text-ink`}>
                    Ver a obra
                    <ArrowRight className={`${arrowIcon} text-gold-deep group-hover/card:translate-x-1`} aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 flex flex-col gap-4 border-t border-ink/12 pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-16">
          <a href="/portfolio" className={`${buttonStyles.dark} self-start`}>
            Ver portfólio completo
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <TrackedLink
            href={site.contact.instagramUrl}
            external
            event="instagram_click"
            eventParams={{ location: "projects" }}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-slate hover:text-ink"
          >
            Mais obras no Instagram {site.contact.instagramHandle}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </TrackedLink>
        </Reveal>
      </div>
    </section>
  );
}
