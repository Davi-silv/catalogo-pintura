"use client";

import Image from "next/image";
import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { track } from "@/lib/track";

export function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);

  function openProject(project: Project) {
    setActive(project);
    track({
      event: "project_view",
      projectId: project.id,
      page: "/",
    });
  }

  return (
    <section id="projetos" className="section-pad bg-[var(--surface)]">
      <div className="page-x mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="section-kicker">Portfólio</p>
          <h2 className="section-title">Resultados que geram confiança</h2>
          <p className="section-copy">
            Escolha o projeto que mais se parece com o que você precisa e peça um orçamento no mesmo
            contexto.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 sm:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`group relative min-h-[280px] cursor-pointer overflow-hidden reveal-up sm:min-h-0 ${
                index === 0 ? "aspect-[4/5] sm:col-span-2 sm:aspect-[21/9]" : "aspect-[4/3]"
              }`}
              style={{ animationDelay: `${index * 90}ms` }}
              onClick={() => openProject(project)}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-7">
                <span className="text-[0.65rem] uppercase tracking-[0.18em] text-white/70">
                  {project.category === "residencial" ? "Residencial" : "Comercial"}
                </span>
                <h3 className="mt-2 font-display text-xl text-white sm:text-2xl md:text-3xl">
                  {project.name}
                </h3>
                <p className="mt-2 line-clamp-3 max-w-xl text-sm text-white/75 sm:line-clamp-none">
                  {project.description}
                </p>
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
            <div className="relative aspect-video">
              {active.video ? (
                <video
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  poster={active.image}
                  onPlay={() =>
                    track({ event: "video_play", projectId: active.id, page: "/" })
                  }
                >
                  <source src={active.video} type="video/mp4" />
                </video>
              ) : (
                <Image src={active.image} alt={active.name} fill className="object-cover" />
              )}
            </div>
            <div className="p-5 sm:p-6 md:p-8">
              <h3 className="font-display text-2xl text-[var(--ink)] sm:text-3xl">{active.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{active.description}</p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                <WhatsAppCta
                  context="project"
                  meta={{ projectId: active.id, projectName: active.name }}
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
