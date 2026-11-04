/**
 * Desenhos de planta em traço fino — usados como espaço reservado do
 * portfólio. São abstrações gráficas, não representam obras reais.
 */
type PlanSketchProps = { variant?: 1 | 2 | 3; className?: string };

export function PlanSketch({ variant = 1, className }: PlanSketchProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      {variant === 1 && (
        <g {...common}>
          <rect x="40" y="40" width="320" height="220" strokeWidth={2} />
          <path d="M40 150 H170 M170 40 V112 M170 136 V260 M240 150 H360 M240 150 V260 M240 40 V96" />
          <path d="M170 112 A24 24 0 0 1 194 136" strokeDasharray="3 3" />
          <path d="M240 96 A22 22 0 0 0 262 118" strokeDasharray="3 3" />
          <rect x="60" y="62" width="70" height="44" />
          <rect x="262" y="186" width="74" height="52" />
          <circle cx="300" cy="80" r="16" />
          <path d="M40 285 H360 M40 280 V290 M360 280 V290" opacity="0.6" />
        </g>
      )}
      {variant === 2 && (
        <g {...common}>
          <rect x="60" y="30" width="280" height="240" strokeWidth={2} />
          <path d="M60 120 H200 V30 M200 170 H340 M200 120 V270" />
          <path d="M200 120 A26 26 0 0 1 226 146" strokeDasharray="3 3" />
          <path d="M84 150 H176 V246 H84 Z" />
          <path d="M84 170 H176 M84 190 H176 M84 210 H176 M84 230 H176" opacity="0.5" />
          <rect x="226" y="196" width="90" height="50" />
          <path d="M230 60 H310 M230 76 H310" opacity="0.6" />
          <path d="M20 30 V270 M15 30 H25 M15 270 H25" opacity="0.6" />
        </g>
      )}
      {variant === 3 && (
        <g {...common}>
          <path d="M60 250 V110 L200 40 L340 110 V250 Z" strokeWidth={2} />
          <path d="M60 250 H340" />
          <rect x="176" y="96" width="48" height="48" />
          <path d="M200 96 V144 M176 120 H224" />
          <rect x="96" y="160" width="60" height="90" />
          <rect x="244" y="160" width="60" height="50" />
          <path d="M20 250 H380" opacity="0.5" strokeDasharray="4 4" />
        </g>
      )}
    </svg>
  );
}
