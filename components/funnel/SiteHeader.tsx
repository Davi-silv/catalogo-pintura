"use client";

import { useEffect, useState } from "react";
import { getBrandName } from "@/lib/whatsapp";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";

const links = [
  { href: "#projetos", label: "Projetos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#antes-depois", label: "Antes/Depois" },
  { href: "#detalhes", label: "Detalhes" },
  { href: "#contato", label: "Contato" },
];

export function SiteHeader() {
  const brand = getBrandName();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition duration-300 ${
        solid
          ? "border-b border-black/5 bg-[var(--surface)]/95 text-[var(--ink)] shadow-sm backdrop-blur-md"
          : "bg-transparent text-white"
      }`}
    >
      <div className="page-x mx-auto flex max-w-6xl items-center justify-between gap-3 py-3 sm:py-4">
        <a
          href="#"
          className="font-display max-w-[58vw] truncate text-lg tracking-tight sm:max-w-none sm:text-xl md:text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          {brand}
        </a>

        <nav
          className={`hidden items-center gap-5 text-[0.7rem] uppercase tracking-[0.16em] lg:flex xl:gap-6 ${
            solid ? "text-[var(--muted)]" : "text-white/75"
          }`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition ${solid ? "hover:text-[var(--ink)]" : "hover:text-white"}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <WhatsAppCta
              context="hero"
              variant={solid ? "primary" : "secondary"}
              className="!px-3 !py-2 text-xs md:!px-4 md:!py-2.5"
            />
          </div>

          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-md border lg:hidden ${
              solid ? "border-[var(--ink)]/15" : "border-white/30"
            }`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full rounded transition ${solid ? "bg-[var(--ink)]" : "bg-white"} ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded transition ${solid ? "bg-[var(--ink)]" : "bg-white"} ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded transition ${solid ? "bg-[var(--ink)]" : "bg-white"} ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-black/5 bg-[var(--surface)] px-[var(--page-x)] py-5 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-sm font-medium text-[var(--ink)] hover:bg-[var(--bg)]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4">
            <WhatsAppCta context="hero" fullWidth />
          </div>
        </div>
      ) : null}
    </header>
  );
}
