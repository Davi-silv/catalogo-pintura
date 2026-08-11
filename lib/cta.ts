import { getBrandName } from "./whatsapp";
import type { Attribution } from "./attribution";

export type CtaContext =
  | "hero"
  | "project"
  | "residential"
  | "commercial"
  | "before_after"
  | "video"
  | "final";

export type CtaConfig = {
  label: string;
  event: "budget_click" | "whatsapp_click" | "contact_click";
  buildMessage: (meta?: CtaMeta) => string;
};

export type CtaMeta = {
  projectName?: string;
  projectId?: string;
  serviceId?: string;
  videoTitle?: string;
  beforeAfterLabel?: string;
  attribution?: Attribution;
};

const brand = () => getBrandName();

function withAttributionFooter(message: string, attribution?: Attribution): string {
  if (!attribution) return message;
  const parts = [
    attribution.origin && `Origem: ${attribution.origin}`,
    attribution.campaign && `Campanha: ${attribution.campaign}`,
  ].filter(Boolean);
  if (parts.length === 0) return message;
  return `${message}\n\n(${parts.join(" · ")})`;
}

export const CTA_MAP: Record<CtaContext, CtaConfig> = {
  hero: {
    label: "Solicitar orçamento",
    event: "budget_click",
    buildMessage: () =>
      `Olá, ${brand()}! Gostaria de solicitar um orçamento de pintura.`,
  },
  project: {
    label: "Quero um resultado como esse",
    event: "whatsapp_click",
    buildMessage: (meta) =>
      `Olá, ${brand()}! Vi o projeto "${meta?.projectName || "do catálogo"}" e quero um resultado como esse.`,
  },
  residential: {
    label: "Quero pintar minha casa",
    event: "whatsapp_click",
    buildMessage: () =>
      `Olá, ${brand()}! Quero pintar minha casa e gostaria de um orçamento residencial.`,
  },
  commercial: {
    label: "Quero orçamento para minha empresa",
    event: "whatsapp_click",
    buildMessage: () =>
      `Olá, ${brand()}! Quero um orçamento de pintura para minha empresa.`,
  },
  before_after: {
    label: "Quero transformar meu ambiente",
    event: "whatsapp_click",
    buildMessage: (meta) =>
      `Olá, ${brand()}! Vi a transformação${meta?.beforeAfterLabel ? ` "${meta.beforeAfterLabel}"` : ""} e quero transformar meu ambiente.`,
  },
  video: {
    label: "Quero um acabamento como esse",
    event: "whatsapp_click",
    buildMessage: (meta) =>
      `Olá, ${brand()}! Vi o vídeo${meta?.videoTitle ? ` "${meta.videoTitle}"` : ""} e quero um acabamento como esse.`,
  },
  final: {
    label: "Falar pelo WhatsApp",
    event: "contact_click",
    buildMessage: () =>
      `Olá, ${brand()}! Vim pelo site e gostaria de falar sobre um serviço de pintura.`,
  },
};

export function buildCtaMessage(context: CtaContext, meta?: CtaMeta): string {
  const base = CTA_MAP[context].buildMessage(meta);
  return withAttributionFooter(base, meta?.attribution);
}
