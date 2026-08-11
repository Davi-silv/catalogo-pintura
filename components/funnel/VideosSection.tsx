"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { craftDetails, type CraftDetail } from "@/data/craft-details";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { track } from "@/lib/track";

export function VideosSection() {
  const [active, setActive] = useState<CraftDetail | null>(null);
  const played = useRef<Set<string>>(new Set());

  function openDetail(detail: CraftDetail) {
    setActive(detail);
  }

  return (
    <section id="detalhes" className="section-pad bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="section-kicker">Nos detalhes</p>
          <h2 className="section-title">O que faz a pintura profissional</h2>
          <p className="section-copy">
            Não é só passar tinta. É preparo, proteção, aplicação correta e acabamento fino —
            o que separa um serviço comum de um resultado limpo e durável.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {craftDetails.map((detail, index) => (
            <article
              key={detail.id}
              className="group reveal-up cursor-pointer overflow-hidden bg-[var(--bg)]"
              style={{ animationDelay: `${index * 70}ms` }}
              onClick={() => openDetail(detail)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={detail.image}
                  alt={detail.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {detail.video ? (
                  <span className="absolute bottom-3 left-3 bg-black/55 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    Ver vídeo
                  </span>
                ) : null}
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl text-[var(--ink)]">{detail.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {detail.description}
                </p>
                <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                  <WhatsAppCta
                    context="video"
                    meta={{ videoTitle: detail.title, projectId: detail.id }}
                    variant="ghost"
                    className="!px-4 !py-2 text-xs"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-4 backdrop-blur-sm md:items-center"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal
        >
          <div
            className="w-full max-w-xl overflow-hidden bg-[var(--surface)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-black">
              {active.video ? (
                <video
                  className="h-full w-full object-cover"
                  controls
                  autoPlay
                  playsInline
                  poster={active.image}
                  onPlay={() => {
                    if (played.current.has(active.id)) return;
                    played.current.add(active.id);
                    track({ event: "video_play", page: "/", projectId: active.id });
                  }}
                >
                  <source src={active.video} type="video/mp4" />
                </video>
              ) : (
                <Image src={active.image} alt={active.title} fill className="object-cover" />
              )}
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-display text-3xl text-[var(--ink)]">{active.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {active.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <WhatsAppCta
                  context="video"
                  meta={{ videoTitle: active.title, projectId: active.id }}
                />
                <button
                  type="button"
                  className="px-4 py-3 text-sm text-[var(--muted)] underline-offset-4 hover:underline"
                  onClick={() => setActive(null)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
