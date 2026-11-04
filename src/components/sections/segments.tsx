import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { segments } from "@/content/company";
import { photos } from "@/content/images";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { Reveal, RevealHeading } from "@/components/ui/reveal";
import { TrackedLink } from "@/components/ui/tracked-link";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

const segmentPhotos = {
  residencial: photos.residential,
  comercial: photos.commercial,
} as const;

export function Segments() {
  return (
    <section id="segmentos" aria-labelledby="segmentos-title" className="section-y bg-graphite">
      <div className="container-x">
        <Reveal className="max-w-[44rem]">
          <p className="eyebrow text-gold">Residencial e comercial</p>
          <RevealHeading id="segmentos-title" className="text-h2 mt-5 text-paper" text="Para morar ou para trabalhar, o cuidado com a obra é o mesmo." />
        </Reveal>

        <div className="mt-14 grid gap-16 md:mt-20 lg:grid-cols-2 lg:gap-x-10 xl:gap-x-16">
          {segments.map((segment, i) => {
            const photo = segmentPhotos[segment.id];
            return (
              <Reveal
                as="article"
                key={segment.id}
                delay={i * 90}
                className={`flex flex-col ${i === 1 ? "lg:pt-28" : ""}`}
                id={`segmento-${segment.id}`}
              >
                <Reveal as="figure" variant="image" className="relative">
                  <div
                    data-frame=""
                    className={`relative overflow-hidden bg-ink ${
                      i === 0 ? "aspect-[4/3] lg:aspect-[5/4]" : "aspect-[4/3] lg:aspect-[16/11]"
                    }`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      data-parallax="0.07"
                      placeholder="blur"
                      sizes="(min-width: 64rem) 46vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.6875rem] uppercase tracking-[0.14em] text-stone">
                    Imagem ilustrativa
                  </figcaption>
                </Reveal>

                <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-gold">
                      {segment.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-paper sm:text-[2rem]">
                      {segment.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 max-w-[34rem] leading-relaxed text-paper/75">
                  {segment.description}
                </p>

                <ul className="mt-6 max-w-[34rem] border-t border-paper/12">
                  {segment.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-b border-paper/12 py-3 text-[0.9375rem] text-paper/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <TrackedLink
                  href={whatsappUrl(whatsappMessages.segment(segment.id))}
                  external
                  event="whatsapp_click"
                  eventParams={{ location: `segment_${segment.id}` }}
                  className="group/arrow mt-7 inline-flex min-h-12 items-center gap-3 self-start border border-paper/25 px-5 text-[0.9375rem] font-semibold text-paper transition-colors duration-200 hover:border-gold hover:text-gold-light"
                >
                  <WhatsAppIcon size={17} className="text-gold" />
                  {segment.cta}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover/arrow:translate-x-1"
                    aria-hidden="true"
                  />
                </TrackedLink>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
