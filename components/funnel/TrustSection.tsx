import { differentials, processSteps, testimonials } from "@/data/testimonials";

export function TrustSection() {
  return (
    <section id="confianca" className="section-pad">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="section-kicker">Por que contratar</p>
          <h2 className="section-title">Processo simples. Resultado cuidadoso.</h2>
          <p className="section-copy">
            Menos dúvida na hora de decidir: você sabe o que acontece em cada etapa.
          </p>
        </div>

        <ol className="mt-14 grid gap-0 border-t border-[var(--line)] md:grid-cols-4">
          {processSteps.map((step, index) => (
            <li
              key={step.id}
              className="border-b border-[var(--line)] py-7 md:border-b-0 md:border-r md:px-5 md:py-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <span className="font-display text-4xl text-[var(--accent)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h3 className="font-display text-3xl text-[var(--ink)]">O que muda na prática</h3>
            <ul className="mt-6 space-y-3">
              {differentials.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5">
            {testimonials.map((item) => (
              <blockquote
                key={item.id}
                className="border-l-[3px] border-[var(--accent)] bg-[var(--surface)] py-5 pl-5 pr-4"
              >
                <p className="text-[0.95rem] leading-relaxed text-[var(--ink)]">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-4 text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                  {item.name} · {item.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
