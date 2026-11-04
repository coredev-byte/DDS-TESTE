import { pillars } from "@/content/company";
import { site } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";

export function Pillars() {
  return (
    <section id="diferenciais" aria-labelledby="diferenciais-title" className="section-y bg-ink">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow text-gold">Diferenciais</p>
            <h2 id="diferenciais-title" className="text-h2 mt-5 text-paper">
              O que orienta cada obra.
            </h2>
            <p className="mt-6 max-w-[24rem] leading-relaxed text-stone">
              Quatro compromissos que a {site.name} assume com cada cliente — em projetos pequenos
              ou grandes.
            </p>
          </div>
        </Reveal>

        <ol className="grid border-t border-paper/12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {pillars.map((pillar, i) => (
            <Reveal
              as="li"
              key={pillar.title}
              delay={(i % 2) * 90}
              className={`border-b border-paper/12 py-9 sm:py-12 ${
                i % 2 === 0 ? "sm:border-r sm:pr-10" : "sm:pl-10"
              }`}
            >
              <span className="tabular block text-sm font-medium text-gold" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-[1.75rem] font-semibold tracking-[-0.02em] text-paper">
                {pillar.title}
              </h3>
              <p className="mt-3 max-w-[20rem] leading-relaxed text-paper/70">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
