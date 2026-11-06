/**
 * Integrações de medição — todas opcionais.
 *
 * Nenhum script de terceiros é carregado enquanto as variáveis abaixo não
 * forem configuradas na Vercel (ou em `.env.local`). Quando houver alguma
 * configurada, o visitante vê um aviso de consentimento e os scripts só são
 * carregados após a autorização.
 */
export const analyticsConfig = {
  /** Propriedade GA4 "Ddsreformas" (fluxo https://www.ddsreformas.com.br). Pode ser trocada por variável de ambiente. */
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "G-1SBWD540F5",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || null,
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || null,
  /** Rótulo da conversão de "contato via WhatsApp" no Google Ads. */
  googleAdsConversionLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || null,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || null,
} as const;

export const hasAnyAnalytics = Boolean(
  analyticsConfig.ga4Id ||
    analyticsConfig.gtmId ||
    analyticsConfig.googleAdsId ||
    analyticsConfig.metaPixelId,
);
