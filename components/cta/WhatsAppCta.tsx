"use client";

import { CTA_MAP, buildCtaMessage, type CtaContext, type CtaMeta } from "@/lib/cta";
import { getAttribution } from "@/lib/attribution";
import { track } from "@/lib/track";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Props = {
  context: CtaContext;
  meta?: Omit<CtaMeta, "attribution">;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "light";
  compact?: boolean;
  fullWidth?: boolean;
};

const variantClass: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] hover:-translate-y-0.5",
  secondary:
    "bg-white/12 text-white border border-white/35 hover:bg-white/20 backdrop-blur-sm",
  ghost:
    "bg-transparent text-[var(--ink)] border border-[var(--ink)]/18 hover:border-[var(--accent)] hover:text-[var(--accent)]",
  light:
    "bg-white text-[var(--ink)] hover:bg-[var(--surface)] hover:-translate-y-0.5",
};

export function WhatsAppCta({
  context,
  meta,
  className = "",
  variant = "primary",
  compact = false,
  fullWidth = false,
}: Props) {
  const config = CTA_MAP[context];
  const label = compact ? "WhatsApp" : config.label;

  function handleClick() {
    const attribution = getAttribution();
    const message = buildCtaMessage(context, { ...meta, attribution });
    const href = buildWhatsAppUrl(message);

    track({
      event: config.event,
      page: typeof window !== "undefined" ? window.location.pathname : "/",
      projectId: meta?.projectId,
      serviceId: meta?.serviceId,
    });

    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold tracking-wide transition duration-300 sm:px-6 sm:py-3.5 ${
        fullWidth ? "w-full sm:w-auto" : ""
      } whitespace-normal text-center leading-snug ${variantClass[variant]} ${className}`}
    >
      <WhatsAppIcon />
      <span>{label}</span>
    </button>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.35.98 2.66 1.12 2.84.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.2 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />
      <path d="M12.04 2C6.5 2 2.02 6.48 2.02 12c0 1.77.46 3.45 1.28 4.92L2 22l5.22-1.37A9.96 9.96 0 0 0 12.04 22C17.58 22 22 17.52 22 12S17.58 2 12.04 2zm0 18.15c-1.6 0-3.14-.43-4.47-1.23l-.32-.19-3.1.81.83-3.02-.21-.33A8.12 8.12 0 0 1 3.9 12c0-4.48 3.65-8.13 8.14-8.13 4.48 0 8.13 3.65 8.13 8.13 0 4.49-3.65 8.15-8.13 8.15z" />
    </svg>
  );
}
