import { cacheLife } from "next/cache";

/**
 * Ano corrente para o copyright. Calculado em cache (revalidado diariamente),
 * mantendo a página pré-renderizada como estática.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
