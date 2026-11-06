import type Lenis from "lenis";

/** Instância única da rolagem suave, acessível por outros componentes (ex.: menu). */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}
