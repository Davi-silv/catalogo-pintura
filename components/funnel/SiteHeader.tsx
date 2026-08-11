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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition duration-300 ${
        scrolled
          ? "border-b border-black/5 bg-[var(--surface)]/90 text-[var(--ink)] shadow-sm backdrop-blur-md"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a href="#" className="font-display text-xl tracking-tight md:text-2xl">
          {brand}
        </a>
        <nav
          className={`hidden items-center gap-6 text-[0.7rem] uppercase tracking-[0.16em] md:flex ${
            scrolled ? "text-[var(--muted)]" : "text-white/75"
          }`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition ${scrolled ? "hover:text-[var(--ink)]" : "hover:text-white"}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden sm:block">
          <WhatsAppCta
            context="hero"
            variant={scrolled ? "primary" : "secondary"}
            className="!px-4 !py-2.5 text-xs"
          />
        </div>
      </div>
    </header>
  );
}
