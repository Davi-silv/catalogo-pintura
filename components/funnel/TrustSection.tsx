import { differentials, processSteps, testimonials } from "@/data/testimonials";

export function TrustSection() {
  return (
    <section id="confianca" className="section-pad">
      <div className="page-x mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="section-kicker">Por que contratar</p>
          <h2 className="section-title">Processo simples. Resultado cuidadoso.</h2>
          <p className="section-copy">
            Menos dúvida na hora de decidir: você sabe o que acontece em cada etapa.
          </p>
        </div>

        <ol className="mt-10 grid gap-0 border-t border-[var(--line)] sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li
              key={step.id}
              className="border-b border-[var(--line)] py-6 sm:border-r sm:px-4 sm:py-7 lg:px-5 lg:py-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0 sm:odd:border-r sm:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
            >
              <span className="font-display text-3xl text-[var(--accent)] sm:text-4xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-base font-semibold text-[var(--ink)] sm:mt-4 sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div>
            <h3 className="font-display text-2xl text-[var(--ink)] sm:text-3xl">
              O que muda na prática
            </h3>
            <ul className="mt-5 space-y-3 sm:mt-6">
              {differentials.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:gap-5">
            {testimonials.map((item) => (
              <blockquote
                key={item.id}
                className="border-l-[3px] border-[var(--accent)] bg-[var(--surface)] py-4 pl-4 pr-3 sm:py-5 sm:pl-5 sm:pr-4"
              >
                <p className="text-[0.95rem] leading-relaxed text-[var(--ink)]">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-3 text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)] sm:mt-4 sm:text-[0.7rem]">
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
