import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
};

/**
 * Marca um bloco para a revelação discreta no scroll.
 * Sem JavaScript, ou com movimento reduzido, o conteúdo aparece normalmente.
 * O atributo `data-revealed` é aplicado pelo script em `RevealScript`.
 */
export function Reveal({ as: Tag = "div", delay = 0, className, children, id }: RevealProps) {
  return (
    <Tag
      id={id}
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      suppressHydrationWarning
    >
      {children}
    </Tag>
  );
}

/** Script mínimo (sem dependências) que ativa a revelação. */
const revealSource = `(function(){try{var d=document.documentElement;if(!('IntersectionObserver' in window))return;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;var els=document.querySelectorAll('[data-reveal]');var vh=window.innerHeight;var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute('data-revealed','');io.unobserve(e.target);}});},{rootMargin:'0px 0px -6% 0px',threshold:0.01});els.forEach(function(el){var r=el.getBoundingClientRect();if(r.top<vh&&r.bottom>0){el.setAttribute('data-revealed','');}else{io.observe(el);}});d.classList.add('reveal-ready');}catch(e){}})();`;

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: revealSource }} />;
}
