import type { CommercialEventName, CommercialEventPayload } from "./events";
import { captureAttributionFromUrl, getDevice, type Attribution } from "./attribution";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type TrackInput = {
  event: CommercialEventName;
  page?: string;
  projectId?: string;
  serviceId?: string;
};

function buildPayload(input: TrackInput, attribution: Attribution): CommercialEventPayload {
  return {
    event: input.event,
    page: input.page || (typeof window !== "undefined" ? window.location.pathname : "/"),
    projectId: input.projectId,
    serviceId: input.serviceId,
    origin: attribution.origin,
    campaign: attribution.campaign || attribution.utm_campaign,
    utmSource: attribution.utm_source,
    utmMedium: attribution.utm_medium,
    utmCampaign: attribution.utm_campaign,
    utmContent: attribution.utm_content,
    utmTerm: attribution.utm_term,
    device: getDevice(),
    sessionId: attribution.sessionId,
    timestamp: new Date().toISOString(),
  };
}

function sendToGa4(payload: CommercialEventPayload) {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  if (!gaId || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", payload.event, {
    page: payload.page,
    project_id: payload.projectId,
    service_id: payload.serviceId,
    origin: payload.origin,
    campaign: payload.campaign,
    utm_source: payload.utmSource,
    utm_medium: payload.utmMedium,
    utm_campaign: payload.utmCampaign,
    utm_content: payload.utmContent,
    utm_term: payload.utmTerm,
    device: payload.device,
    session_id: payload.sessionId,
  });
}

async function sendToApi(payload: CommercialEventPayload) {
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // O rastreamento nunca deve interromper a jornada comercial
  }
}

export function track(input: TrackInput) {
  if (typeof window === "undefined") return;

  const attribution = captureAttributionFromUrl();
  const payload = buildPayload(input, attribution);

  sendToGa4(payload);
  void sendToApi(payload);
}
