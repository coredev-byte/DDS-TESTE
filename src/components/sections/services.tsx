import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { services, type Service } from "@/content/services";
import { photos } from "@/content/images";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { Reveal, RevealHeading } from "@/components/ui/reveal";
import { TrackedLink } from "@/components/ui/tracked-link";
import { arrowIcon, arrowLink } from "@/components/ui/button-styles";

const structure = services.filter((s) => s.group === "estrutura");
const finishing = services.filter((s) => s.group === "acabamentos");

function ServiceRow({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal
      as="li"
      delay={(index % 4) * 60}
      className="group/row relative grid grid-cols-[2.25rem_1fr] gap-x-4 py-7 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-x-6"
    >
      <span data-line="" aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-ink/12" />
      <span className="tabular text-sm font-semibold text-gold-deep" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="max-w-[30rem]">
        <h3 id={`servico-${service.id}`} className="text-h3 text-ink">
          {service.title}
        </h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{service.description}</p>
      </div>
      <TrackedLink
        href={whatsappUrl(whatsappMessages.service(service.title))}
        external
        event="service_click"
        eventParams={{ service: service.title, location: "services" }}
        aria-label={`Consultar serviço de ${service.title.toLowerCase()} pelo WhatsApp`}
        className={`${arrowLink} col-start-2 mt-3 text-ink underline decoration-ink/25 hover:decoration-gold-deep sm:col-start-3 sm:mt-0 sm:no-underline sm:hover:underline`}
      >
        Consultar serviço
        <ArrowRight className={`${arrowIcon} text-gold-deep`} aria-hidden="true" />
      </TrackedLink>
    </Reveal>
  );
}

export function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="on-light section-y bg-paper text-ink"
    >
      <div className="container-x">
        {/* Cabeçalho da seção */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-gold-deep">Serviços</p>
            <RevealHeading id="servicos-title" className="text-h2 mt-5 max-w-[16ch]" text="Soluções completas para a sua obra." />
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={80}>
            <p className="leading-relaxed text-slate">
              Da estrutura às instalações, cada etapa é executada com cuidado e atenção ao
              acabamento. Escolha um serviço e fale direto com a DDS pelo WhatsApp.
            </p>
          </Reveal>
        </div>

        {/* Composição 1 — Obra e estrutura */}
        <div className="mt-16 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <Reveal as="figure" variant="image" className="lg:col-span-5">
            <div data-frame="" className="relative aspect-[4/3] overflow-hidden bg-paper-2 lg:sticky lg:top-28 lg:aspect-[4/5]">
              <Image
                src={photos.structure.src}
                alt={photos.structure.alt}
                fill
                data-parallax="0.06"
                placeholder="blur"
                sizes="(min-width: 64rem) 40vw, 100vw"
                className="object-cover object-[45%_50%]"
              />
            </div>
            <figcaption className="mt-3 text-[0.6875rem] uppercase tracking-[0.14em] text-slate">
              Imagem ilustrativa
            </figcaption>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-4">
              <p className="font-display text-lg font-semibold tracking-tight">Obra e estrutura</p>
              <p className="tabular text-xs font-medium uppercase tracking-[0.14em] text-slate">
                3 serviços
              </p>
            </div>
            <ul>
              {structure.map((service, i) => (
                <ServiceRow key={service.id} service={service} index={i} />
              ))}
            </ul>
          </div>
        </div>

        {/* Composição 2 — Acabamentos e instalações (ordem invertida) */}
        <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-4">
              <p className="font-display text-lg font-semibold tracking-tight">
                Acabamentos e instalações
              </p>
              <p className="tabular text-xs font-medium uppercase tracking-[0.14em] text-slate">
                4 serviços
              </p>
            </div>
            <ul>
              {finishing.map((service, i) => (
                <ServiceRow key={service.id} service={service} index={i + structure.length} />
              ))}
            </ul>
          </div>

          <div className="order-1 grid grid-cols-12 gap-3 sm:gap-4 lg:order-2 lg:col-span-5 lg:col-start-8 lg:content-start">
            <Reveal as="figure" variant="image" className="col-span-7">
              <div data-frame="" className="relative aspect-[3/4] overflow-hidden bg-paper-2">
                <Image
                  src={photos.painting.src}
                  alt={photos.painting.alt}
                  fill
                  data-parallax="0.06"
                  placeholder="blur"
                  sizes="(min-width: 64rem) 24vw, 58vw"
                  className="object-cover object-[40%_50%]"
                />
              </div>
            </Reveal>
            <Reveal as="figure" variant="image" className="col-span-5 self-end" delay={100}>
              <div data-frame="" className="relative aspect-[4/5] overflow-hidden bg-paper-2">
                <Image
                  src={photos.bathroom.src}
                  alt={photos.bathroom.alt}
                  fill
                  data-parallax="0.06"
                  placeholder="blur"
                  sizes="(min-width: 64rem) 17vw, 42vw"
                  className="object-cover object-[30%_50%]"
                />
              </div>
            </Reveal>
            <p className="col-span-12 text-[0.6875rem] uppercase tracking-[0.14em] text-slate">
              Imagens ilustrativas
            </p>
          </div>
        </div>

        <Reveal className="mt-16 flex flex-col gap-4 border-t border-ink/12 pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-20">
          <p className="max-w-[36rem] text-slate">
            Precisa de mais de um serviço ou ainda não sabe por onde começar? Descreva o projeto e a
            DDS ajuda a organizar as etapas.
          </p>
          <a
            href="#contato"
            className={`${arrowLink} shrink-0 text-ink underline decoration-gold-deep decoration-1 hover:decoration-2`}
          >
            Montar meu pedido de orçamento
            <ArrowRight className={`${arrowIcon} text-gold-deep`} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
