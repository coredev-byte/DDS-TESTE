import { Phone } from "lucide-react";
import { site } from "@/config/site";
import { quoteSteps } from "@/content/company";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { Reveal, RevealHeading } from "@/components/ui/reveal";
import { TrackedLink } from "@/components/ui/tracked-link";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { QuoteForm } from "./quote-form";

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="section-y bg-ink">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
        {/* Como funciona */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-gold">Orçamento</p>
            <RevealHeading id="contato-title" className="text-h2 mt-5 text-paper" text="Como solicitar um orçamento." />
            <p className="mt-6 max-w-[28rem] leading-relaxed text-stone">
              Sem cadastro e sem intermediários: você descreve o que precisa e a conversa continua
              diretamente com a DDS.
            </p>
          </Reveal>

          <ol className="relative mt-12">
            {quoteSteps.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 80}
                className="relative grid grid-cols-[3rem_1fr] gap-x-4 pb-10 last:pb-0"
              >
                {i < quoteSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-[1.5rem] top-12 w-px bg-paper/12"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="tabular relative flex size-12 items-center justify-center border border-gold/50 font-display text-sm font-semibold text-gold-light"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-2.5">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-paper">
                    <span className="sr-only">Etapa {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[24rem] text-[0.9375rem] leading-relaxed text-stone">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-12 border-t border-paper/12 pt-8">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-silver">
              Prefere falar agora?
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
              <TrackedLink
                href={whatsappUrl(whatsappMessages.conversation())}
                external
                event="whatsapp_click"
                eventParams={{ location: "contact_direct" }}
                className="inline-flex min-h-11 items-center gap-2.5 text-paper transition-colors hover:text-gold-light"
              >
                <WhatsAppIcon size={18} className="text-gold" />
                WhatsApp com {site.contact.personFirstName}
              </TrackedLink>
              <TrackedLink
                href={`tel:${site.contact.phoneE164}`}
                event="phone_click"
                eventParams={{ location: "contact_direct" }}
                className="tabular inline-flex min-h-11 items-center gap-2.5 text-paper transition-colors hover:text-gold-light"
              >
                <Phone className="size-[18px] text-gold" strokeWidth={1.75} aria-hidden="true" />
                {site.contact.phoneDisplay}
              </TrackedLink>
            </div>
          </Reveal>
        </div>

        {/* Formulário */}
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={100}>
          <div id="orcamento" className="border border-paper/10 bg-graphite p-5 xs:p-6 sm:p-10">
            <div className="mb-8 border-b border-paper/10 pb-6">
              <h3 className="text-h3 text-paper">Pedido de orçamento</h3>
              <p className="mt-2 text-[0.9375rem] text-stone">
                Preencha em menos de um minuto. A mensagem abre pronta no WhatsApp.
              </p>
            </div>
            <QuoteForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
