/**
 * Estilos de botão compartilhados (usados em <a>, <button> e TrackedLink).
 * Cantos retos e altura generosa: precisão de obra, boa área de toque.
 */
const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2.5 px-6 text-[0.9375rem] font-semibold tracking-[-0.005em] transition-[background-color,border-color,color,transform] duration-200 ease-out select-none disabled:pointer-events-none disabled:opacity-60";

export const buttonStyles = {
  /** Dourado — ação principal (orçamento / WhatsApp). */
  primary: `${base} bg-gold text-ink hover:bg-gold-light active:translate-y-px`,
  /** Contorno claro sobre fundos escuros. */
  secondary: `${base} border border-paper/25 text-paper hover:border-gold hover:text-gold-light`,
  /** Contorno escuro sobre fundos claros. */
  secondaryLight: `${base} border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper`,
  /** Escuro sobre fundos claros. */
  dark: `${base} bg-ink text-paper hover:bg-graphite`,
} as const;

/** Link textual com seta, para ações contextuais. */
export const arrowLink =
  "group/arrow inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline-offset-[6px] transition-colors duration-200";

export const arrowIcon =
  "size-4 shrink-0 transition-transform duration-200 ease-out group-hover/arrow:translate-x-1 group-focus-visible/arrow:translate-x-1";
