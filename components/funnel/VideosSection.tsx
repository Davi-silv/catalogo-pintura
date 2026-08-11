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
      <div className="page-x mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="section-kicker">Nos detalhes</p>
          <h2 className="section-title">O que faz a pintura profissional</h2>
          <p className="section-copy">
            Não é só passar tinta. É preparo, proteção, aplicação correta e acabamento fino —
            o que separa um serviço comum de um resultado limpo e durável.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
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
              <div className="p-4 sm:p-5">
                <h3 className="font-display text-xl text-[var(--ink)] sm:text-2xl">
                  {detail.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {detail.description}
                </p>
                <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                  <WhatsAppCta
                    context="video"
                    meta={{ videoTitle: detail.title, projectId: detail.id }}
                    variant="ghost"
                    fullWidth
                    className="!px-4 !py-2.5 text-xs sm:!w-auto"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal
        >
          <div
            className="modal-sheet w-full max-w-xl overflow-hidden rounded-t-2xl bg-[var(--surface)] shadow-2xl sm:rounded-none"
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
            <div className="p-5 sm:p-6 md:p-8">
              <h3 className="font-display text-2xl text-[var(--ink)] sm:text-3xl">{active.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {active.description}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                <WhatsAppCta
                  context="video"
                  meta={{ videoTitle: active.title, projectId: active.id }}
                  fullWidth
                />
                <button
                  type="button"
                  className="min-h-11 px-4 py-3 text-sm text-[var(--muted)] underline-offset-4 hover:underline"
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
