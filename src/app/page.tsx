import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Segments } from "@/components/sections/segments";
import { Pillars } from "@/components/sections/pillars";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { FinalCta } from "@/components/sections/final-cta";
import { organizationJsonLd, toJsonLd, websiteJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd([organizationJsonLd(), websiteJsonLd()]) }}
      />
      <Header />
      <main id="conteudo" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <About />
        <Services />
        <Segments />
        <Pillars />
        <Projects />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
