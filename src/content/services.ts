/**
 * Serviços oficiais (material comercial da DDS Reformas).
 * Os textos de descrição são os mesmos utilizados no panfleto da empresa.
 */
export type Service = {
  id: string;
  title: string;
  description: string;
  group: "estrutura" | "acabamentos";
};

export const services: Service[] = [
  {
    id: "reformas-em-geral",
    title: "Reformas em geral",
    description: "Do pequeno ao grande projeto, com qualidade e acabamento impecável.",
    group: "estrutura",
  },
  {
    id: "alvenaria",
    title: "Alvenaria",
    description: "Construção e reparos com estrutura sólida e segura.",
    group: "estrutura",
  },
  {
    id: "drywall",
    title: "Drywall",
    description: "Ambientes modernos, funcionais e com acabamento perfeito.",
    group: "estrutura",
  },
  {
    id: "pintura",
    title: "Pintura",
    description: "Mais cor, vida e valorização para o seu imóvel.",
    group: "acabamentos",
  },
  {
    id: "pisos-e-revestimentos",
    title: "Pisos e revestimentos",
    description: "Beleza, resistência e sofisticação em cada detalhe.",
    group: "acabamentos",
  },
  {
    id: "eletrica",
    title: "Elétrica",
    description: "Instalações e manutenções com segurança e conformidade.",
    group: "acabamentos",
  },
  {
    id: "hidraulica",
    title: "Hidráulica",
    description: "Soluções eficientes para o seu dia a dia, sem dor de cabeça.",
    group: "acabamentos",
  },
];

/** Frentes de atuação — exibidas na apresentação institucional. */
export const fronts = [
  {
    id: "construcao",
    title: "Construção",
    description: "Execução de obras com estrutura sólida, do alicerce aos acabamentos.",
  },
  {
    id: "reformas",
    title: "Reformas",
    description: "Melhorias e transformações completas ou pontuais, do pequeno ao grande projeto.",
  },
  {
    id: "retrofit",
    title: "Retrofit",
    description: "Atualização de imóveis existentes para torná-los mais funcionais, modernos e valorizados.",
  },
] as const;

/** Opções do campo "Serviço desejado" no formulário de orçamento. */
export const quoteServiceOptions: string[] = [
  "Construção",
  "Retrofit",
  ...services.map((s) => s.title),
  "Mais de um serviço / ainda não sei",
];
