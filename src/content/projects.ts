import type { StaticImageData } from "next/image";

/**
 * Portfólio de obras executadas pela DDS Reformas.
 *
 * IMPORTANTE: adicione aqui somente obras reais, com fotos da própria DDS e
 * autorização do cliente para divulgação. Enquanto a lista estiver vazia, o
 * site exibe uma área preparada para os próximos projetos — sem inventar obras.
 *
 * Como adicionar um projeto:
 * 1. Salve as fotos em `src/assets/projetos/<slug>/` (JPG, ~1800 px de largura).
 * 2. Importe as imagens neste arquivo.
 * 3. Adicione um objeto ao array `projects`, por exemplo:
 *
 *   import capa from "@/assets/projetos/apartamento-alphaville/capa.jpg";
 *   import sala from "@/assets/projetos/apartamento-alphaville/sala.jpg";
 *
 *   {
 *     slug: "apartamento-alphaville",
 *     title: "Reforma de apartamento",
 *     category: "Residencial",
 *     location: "Alphaville, Barueri",   // opcional — só se autorizado
 *     summary: "Descrição curta do serviço executado.",
 *     services: ["Pintura", "Pisos e revestimentos"],
 *     cover: { src: capa, alt: "Sala integrada após a reforma" },
 *     gallery: [{ src: sala, alt: "Detalhe do piso" }],
 *   }
 */

export type ProjectImage = {
  src: StaticImageData;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  category: "Residencial" | "Comercial" | "Construção" | "Retrofit";
  /** Localidade geral. Preencha apenas com autorização do cliente. */
  location?: string;
  summary: string;
  services: string[];
  cover: ProjectImage;
  gallery?: ProjectImage[];
};

export const projects: Project[] = [];
