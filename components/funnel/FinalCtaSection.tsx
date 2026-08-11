"use client";

import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { getBrandName } from "@/lib/whatsapp";

export function FinalCtaSection() {
  const brand = getBrandName();

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-[var(--accent)] px-6 py-24 text-white md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(0,0,0,0.18),transparent_45%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-white/70">Fale agora</p>
        <h2 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight md:text-5xl">
          Seu ambiente pronto com o acabamento do {brand}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
          Chame no WhatsApp, diga o que precisa pintar e receba orientação + orçamento sem
          complicação.
        </p>
        <div className="mt-9 flex justify-center">
          <WhatsAppCta context="final" variant="light" />
        </div>
      </div>
    </section>
  );
}
