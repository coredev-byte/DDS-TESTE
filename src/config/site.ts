/**
 * Dados comerciais oficiais da DDS Reformas.
 *
 * Tudo o que aparece no site (contato, região, frases) parte deste arquivo.
 * Informações que ainda não foram confirmadas pela empresa ficam como `null`
 * e simplesmente não são exibidas — não preencha com dados fictícios.
 */

const rawPhone = "5511976429839";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  // Disponível automaticamente em builds na Vercel.
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;

  return "http://localhost:3000";
}

export const site = {
  name: "DDS Reformas",
  legalLogoName: "DDS, Prestação de Serviços para Construção Civil",
  url: resolveSiteUrl(),
  locale: "pt_BR",

  tagline: "Construção, reformas e retrofit",
  region: "Alphaville e região",
  regionLong: "Alphaville e região, São Paulo",
  state: "SP",
  segments: ["Residencial", "Comercial"] as const,

  phrases: {
    hero: "Seu projeto, nossa execução.",
    foundation: "Do alicerce aos acabamentos.",
    signature: "Construindo com qualidade, do seu jeito.",
    excellence: "Excelência em cada detalhe!",
  },

  institutional:
    "Transformamos espaços em lugares ainda melhores para você viver, trabalhar e realizar seus sonhos.",

  contact: {
    person: "Willis Barreto",
    personFirstName: "Willis",
    phoneE164: `+${rawPhone}`,
    phoneDisplay: "(11) 97642-9839",
    phoneInternational: "+55 11 97642-9839",
    whatsappNumber: rawPhone,
    whatsappBase: `https://wa.me/${rawPhone}`,
    instagramUrl: "https://www.instagram.com/ddsreformas/",
    instagramHandle: "@ddsreformas",
    /** Ainda não informado pela empresa. */
    email: null as string | null,
    /** Ainda não informado pela empresa. Não exibir endereço sem confirmação. */
    address: null as string | null,
    /** Ainda não informado pela empresa. */
    cnpj: null as string | null,
  },
} as const;

export const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
] as const;
