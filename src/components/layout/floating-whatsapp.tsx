"use client";

import { useEffect, useState } from "react";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { TrackedLink } from "@/components/ui/tracked-link";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

/**
 * Botão flutuante discreto (somente mobile/tablet).
 * Aparece depois da primeira dobra e se recolhe na seção de contato,
 * onde o formulário e os botões diretos já estão visíveis.
 */
export function FloatingWhatsApp() {
  const [pastHero, setPastHero] = useState(false);
  const [inContact, setInContact] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const contact = document.getElementById("contato");
    let observer: IntersectionObserver | undefined;
    if (contact) {
      observer = new IntersectionObserver(([entry]) => setInContact(entry.isIntersecting), {
        rootMargin: "0px 0px -20% 0px",
      });
      observer.observe(contact);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const visible = pastHero && !inContact;

  return (
    <div
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 transition-[opacity,transform] duration-300 lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <TrackedLink
        href={whatsappUrl(whatsappMessages.quote())}
        external
        event="whatsapp_click"
        eventParams={{ location: "floating" }}
        tabIndex={visible ? 0 : -1}
        aria-label="Solicitar orçamento pelo WhatsApp"
        className="flex size-14 items-center justify-center rounded-full border border-gold/40 bg-graphite text-gold shadow-[0_10px_30px_-10px_rgb(0_0_0/0.7)] transition-colors hover:bg-gold hover:text-ink"
      >
        <WhatsAppIcon size={24} />
      </TrackedLink>
    </div>
  );
}
