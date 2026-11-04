"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logoMark from "@/assets/brand/dds-logo-marca.png";
import { navigation, site } from "@/config/site";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { TrackedLink } from "@/components/ui/tracked-link";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button-styles";

const sectionIds = navigation.map((item) => item.href.slice(1));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("inicio");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Fundo sólido após o início da rolagem.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Indicador discreto da seção atual.
  useEffect(() => {
    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) menuButtonRef.current?.focus();
  }, []);

  // Menu mobile: trava a rolagem, fecha com Esc e mantém o foco no painel.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const onResize = () => {
      if (window.matchMedia("(min-width: 64rem)").matches) closeMenu(false);
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, closeMenu]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        solid
          ? "border-b border-paper/10 bg-ink/95"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Pular para o conteúdo
      </a>

      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <a
          href="#inicio"
          className="relative -ml-1 flex shrink-0 items-center p-1"
          aria-label={`${site.name} — voltar ao início`}
          onClick={() => open && closeMenu(false)}
        >
          <Image
            src={logoMark}
            alt=""
            loading="eager"
            sizes="80px"
            className="h-9 w-auto lg:h-10"
          />
          <span className="sr-only">{site.name}</span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative inline-flex min-h-11 items-center px-3.5 text-[0.875rem] font-medium transition-colors duration-200 after:absolute after:inset-x-3.5 after:bottom-2 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-300 ${
                      isActive
                        ? "text-paper after:scale-x-100"
                        : "text-paper/70 after:scale-x-0 hover:text-paper"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <TrackedLink
            href={whatsappUrl(whatsappMessages.quote())}
            external
            event="whatsapp_click"
            eventParams={{ location: "header" }}
            className={`${buttonStyles.primary} min-h-10 px-5 text-sm max-sm:hidden`}
          >
            <WhatsAppIcon size={17} />
            Solicitar orçamento
          </TrackedLink>

          <TrackedLink
            href={whatsappUrl(whatsappMessages.quote())}
            external
            event="whatsapp_click"
            eventParams={{ location: "header_mobile" }}
            className="inline-flex min-h-11 items-center gap-2 border border-gold/50 px-3.5 text-[0.8125rem] font-semibold text-gold-light transition-colors hover:border-gold hover:bg-gold hover:text-ink sm:hidden"
          >
            <WhatsAppIcon size={16} />
            Orçamento
          </TrackedLink>

          <button
            ref={menuButtonRef}
            type="button"
            className="-mr-2 inline-flex size-11 items-center justify-center text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" strokeWidth={1.5} /> : <Menu className="size-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto bg-ink lg:hidden"
      >
        <div className="container-x flex min-h-full flex-col pb-8 pt-6">
          <nav aria-label="Menu">
            <ul className="border-t border-paper/10">
              {navigation.map((item, i) => (
                <li key={item.href} className="border-b border-paper/10">
                  <a
                    href={item.href}
                    onClick={() => closeMenu(false)}
                    className="flex min-h-16 items-center justify-between font-display text-2xl font-semibold tracking-tight text-paper"
                  >
                    {item.label}
                    <span className="tabular text-xs font-medium text-stone">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-10">
            <p className="text-sm text-stone">
              Atendimento em <span className="text-paper">{site.region}</span>
            </p>
            <TrackedLink
              href={whatsappUrl(whatsappMessages.quote())}
              external
              event="whatsapp_click"
              eventParams={{ location: "menu_mobile" }}
              className={`${buttonStyles.primary} mt-4 w-full`}
              onClick={() => closeMenu(false)}
            >
              <WhatsAppIcon size={18} />
              Solicitar orçamento pelo WhatsApp
            </TrackedLink>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
              <TrackedLink
                href={`tel:${site.contact.phoneE164}`}
                event="phone_click"
                eventParams={{ location: "menu_mobile" }}
                className="tabular inline-flex min-h-11 items-center text-paper/80 hover:text-paper"
              >
                {site.contact.phoneDisplay}
              </TrackedLink>
              <TrackedLink
                href={site.contact.instagramUrl}
                external
                event="instagram_click"
                eventParams={{ location: "menu_mobile" }}
                className="inline-flex min-h-11 items-center gap-2 text-paper/80 hover:text-paper"
              >
                <InstagramIcon size={18} />
                {site.contact.instagramHandle}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
