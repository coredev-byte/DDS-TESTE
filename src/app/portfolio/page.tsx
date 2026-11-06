import type { Metadata } from "next";
import { site } from "@/config/site";
import { projects, STAGE_LABEL } from "@/content/projects";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { FinalCta } from "@/components/sections/final-cta";
import { ProjectCase } from "@/components/portfolio/project-case";
import { RevealHeading } from "@/components/ui/reveal";
import { toJsonLd } from "@/lib/structured-data";

const title = "Portfólio de obras";
const description =
  "Obras reais executadas pela DDS Reformas em Alphaville e região: o antes, o durante e o resultado de reformas comerciais e residenciais.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    url: "/portfolio",
    title: `${title} | ${site.name}`,
    description,
    images: [{ url: projects[0].cover.src.src, width: projects[0].cover.src.width, height: projects[0].cover.src.height, alt: projects[0].cover.alt }],
  },
};

function portfolioJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${title} | ${site.name}`,
    url: `${site.url}/portfolio`,
    description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${site.url}/#site` },
    about: { "@id": `${site.url}/#empresa` },
    hasPart: projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.summary,
      url: `${site.url}/portfolio#${p.slug}`,
      creator: { "@id": `${site.url}/#empresa` },
      image: p.images.map((img) => ({
        "@type": "ImageObject",
        contentUrl: `${site.url}${img.src.src}`,
        caption: `${STAGE_LABEL[img.stage]}: ${img.alt}`,
      })),
    })),
  };
}

export default function PortfolioPage() {
  const photos = projects.reduce((n, p) => n + p.images.length, 0);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(portfolioJsonLd()) }} />
      <Header />
      <main id="conteudo" tabIndex={-1} className="focus:outline-none">
        <section aria-labelledby="portfolio-title" className="relative bg-ink pb-6 pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+6rem)]">
          <div className="container-x">
            <p className="hero-in eyebrow text-gold">Portfólio</p>
            <RevealHeading
              as="h1"
              id="portfolio-title"
              className="text-display mt-5 max-w-[14ch] text-paper"
              text="Obras reais, do início ao fim."
            />
            <div className="mt-8 grid gap-8 border-t border-paper/10 pt-8 md:grid-cols-12">
              <p className="text-lead text-paper/75 md:col-span-7">
                Cada obra é mostrada em três momentos: como o espaço estava, a execução e o
                resultado. Toque nas fotos para ver a galeria completa.
              </p>
              <nav aria-label="Obras" className="md:col-span-4 md:col-start-9">
                <p className="tabular text-xs font-semibold uppercase tracking-[0.16em] text-stone">
                  {projects.length} obras · {photos} fotos
                </p>
                <ul className="mt-3">
                  {projects.map((p, i) => (
                    <li key={p.slug} className="border-b border-paper/10">
                      <a
                        href={`#${p.slug}`}
                        className="flex min-h-12 items-center justify-between gap-4 text-[0.9375rem] text-paper/85 transition-colors hover:text-gold-light"
                      >
                        {p.title}
                        <span className="tabular text-xs text-stone">{String(i + 1).padStart(2, "0")}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </section>

        {projects.map((project, i) => (
          <ProjectCase key={project.slug} project={project} index={i} />
        ))}

        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
