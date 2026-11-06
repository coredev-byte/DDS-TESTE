import type { Metadata } from "next";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { toJsonLd } from "@/lib/structured-data";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { Contact } from "@/components/sections/contact";
import { RevealHeading } from "@/components/ui/reveal";
import { TrackedLink } from "@/components/ui/tracked-link";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button-styles";

const title = "Contato e orçamento";
const description =
  "Solicite seu orçamento com a DDS Reformas: fale direto com o Willis pelo WhatsApp (11) 97642-9839. Construção, reformas e retrofit em Alphaville e região.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contato" },
  openGraph: { type: "website", url: "/contato", title: `${title} | ${site.name}`, description },
};

function contactJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `${title} | ${site.name}`,
    url: `${site.url}/contato`,
    description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${site.url}/#site` },
    about: { "@id": `${site.url}/#empresa` },
  };
}

export default function ContatoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(contactJsonLd()) }} />
      <Header />
      <main id="conteudo" tabIndex={-1} className="focus:outline-none">
        <section
          aria-labelledby="contato-page-title"
          className="bg-ink pb-4 pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+6rem)]"
        >
          <div className="container-x">
            <p className="hero-in eyebrow text-gold">Contato</p>
            <RevealHeading
              as="h1"
              id="contato-page-title"
              className="text-display mt-5 max-w-[13ch] text-paper"
              text="Vamos conversar sobre a sua obra?"
            />

            <div className="mt-10 grid gap-10 border-t border-paper/10 pt-10 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-6">
                <p className="text-lead text-paper/75">
                  O atendimento é feito diretamente com {site.contact.person}. Chame no WhatsApp ou
                  preencha o pedido de orçamento abaixo: a mensagem já chega pronta.
                </p>
                <TrackedLink
                  href={whatsappUrl(whatsappMessages.quote())}
                  external
                  event="whatsapp_click"
                  eventParams={{ location: "contact_page_hero" }}
                  className={`${buttonStyles.primary} mt-8 min-h-14 px-7`}
                >
                  <WhatsAppIcon size={19} />
                  Chamar no WhatsApp
                </TrackedLink>
              </div>

              <dl className="divide-y divide-paper/10 border-y border-paper/10 md:col-span-5 md:col-start-8">
                <div className="flex items-center justify-between gap-4 py-4">
                  <dt className="text-sm text-stone">WhatsApp e telefone</dt>
                  <dd>
                    <TrackedLink
                      href={`tel:${site.contact.phoneE164}`}
                      event="phone_click"
                      eventParams={{ location: "contact_page" }}
                      className="tabular inline-flex min-h-11 items-center gap-2 font-medium text-paper hover:text-gold-light"
                    >
                      <Phone className="size-4 text-gold" strokeWidth={1.75} aria-hidden="true" />
                      {site.contact.phoneDisplay}
                    </TrackedLink>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-4">
                  <dt className="text-sm text-stone">Instagram</dt>
                  <dd>
                    <TrackedLink
                      href={site.contact.instagramUrl}
                      external
                      event="instagram_click"
                      eventParams={{ location: "contact_page" }}
                      className="inline-flex min-h-11 items-center gap-2 font-medium text-paper hover:text-gold-light"
                    >
                      <InstagramIcon size={17} className="text-gold" />
                      {site.contact.instagramHandle}
                      <ArrowUpRight className="size-3.5 text-paper/50" aria-hidden="true" />
                    </TrackedLink>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-4">
                  <dt className="text-sm text-stone">Atendimento</dt>
                  <dd className="inline-flex items-center gap-2 font-medium text-paper">
                    <MapPin className="size-4 text-gold" strokeWidth={1.75} aria-hidden="true" />
                    {site.region}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
