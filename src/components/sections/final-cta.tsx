import Image from "next/image";
import { site } from "@/config/site";
import { photos } from "@/content/images";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/reveal";
import { TrackedLink } from "@/components/ui/tracked-link";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button-styles";

export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-final-title"
      className="relative isolate overflow-hidden bg-ink"
    >
      <Image
        src={photos.team.src}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-[50%_40%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_8_8/0.94)_0%,rgb(8_8_8/0.86)_45%,rgb(8_8_8/0.6)_100%)]"
      />

      <div className="container-x py-24 md:py-32 lg:py-40">
        <Reveal className="max-w-[46rem]">
          <p className="eyebrow text-gold">{site.phrases.signature}</p>
          <h2
            id="cta-final-title"
            className="mt-6 font-display text-[clamp(2.25rem,1.5rem+3.2vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-paper"
          >
            Vamos transformar seu próximo projeto em realidade?
          </h2>
          <p className="text-lead mt-6 max-w-[32rem] text-paper/80">
            Entre em contato com a {site.name} e conte o que você precisa.
          </p>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <TrackedLink
              href={whatsappUrl(whatsappMessages.conversation())}
              external
              event="whatsapp_click"
              eventParams={{ location: "final_cta" }}
              className={`${buttonStyles.primary} min-h-14 px-8 text-base`}
            >
              <WhatsAppIcon size={20} />
              Falar com o {site.contact.personFirstName}
            </TrackedLink>
            <div className="text-sm leading-snug">
              <p className="text-stone">{site.contact.person}</p>
              <a
                href={`tel:${site.contact.phoneE164}`}
                className="tabular text-base font-medium text-paper underline decoration-paper/25 underline-offset-4 hover:decoration-gold"
              >
                {site.contact.phoneInternational}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
      <p className="absolute bottom-4 right-5 text-[0.625rem] uppercase tracking-[0.14em] text-paper/45 md:right-8">
        Imagem ilustrativa
      </p>
    </section>
  );
}
