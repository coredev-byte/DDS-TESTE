/** Os quatro pilares presentes no material comercial da DDS Reformas. */
export const pillars = [
  {
    title: "Qualidade",
    description: "Materiais de primeira linha e mão de obra especializada.",
  },
  {
    title: "Compromisso",
    description: "Respeito ao prazo e total dedicação ao seu projeto.",
  },
  {
    title: "Experiência",
    description: "Equipe qualificada e preparada para garantir o melhor resultado.",
  },
  {
    title: "Confiança",
    description: "Transparência, seriedade e parceria do início ao fim da obra.",
  },
] as const;

export const segments = [
  {
    id: "residencial" as const,
    eyebrow: "Para morar",
    title: "Reformas residenciais",
    description:
      "Casas, apartamentos e espaços de convivência. De ajustes pontuais a reformas completas, para deixar cada ambiente mais confortável, bonito e funcional.",
    items: [
      "Reformas completas ou de ambientes específicos",
      "Pintura, pisos e revestimentos",
      "Drywall para criar ou redividir espaços",
      "Instalações elétricas e hidráulicas",
    ],
    cta: "Orçamento residencial",
  },
  {
    id: "comercial" as const,
    eyebrow: "Para trabalhar",
    title: "Reformas comerciais",
    description:
      "Lojas, escritórios e ambientes profissionais. Adequações, melhorias e transformações para que o espaço acompanhe as necessidades do seu negócio.",
    items: [
      "Adequação e melhoria de ambientes",
      "Retrofit de imóveis existentes",
      "Divisórias e forros em drywall",
      "Manutenção elétrica e hidráulica",
    ],
    cta: "Orçamento comercial",
  },
] as const;

export const quoteSteps = [
  {
    title: "Conte sobre seu projeto",
    description: "Você informa o tipo de serviço e o que precisa realizar.",
  },
  {
    title: "Converse com a DDS",
    description: "O contato é direcionado ao WhatsApp da empresa.",
  },
  {
    title: "Alinhe os próximos passos",
    description:
      "Você conversa diretamente com o responsável para definir as informações necessárias ao orçamento.",
  },
] as const;
