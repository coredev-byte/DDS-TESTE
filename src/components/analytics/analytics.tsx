"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { analyticsConfig, hasAnyAnalytics } from "@/config/analytics";

type Consent = "granted" | "denied" | null;
const STORAGE_KEY = "dds-consentimento-medicao";

function readConsent(): Consent {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function saveConsent(value: Exclude<Consent, null>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Navegação privada: a escolha vale apenas para esta visita.
  }
}

/**
 * Carrega GA4, GTM, Google Ads e Meta Pixel somente quando:
 * 1. o respectivo ID estiver configurado em variável de ambiente; e
 * 2. o visitante autorizar a medição.
 * Sem nenhum ID configurado, este componente não renderiza nada.
 */
export function Analytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hasAnyAnalytics) return;
    // Leitura do localStorage só existe no navegador.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(readConsent());
    setReady(true);
  }, []);

  if (!hasAnyAnalytics || !ready) return null;

  if (consent === null) {
    return (
      <div
        role="region"
        aria-label="Preferências de medição"
        className="fixed inset-x-3 bottom-3 z-[45] mx-auto max-w-xl border border-paper/15 bg-graphite p-5 text-sm text-paper shadow-2xl sm:inset-x-auto sm:left-6 sm:right-auto sm:bottom-6"
      >
        <p className="leading-relaxed text-paper/85">
          Usamos ferramentas de medição para entender como o site é utilizado e melhorar nossos
          anúncios. Elas só são ativadas com a sua autorização.
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            className="min-h-11 flex-1 bg-gold px-4 font-semibold text-ink hover:bg-gold-light"
            onClick={() => {
              saveConsent("granted");
              setConsent("granted");
            }}
          >
            Aceitar
          </button>
          <button
            type="button"
            className="min-h-11 flex-1 border border-paper/25 px-4 font-semibold text-paper hover:border-paper/50"
            onClick={() => {
              saveConsent("denied");
              setConsent("denied");
            }}
          >
            Recusar
          </button>
        </div>
      </div>
    );
  }

  if (consent !== "granted") return null;

  const { ga4Id, gtmId, googleAdsId, metaPixelId } = analyticsConfig;
  const gtagIds = [ga4Id, googleAdsId].filter(Boolean) as string[];

  return (
    <>
      {gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}

      {gtagIds.length > 0 && (
        <>
          <Script
            id="gtag-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagIds[0]}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${gtagIds
              .map((id) => `gtag('config','${id}');`)
              .join("")}`}
          </Script>
        </>
      )}

      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
