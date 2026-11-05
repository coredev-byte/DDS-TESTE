import type { StaticImageData } from "next/image";
import ambiente from "@/assets/projetos/ambiente-finalizado.jpg";
import recepcao from "@/assets/projetos/recepcao-finalizada.jpg";
import forro from "@/assets/projetos/execucao-forro.jpg";
import piso from "@/assets/projetos/instalacao-piso.jpg";
import preparacao from "@/assets/projetos/preparacao-piso.jpg";

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

export const projects: Project[] = [
  {
    slug: "acabamentos-comerciais",
    title: "Acabamentos que transformam o ambiente",
    category: "Comercial",
    summary: "Da execução aos detalhes finais: uma seleção de ambientes com piso marmorizado, iluminação embutida e acabamentos claros.",
    services: ["Acabamentos", "Forro e iluminação", "Pisos e revestimentos"],
    cover: { src: ambiente, alt: "Ambiente com piso marmorizado, armários brancos e iluminação embutida no forro" },
    gallery: [
      { src: recepcao, alt: "Ambiente finalizado com balcão curvo, piso marmorizado e iluminação embutida" },
      { src: forro, alt: "Execução do forro em ambiente comercial, com piso protegido durante os trabalhos" },
    ],
  },
  {
    slug: "pisos-comerciais",
    title: "A renovação começa pela base",
    category: "Comercial",
    summary: "Registros da preparação do ambiente e da instalação de piso amadeirado em espaços comerciais.",
    services: ["Preparação do piso", "Instalação de piso"],
    cover: { src: piso, alt: "Instalação de piso amadeirado em sala comercial, com parte da manta ainda aparente" },
    gallery: [
      { src: preparacao, alt: "Sala comercial com base do piso exposta durante a preparação para o revestimento" },
    ],
  },
];
