import { Fragment, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealVariant = "up" | "image" | "words";

type RevealProps = {
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
};

/**
 * Marca um bloco para a revelação no scroll.
 * Sem JavaScript, ou com movimento reduzido, o conteúdo aparece normalmente.
 * O atributo `data-revealed` é aplicado pelo script em `RevealScript`.
 */
export function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  children,
  id,
}: RevealProps) {
  return (
    <Tag
      id={id}
      data-reveal={variant}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      suppressHydrationWarning
    >
      {children}
    </Tag>
  );
}

/** Divide um texto em palavras mascaradas (cada uma sobe por trás de uma máscara). */
export function SplitWords({ text, offset = 0 }: { text: string; offset?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="w">
            <span style={{ "--i": i + offset } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

type RevealHeadingProps = {
  as?: "h1" | "h2" | "h3";
  text: string;
  id?: string;
  className?: string;
  delay?: number;
};

/** Título com revelação palavra por palavra. */
export function RevealHeading({ as: Tag = "h2", text, id, className, delay = 0 }: RevealHeadingProps) {
  return (
    <Tag
      id={id}
      data-reveal="words"
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      suppressHydrationWarning
    >
      <SplitWords text={text} />
    </Tag>
  );
}

/** Script mínimo (sem dependências) que ativa a revelação. */
const revealSource = `(function(){try{var d=document.documentElement;if(!('IntersectionObserver' in window))return;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;var els=document.querySelectorAll('[data-reveal]');var vh=window.innerHeight;var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute('data-revealed','');io.unobserve(e.target);}});},{rootMargin:'0px 0px -12% 0px',threshold:0.01});els.forEach(function(el){var r=el.getBoundingClientRect();if(r.top<vh*0.9&&r.bottom>0){el.setAttribute('data-revealed','');}else{io.observe(el);}});d.classList.add('reveal-ready');}catch(e){}})();`;

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: revealSource }} />;
}
