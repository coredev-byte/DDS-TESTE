import { analyticsConfig } from "@/config/analytics";

/**
 * Eventos de conversão do site.
 *
 * `whatsapp_click`        → qualquer botão que abre o WhatsApp (param `location`)
 * `service_click`         → CTA contextual de um serviço (param `service`)
 * `form_submit_whatsapp`  → envio do formulário de orçamento para o WhatsApp
 * `instagram_click`       → link para o Instagram
 * `phone_click`           → link de ligação telefônica
 */
export type AnalyticsEventName =
  | "whatsapp_click"
  | "service_click"
  | "form_submit_whatsapp"
  | "instagram_click"
  | "phone_click";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: Fbq;
  }
}

const contactEvents: AnalyticsEventName[] = ["whatsapp_click", "form_submit_whatsapp", "phone_click"];

/**
 * Dispara um evento para as ferramentas que estiverem carregadas.
 * Se nenhuma estiver configurada (ou o visitante não consentiu), não faz nada.
 */
export function trackEvent(name: AnalyticsEventName, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;

  try {
    if (analyticsConfig.gtmId && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...params });
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);

      if (
        analyticsConfig.googleAdsId &&
        analyticsConfig.googleAdsConversionLabel &&
        contactEvents.includes(name)
      ) {
        window.gtag("event", "conversion", {
          send_to: `${analyticsConfig.googleAdsId}/${analyticsConfig.googleAdsConversionLabel}`,
        });
      }
    }

    if (typeof window.fbq === "function") {
      if (contactEvents.includes(name)) {
        window.fbq("track", "Contact", params);
      } else {
        window.fbq("trackCustom", name, params);
      }
    }
  } catch {
    // Medição nunca deve impedir o contato do visitante.
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, params);
  }
}
