import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import { site } from "@/config/site";
import { photos } from "@/content/images";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { TrackedLink } from "@/components/ui/tracked-link";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button-styles";

const facts = [
  { label: "Atuação", value: "Construção, reformas e retrofit" },
  { label: "Segmentos", value: "Residencial e comercial" },
  { label: "Região", value: site.region },
];

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink lg:min-h-[max(42rem,min(100svh,60rem))]"
    >
      <div className="container-x relative z-10 flex flex-col pt-[calc(var(--header-h)+2.5rem)] sm:pt-[calc(var(--header-h)+3.5rem)] lg:min-h-[inherit] lg:pt-[calc(var(--header-h)+4rem)] lg:pb-10">
        <div className="max-w-[36rem] lg:my-auto lg:max-w-[min(40rem,48%)] lg:pr-6 xl:pr-0">
          <p className="hero-in eyebrow text-gold">
            Construção · Reformas · Retrofit
          </p>

          <h1
            id="hero-title"
            className="text-display mt-6 text-paper"
          >
            Seu projeto, <span className="whitespace-nowrap">nossa execução</span>
            <span className="text-gold">.</span>
          </h1>

          <p
            className="text-lead mt-6 max-w-[34rem] text-paper/75"
          >
            Reformas, construções e retrofit para espaços residenciais e comerciais. Qualidade em
            cada etapa, do alicerce ao acabamento.
          </p>

          <p
            className="hero-in mt-6 flex items-center gap-2 text-sm font-medium text-silver"
            style={{ ["--hero-delay" as string]: "200ms" }}
          >
            <MapPin className="size-4 text-gold" strokeWidth={1.75} aria-hidden="true" />
            Atendimento em {site.region}
          </p>

          <div
            className="hero-in mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            style={{ ["--hero-delay" as string]: "260ms" }}
          >
            <TrackedLink
              href={whatsappUrl(whatsappMessages.quote())}
              external
              event="whatsapp_click"
              eventParams={{ location: "hero" }}
              className={`${buttonStyles.primary} min-h-14 px-5 text-center sm:px-7`}
            >
              <WhatsAppIcon size={19} />
              Solicitar orçamento pelo WhatsApp
            </TrackedLink>
            <a href="#servicos" className={`${buttonStyles.secondary} min-h-14 px-7`}>
              Conhecer nossos serviços
              <ArrowDown
                className="size-4 transition-transform duration-200 group-hover/btn:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <p
            className="hero-in mt-5 text-sm text-stone"
            style={{ ["--hero-delay" as string]: "320ms" }}
          >
            Fale direto com {site.contact.person} ·{" "}
            <a
              href={`tel:${site.contact.phoneE164}`}
              className="tabular whitespace-nowrap text-paper/85 underline decoration-paper/25 underline-offset-4 transition-colors hover:text-gold-light hover:decoration-gold"
            >
              {site.contact.phoneDisplay}
            </a>
          </p>
        </div>

        {/* Faixa de informações essenciais */}
        <dl className="mt-12 hidden grid-cols-3 border-t border-paper/12 pt-6 lg:mt-14 lg:grid lg:max-w-[48%]">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              className={`pr-5 ${i > 0 ? "border-l border-paper/12 pl-5" : ""}`}
            >
              <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-stone">
                {fact.label}
              </dt>
              <dd className="mt-2 text-sm font-medium leading-snug text-paper/90">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Fotografia: abaixo do texto no mobile, coluna direita no desktop */}
      <div className="relative mt-12 aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[calc(50vw-5rem)]">
        <Image
          src={photos.hero.src}
          alt={photos.hero.alt}
          fill
          preload
          fetchPriority="high"
          placeholder="blur"
          sizes="(min-width: 64rem) 50vw, 100vw"
          className="image-in object-cover object-[60%_50%]"
        />
        {/* Integração com o fundo: transições suaves, sem filtros artificiais */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/70 to-transparent max-lg:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-ink to-transparent max-lg:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink to-transparent lg:hidden"
        />
      </div>

      {/* Fatos essenciais — mobile/tablet */}
      <dl className="container-x grid grid-cols-1 divide-y divide-paper/10 py-4 xs:grid-cols-3 xs:divide-x xs:divide-y-0 lg:hidden">
        {facts.map((fact) => (
          <div key={fact.label} className="py-3 xs:px-3 xs:first:pl-0">
            <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-stone">
              {fact.label}
            </dt>
            <dd className="mt-1.5 text-sm font-medium leading-snug text-paper/90">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
