import Image from "next/image";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import logo from "@/assets/brand/dds-logo.png";
import { navigation, site } from "@/config/site";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { TrackedLink } from "@/components/ui/tracked-link";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/brand-icons";
import { CurrentYear } from "./current-year";

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink pb-24 pt-16 md:pb-10 md:pt-20">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Image
              src={logo}
              alt={site.legalLogoName}
              sizes="176px"
              className="h-auto w-36 sm:w-44"
            />
            <p className="mt-6 font-display text-lg font-semibold tracking-tight text-paper">
              {site.name}
            </p>
            <p className="mt-1 text-[0.9375rem] text-stone">{site.tagline}</p>
            <p className="mt-6 max-w-[22rem] text-sm leading-relaxed text-paper/60">
              {site.phrases.signature}
            </p>
          </div>

          <nav aria-label="Rodapé" className="md:col-span-3">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-silver">
              Navegação
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 md:grid-cols-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-10 items-center text-[0.9375rem] text-paper/75 transition-colors hover:text-gold-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-silver">
              Contato
            </p>
            <ul className="mt-4 space-y-1 text-[0.9375rem]">
              <li>
                <TrackedLink
                  href={whatsappUrl(whatsappMessages.quote())}
                  external
                  event="whatsapp_click"
                  eventParams={{ location: "footer" }}
                  className="inline-flex min-h-10 items-center gap-3 text-paper/85 transition-colors hover:text-gold-light"
                >
                  <WhatsAppIcon size={17} className="text-gold" />
                  WhatsApp · {site.contact.person}
                </TrackedLink>
              </li>
              <li>
                <TrackedLink
                  href={`tel:${site.contact.phoneE164}`}
                  event="phone_click"
                  eventParams={{ location: "footer" }}
                  className="tabular inline-flex min-h-10 items-center gap-3 text-paper/85 transition-colors hover:text-gold-light"
                >
                  <Phone className="size-[17px] text-gold" strokeWidth={1.75} aria-hidden="true" />
                  {site.contact.phoneInternational}
                </TrackedLink>
              </li>
              <li>
                <TrackedLink
                  href={site.contact.instagramUrl}
                  external
                  event="instagram_click"
                  eventParams={{ location: "footer" }}
                  className="inline-flex min-h-10 items-center gap-3 text-paper/85 transition-colors hover:text-gold-light"
                >
                  <InstagramIcon size={17} className="text-gold" />
                  {site.contact.instagramHandle}
                  <ArrowUpRight className="size-3.5 text-paper/50" aria-hidden="true" />
                </TrackedLink>
              </li>
              <li className="flex min-h-10 items-center gap-3 text-paper/85">
                <MapPin className="size-[17px] text-gold" strokeWidth={1.75} aria-hidden="true" />
                {site.regionLong}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/10 pt-6 text-xs leading-relaxed text-stone md:flex-row md:items-start md:justify-between md:gap-10">
          <p>
            © <CurrentYear /> {site.name}. Todos os direitos reservados.
          </p>
          <p className="max-w-[40rem] md:text-right">
            Fotografias de banco de imagens (Unsplash), meramente ilustrativas. Não representam
            obras executadas pela {site.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
