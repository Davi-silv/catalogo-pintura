"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { beforeAfterItems } from "@/data/before-after";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { track } from "@/lib/track";

export function BeforeAfterSection() {
  const item = beforeAfterItems[0];
  const [position, setPosition] = useState(52);
  const tracked = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const markInteraction = useCallback(() => {
    if (tracked.current) return;
    tracked.current = true;
    track({ event: "before_after_interaction", page: "/", projectId: item.id });
  }, [item.id]);

  function updateFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, next)));
    markInteraction();
  }

  return (
    <section id="antes-depois" className="section-pad bg-[var(--ink)] text-white">
      <div className="page-x mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="section-kicker !text-[var(--accent-hover)]">Transformação</p>
          <h2 className="section-title !text-white">Arraste e veja a diferença</h2>
          <p className="section-copy !text-white/65">
            Compare o antes e o depois. Se quiser o mesmo resultado, peça pelo WhatsApp.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative mt-10 aspect-[4/5] w-full touch-none select-none overflow-hidden ring-1 ring-white/10 sm:mt-12 sm:aspect-[16/10] cursor-ew-resize"
          onPointerDown={(e) => {
            (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
            updateFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.buttons !== 1 && e.pressure === 0) return;
            updateFromClientX(e.clientX);
          }}
          onTouchMove={(e) => {
            if (e.touches[0]) updateFromClientX(e.touches[0].clientX);
          }}
        >
          <Image src={item.after} alt="Depois" fill className="object-cover" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image src={item.before} alt="Antes" fill className="object-cover" sizes="100vw" />
          </div>

          <div
            className="absolute inset-y-0 z-10 w-px bg-white"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--ink)] shadow-xl sm:h-12 sm:w-12">
              <span className="text-base font-semibold sm:text-lg">⟷</span>
            </div>
          </div>

          <span className="absolute left-3 top-3 bg-black/50 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-white backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[0.65rem]">
            Antes
          </span>
          <span className="absolute right-3 top-3 bg-[var(--accent)]/90 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-white sm:right-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[0.65rem]">
            Depois
          </span>
        </div>

        <div className="mt-7 sm:mt-9">
          <WhatsAppCta
            context="before_after"
            meta={{ beforeAfterLabel: item.label, projectId: item.id }}
            variant="light"
            fullWidth
          />
        </div>
      </div>
    </section>
  );
}
