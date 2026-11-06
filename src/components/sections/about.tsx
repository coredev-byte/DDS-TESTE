import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { fronts } from "@/content/services";
import { photos } from "@/content/images";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { Reveal, RevealHeading } from "@/components/ui/reveal";
import { TrackedLink } from "@/components/ui/tracked-link";
import { arrowIcon, arrowLink } from "@/components/ui/button-styles";

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="section-y relative z-10 bg-ink shadow-[0_-40px_80px_-20px_rgb(0_0_0/0.85)]"
    >
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold">Sobre a DDS</p>
            <RevealHeading id="sobre-title" className="text-h2 mt-5 text-paper" text="Do alicerce aos acabamentos." />
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-11" delay={80}>
            <p className="text-lead text-paper/85">
              Cada espaço tem necessidades próprias. A {site.name} oferece soluções para obras,
              melhorias e transformações de ambientes residenciais e comerciais, com atenção à
              qualidade, à execução e aos detalhes.
            </p>
            <p className="mt-5 leading-relaxed text-stone">
              {site.institutional} O atendimento é feito diretamente por {site.contact.person}, que
              conversa com você para entender o projeto e alinhar cada etapa.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <Reveal as="figure" variant="image" className="relative lg:col-span-7">
            <div data-frame="" className="relative aspect-[4/3] overflow-hidden bg-graphite lg:aspect-[7/6]">
              <Image
                src={photos.renovation.src}
                alt={photos.renovation.alt}
                fill
                data-parallax="0.07"
                placeholder="blur"
                sizes="(min-width: 64rem) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.6875rem] uppercase tracking-[0.14em] text-stone">
              Imagem ilustrativa
            </figcaption>
          </Reveal>

          <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-end">
            <Reveal>
              <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-silver">
                Frentes de atuação
              </h3>
            </Reveal>
            <ol className="mt-6 border-t border-paper/12">
              {fronts.map((front, i) => (
                <Reveal
                  as="li"
                  key={front.id}
                  delay={i * 70}
                  className="relative grid grid-cols-[2.5rem_1fr] gap-x-3 py-6"
                >
                  <span data-line="" aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-paper/12" />
                  <span className="tabular pt-1 text-sm font-medium text-gold" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-xl font-semibold tracking-tight text-paper">
                      {front.title}
                    </p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone">
                      {front.description}
                    </p>
                    <TrackedLink
                      href={whatsappUrl(whatsappMessages.service(front.title))}
                      external
                      event="service_click"
                      eventParams={{ service: front.title, location: "about" }}
                      className={`${arrowLink} mt-2 text-gold-light hover:text-gold`}
                      aria-label={`Consultar ${front.title.toLowerCase()} pelo WhatsApp`}
                    >
                      Consultar
                      <ArrowRight className={arrowIcon} aria-hidden="true" />
                    </TrackedLink>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
