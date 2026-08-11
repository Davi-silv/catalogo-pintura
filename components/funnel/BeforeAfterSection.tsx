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
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="section-kicker !text-[var(--accent-hover)]">Transformação</p>
          <h2 className="section-title !text-white">Arraste e veja a diferença</h2>
          <p className="section-copy !text-white/65">
            Compare o antes e o depois. Se quiser o mesmo resultado, peça pelo WhatsApp.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative mt-12 aspect-[16/10] w-full cursor-ew-resize overflow-hidden select-none ring-1 ring-white/10"
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            updateFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.buttons !== 1) return;
            updateFromClientX(e.clientX);
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
            <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--ink)] shadow-xl">
              <span className="text-lg font-semibold">⟷</span>
            </div>
          </div>

          <span className="absolute left-4 top-4 bg-black/50 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
            Antes
          </span>
          <span className="absolute right-4 top-4 bg-[var(--accent)]/90 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-white">
            Depois
          </span>
        </div>

        <div className="mt-9">
          <WhatsAppCta
            context="before_after"
            meta={{ beforeAfterLabel: item.label, projectId: item.id }}
            variant="light"
          />
        </div>
      </div>
    </section>
  );
}
