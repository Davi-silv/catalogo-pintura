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
        className="absolute inset-0 hidden h-full w-full object-cover opacity-55 mix-blend-soft-light sm:block"
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

      <div className="page-x relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end pb-[max(4rem,env(safe-area-inset-bottom))] pt-28 sm:pb-20 sm:pt-32 md:justify-center md:pb-28">
        <p className="hero-reveal font-display text-[clamp(2.6rem,12vw,7.5rem)] leading-[0.95] tracking-[-0.03em] text-white">
          {brand}
        </p>
        <h1 className="hero-reveal mt-4 max-w-xl text-balance text-lg font-medium leading-snug text-white/92 sm:mt-6 sm:text-xl md:text-2xl [animation-delay:120ms]">
          Pintura que valoriza sua casa ou empresa — com acabamento limpo e profissional.
        </h1>
        <p className="hero-reveal mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:mt-4 md:text-base [animation-delay:220ms]">
          Orçamento rápido pelo WhatsApp, com orientação clara do começo ao fim.
        </p>
        <div className="hero-reveal mt-7 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 [animation-delay:320ms]">
          <WhatsAppCta context="hero" fullWidth />
          <a
            href="#projetos"
            className="inline-flex min-h-11 items-center justify-center text-sm font-medium text-white/80 underline-offset-4 transition hover:text-white hover:underline sm:justify-start"
          >
            Ver projetos
          </a>
        </div>
      </div>
    </section>
  );
}
