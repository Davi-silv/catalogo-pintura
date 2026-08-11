"use client";

import Image from "next/image";
import { services } from "@/data/services";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { track } from "@/lib/track";

export function ServicesSection() {
  return (
    <section id="servicos" className="section-pad">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="section-kicker">Serviços</p>
          <h2 className="section-title">Casa ou empresa — escolha o caminho certo</h2>
          <p className="section-copy">
            Cada opção abre uma conversa no WhatsApp já no contexto do seu tipo de projeto.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative min-h-[420px] overflow-hidden reveal-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() =>
                track({ event: "service_view", serviceId: service.id, page: "/" })
              }
            >
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h3 className="font-display text-3xl text-white md:text-4xl">{service.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{service.problem}</p>
                <p className="mt-2 text-sm font-medium text-white">{service.outcome}</p>
                <div className="mt-6">
                  <WhatsAppCta
                    context={service.ctaContext}
                    meta={{ serviceId: service.id }}
                    variant="light"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
