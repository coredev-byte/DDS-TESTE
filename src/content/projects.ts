import type { StaticImageData } from "next/image";

import clinicaAntes from "@/assets/projetos/clinica/antes-espaco-bruto.jpg";
import clinicaForro from "@/assets/projetos/clinica/durante-forro-drywall.jpg";
import clinicaAcabamento from "@/assets/projetos/clinica/durante-acabamento.jpg";
import clinicaSala from "@/assets/projetos/clinica/concluido-sala.jpg";
import clinicaRecepcao from "@/assets/projetos/clinica/concluido-recepcao.jpg";
import clinicaSalaVista from "@/assets/projetos/clinica/concluido-sala-vista.jpg";
import clinicaPorta from "@/assets/projetos/clinica/concluido-porta.jpg";

import escritorioAntes from "@/assets/projetos/escritorio/antes-contrapiso.jpg";
import escritorioRetirada from "@/assets/projetos/escritorio/durante-retirada.jpg";
import escritorioManta from "@/assets/projetos/escritorio/durante-manta.jpg";
import escritorioInstalacao from "@/assets/projetos/escritorio/durante-instalacao.jpg";
import escritorioConcluido from "@/assets/projetos/escritorio/concluido-piso.jpg";

/**
 * Portfólio de obras executadas pela DDS Reformas (fotos da própria empresa).
 *
 * Como adicionar uma obra:
 * 1. Salve as fotos em `src/assets/projetos/<slug>/` (JPG, até ~1800 px).
 * 2. Importe-as neste arquivo.
 * 3. Adicione um objeto em `projects`, marcando cada foto com a etapa:
 *    "antes", "durante" ou "depois". A página monta a sequência sozinha.
 *
 * Só publique localidade (`location`) e nomes de clientes com autorização.
 */

export type Stage = "antes" | "durante" | "depois";

export const STAGE_LABEL: Record<Stage, string> = {
  antes: "Antes",
  durante: "Durante a obra",
  depois: "Concluído",
};

export type ProjectImage = {
  src: StaticImageData;
  alt: string;
  stage: Stage;
};

export type Project = {
  slug: string;
  title: string;
  category: "Residencial" | "Comercial";
  /** Localidade geral. Preencha apenas com autorização do cliente. */
  location?: string;
  summary: string;
  services: string[];
  cover: ProjectImage;
  images: ProjectImage[];
};

const clinicaImages: ProjectImage[] = [
  { src: clinicaAntes, stage: "antes", alt: "Sala comercial no contrapiso, com tubulações aparentes e materiais de obra estocados" },
  { src: clinicaForro, stage: "durante", alt: "Profissional trabalhando no forro em drywall, com piso protegido" },
  { src: clinicaAcabamento, stage: "durante", alt: "Recepção na fase de acabamento, com porcelanato já assentado e piso sendo protegido" },
  { src: clinicaSala, stage: "depois", alt: "Sala concluída com porcelanato marmorizado, armários brancos e painéis de LED no forro" },
  { src: clinicaRecepcao, stage: "depois", alt: "Recepção concluída com porcelanato marmorizado, balcão ripado e forro com iluminação embutida" },
  { src: clinicaSalaVista, stage: "depois", alt: "Sala concluída com janelas amplas, forro com painéis de LED e piso marmorizado" },
  { src: clinicaPorta, stage: "depois", alt: "Porta de vidro jateado com adesivo decorativo na entrada da clínica" },
];

const escritorioImages: ProjectImage[] = [
  { src: escritorioAntes, stage: "antes", alt: "Escritório sem revestimento, com contrapiso exposto e marcas do piso anterior" },
  { src: escritorioInstalacao, stage: "durante", alt: "Profissional instalando réguas de piso laminado claro" },
  { src: escritorioManta, stage: "durante", alt: "Manta sob o piso aplicada e réguas de piso laminado sendo instaladas" },
  { src: escritorioRetirada, stage: "durante", alt: "Profissional organizando material durante a obra em sala comercial" },
  { src: escritorioConcluido, stage: "depois", alt: "Escritório concluído com piso laminado claro instalado em toda a sala" },
];

export const projects: Project[] = [
  {
    slug: "clinica-espaco-comercial",
    title: "Clínica em espaço comercial",
    category: "Comercial",
    summary:
      "Do espaço bruto à clínica pronta para atender: forro e divisórias em drywall, porcelanato marmorizado de grande formato, iluminação com painéis de LED, pintura e acabamentos.",
    services: ["Drywall", "Pisos e revestimentos", "Elétrica", "Pintura"],
    cover: clinicaImages[3],
    images: clinicaImages,
  },
  {
    slug: "escritorio-piso-laminado",
    title: "Novo piso para escritório",
    category: "Comercial",
    summary:
      "Preparação do contrapiso e instalação de piso laminado com manta, renovando por completo o ambiente de trabalho.",
    services: ["Pisos e revestimentos"],
    cover: escritorioImages[4],
    images: escritorioImages,
  },
];
