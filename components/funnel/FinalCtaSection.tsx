"use client";

import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { getBrandName } from "@/lib/whatsapp";

export function FinalCtaSection() {
  const brand = getBrandName();

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-[var(--accent)] px-[var(--page-x)] py-16 text-white sm:py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(0,0,0,0.18),transparent_45%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-white/70">Fale agora</p>
        <h2 className="mt-4 font-display text-[clamp(1.85rem,6vw,3.1rem)] leading-[1.12] tracking-tight">
          Seu ambiente pronto com o acabamento do {brand}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-5 md:text-base">
          Chame no WhatsApp, diga o que precisa pintar e receba orientação + orçamento sem
          complicação.
        </p>
        <div className="mt-7 flex justify-center sm:mt-9">
          <WhatsAppCta context="final" variant="light" fullWidth className="max-w-md" />
        </div>
      </div>
    </section>
  );
}
