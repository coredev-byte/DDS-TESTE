import { site } from "@/config/site";
import { fronts, services } from "@/content/services";

/**
 * Dados estruturados (schema.org) usando apenas informações confirmadas.
 * Endereço, CNPJ, horário e avaliações NÃO são incluídos até serem
 * fornecidos pela empresa.
 */
export function organizationJsonLd() {
  const offered = [...fronts.map((f) => f.title), ...services.map((s) => s.title)];

  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${site.url}/#empresa`,
    name: site.name,
    alternateName: site.legalLogoName,
    description:
      "Construção, reformas e retrofit para espaços residenciais e comerciais em Alphaville e região.",
    slogan: site.phrases.hero,
    url: site.url,
    logo: `${site.url}/marca/dds-logo.png`,
    image: `${site.url}/opengraph-image.jpg`,
    telephone: site.contact.phoneE164,
    sameAs: [site.contact.instagramUrl],
    areaServed: [
      { "@type": "Place", name: "Alphaville e região" },
      { "@type": "State", name: "São Paulo" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.contact.phoneE164,
      contactType: "sales",
      name: site.contact.person,
      areaServed: "BR",
      availableLanguage: ["Portuguese"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de construção e reforma",
      itemListElement: offered.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#site`,
    name: site.name,
    url: site.url,
    inLanguage: "pt-BR",
    publisher: { "@id": `${site.url}/#empresa` },
  };
}

/** Serializa com escape de "<" para evitar injeção em <script>. */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
