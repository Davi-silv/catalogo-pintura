"use client";

import Image from "next/image";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { getBrandName } from "@/lib/whatsapp";
import { mediaImages } from "@/data/media";

export function HeroSection() {
  const brand = getBrandName();

  return (
    <section className="relative min-h-[100svh] overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src={mediaImages.heroAmbient}
          alt=""
          fill
          priority
          className="hero-media object-cover"
          sizes="100vw"
        />
      </div>

      <video
        className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-soft-light"
        autoPlay
        muted
        loop
        playsInline
        poster={mediaImages.heroPoster}
        aria-hidden
      >
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0" style={{ background: "var(--hero-veil)" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(15,118,110,0.28),transparent_50%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-6 pb-16 pt-32 md:justify-center md:pb-28">
        <p className="hero-reveal font-display text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.92] tracking-[-0.03em] text-white">
          {brand}
        </p>
        <h1 className="hero-reveal mt-6 max-w-xl text-balance text-xl font-medium leading-snug text-white/92 md:text-2xl [animation-delay:120ms]">
          Pintura que valoriza sua casa ou empresa — com acabamento limpo e profissional.
        </h1>
        <p className="hero-reveal mt-4 max-w-md text-sm leading-relaxed text-white/70 md:text-base [animation-delay:220ms]">
          Orçamento rápido pelo WhatsApp, com orientação clara do começo ao fim.
        </p>
        <div className="hero-reveal mt-9 flex flex-wrap items-center gap-4 [animation-delay:320ms]">
          <WhatsAppCta context="hero" />
          <a
            href="#projetos"
            className="text-sm font-medium text-white/80 underline-offset-4 transition hover:text-white hover:underline"
          >
            Ver projetos
          </a>
        </div>
      </div>
    </section>
  );
}
