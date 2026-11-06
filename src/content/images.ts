/**
 * Fotografias ilustrativas de banco de imagens (Unsplash — licença Unsplash,
 * uso comercial permitido). Elas NÃO representam obras executadas pela DDS
 * Reformas e não devem ser usadas no portfólio. Substitua por fotos próprias
 * da empresa assim que houver material autorizado.
 */
import heroHouse from "@/assets/photos/hero-casa-contemporanea.jpg";
import renovation from "@/assets/photos/reforma-em-andamento.jpg";
import structure from "@/assets/photos/obra-estrutura.jpg";
import painting from "@/assets/photos/pintura-rolo.jpg";
import bathroom from "@/assets/photos/banheiro-revestimento.jpg";
import residential from "@/assets/photos/residencial-sala.jpg";
import commercial from "@/assets/photos/comercial-escritorio.jpg";
import team from "@/assets/photos/obra-equipe.jpg";

export const photos = {
  hero: {
    src: heroHouse,
    alt: "Residência contemporânea iluminada ao entardecer, com fachada em vidro e jardim",
    source: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  renovation: {
    src: renovation,
    alt: "Ambiente em reforma com parede de tijolos aparentes e escoramento de madeira",
    source: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15",
  },
  structure: {
    src: structure,
    alt: "Vista aérea de obra com profissionais trabalhando sobre armações de aço",
    source: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
  },
  painting: {
    src: painting,
    alt: "Rolo de pintura aplicando tinta em uma parede",
    source: "https://images.unsplash.com/photo-1562259949-e8e7689d7828",
  },
  bathroom: {
    src: bathroom,
    alt: "Banheiro com revestimento cinza de grande formato, bancada de madeira e banheira",
    source: "https://images.unsplash.com/photo-1604709177225-055f99402ea3",
  },
  residential: {
    src: residential,
    alt: "Sala de estar ampla e iluminada, com sofá claro e painel de madeira",
    source: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  },
  commercial: {
    src: commercial,
    alt: "Escritório amplo com mesas de trabalho, piso de concreto e janelas do chão ao teto",
    source: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
  },
  team: {
    src: team,
    alt: "Profissionais de capacete analisando uma obra em andamento",
    source: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088",
  },
} as const;
