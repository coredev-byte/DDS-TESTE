import { site } from "@/config/site";

const greeting = `Olá, ${site.contact.personFirstName}! Vim pelo site da ${site.name}`;

/** Monta o link wa.me com a mensagem corretamente codificada. */
export function whatsappUrl(message?: string): string {
  if (!message) return site.contact.whatsappBase;
  return `${site.contact.whatsappBase}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  quote: () => `${greeting} e gostaria de solicitar um orçamento.`,

  service: (service: string) =>
    `${greeting} e gostaria de consultar o serviço de ${service.toLowerCase()}.`,

  segment: (segment: "residencial" | "comercial") =>
    `${greeting} e gostaria de solicitar um orçamento para uma reforma ${segment}.`,

  conversation: () => `${greeting} e gostaria de conversar sobre um projeto.`,

  portfolio: (project: string) =>
    `${greeting}, vi a obra "${project}" no portfólio e gostaria de um orçamento para um projeto parecido.`,
};

export type QuoteFormData = {
  name: string;
  propertyType: string;
  service: string;
  location: string;
  details: string;
};

export function quoteMessage(data: QuoteFormData): string {
  const lines = [
    `${greeting} e gostaria de solicitar um orçamento.`,
    "",
    `Nome: ${data.name.trim()}`,
    `Tipo de imóvel: ${data.propertyType}`,
    `Serviço: ${data.service}`,
    `Local: ${data.location.trim()}`,
  ];
  const details = data.details.trim();
  if (details) lines.push(`Detalhes: ${details}`);
  return lines.join("\n");
}
