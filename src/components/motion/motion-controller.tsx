"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/smooth-scroll";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/**
 * Movimento global da página:
 * - rolagem suave com inércia (Lenis) no mouse/trackpad; toque continua nativo;
 * - parallax nas fotografias marcadas com `data-parallax="<intensidade>"`;
 * - saída suave do hero (`data-hero`, `data-hero-content`, `data-hero-media`, `data-hero-shade`);
 * - barra de progresso de leitura no header (`data-scroll-progress`).
 *
 * Tudo é desativado quando o visitante prefere movimento reduzido,
 * exceto a barra de progresso (que não é animação).
 */
export function MotionController() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    // A rolagem suave só é necessária quando o visitante começa a rolar:
    // é iniciada depois do carregamento, sem disputar a primeira renderização.
    const startLenis = () => {
      if (reduce || lenis) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.085,
        wheelMultiplier: 0.95,
        // O deslocamento do header vem do `scroll-padding-top` definido no CSS.
        anchors: true,
      });
      setLenis(lenis);
    };

    const scheduleLenis = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(startLenis, { timeout: 2500 });
      } else {
        timeoutId = window.setTimeout(startLenis, 1200);
      }
    };

    if (!reduce) {
      if (document.readyState === "complete") scheduleLenis();
      else window.addEventListener("load", scheduleLenis, { once: true });
    }

    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const progress = document.querySelector<HTMLElement>("[data-scroll-progress]");
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const heroContent = document.querySelector<HTMLElement>("[data-hero-content]");
    const heroMedia = document.querySelector<HTMLElement>("[data-hero-media]");
    const heroShade = document.querySelector<HTMLElement>("[data-hero-shade]");

    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;

      if (progress) {
        const max = document.documentElement.scrollHeight - vh;
        progress.style.transform = `scaleX(${max > 0 ? clamp(y / max) : 0})`;
      }

      if (reduce) return;

      for (const el of parallax) {
        const box = (el.parentElement ?? el).getBoundingClientRect();
        if (box.bottom < -100 || box.top > vh + 100) continue;
        // -1 (acima do centro) → 1 (abaixo do centro)
        const p = clamp((box.top + box.height / 2 - vh / 2) / (vh / 2 + box.height / 2), -1, 1);
        const speed = Number(el.dataset.parallax) || 0.06;
        el.style.translate = `0 ${(p * speed * 100).toFixed(3)}%`;
      }

      if (hero) {
        const h = hero.offsetHeight || vh;
        const p = clamp(y / h);
        if (heroContent) {
          heroContent.style.translate = `0 ${(-p * 90).toFixed(2)}px`;
          heroContent.style.opacity = `${(1 - p * 1.15).toFixed(3)}`;
        }
        if (heroMedia) heroMedia.style.scale = `${(1 + p * 0.08).toFixed(4)}`;
        if (heroShade) heroShade.style.opacity = `${(p * 0.75).toFixed(3)}`;
      }
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("load", scheduleLenis);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
