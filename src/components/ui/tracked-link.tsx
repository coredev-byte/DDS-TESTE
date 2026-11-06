"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent, type AnalyticsEventName, type AnalyticsParams } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  event: AnalyticsEventName;
  eventParams?: AnalyticsParams;
  /** Abre em nova aba (WhatsApp, Instagram). */
  external?: boolean;
  children: ReactNode;
};

/**
 * Link comum (funciona sem JavaScript) que registra um evento de conversão
 * quando as ferramentas de medição estão configuradas.
 */
export function TrackedLink({
  href,
  event,
  eventParams,
  external = false,
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        trackEvent(event, eventParams);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
