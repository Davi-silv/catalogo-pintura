export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

export type Attribution = UtmParams & {
  origin: string;
  campaign?: string;
  sessionId: string;
};

const ATTR_KEY = "rb_attribution";
const SESSION_KEY = "rb_session_id";

const ORIGIN_MAP: Record<string, string> = {
  instagram: "Instagram",
  ig: "Instagram",
  facebook: "Facebook",
  fb: "Facebook",
  google: "Google",
  google_ads: "Google Ads",
  "google-ads": "Google Ads",
  cpc: "Google Ads",
  meta: "Meta Ads",
  meta_ads: "Meta Ads",
  "meta-ads": "Meta Ads",
  whatsapp: "WhatsApp",
  indicacao: "Indicação",
  referral: "Indicação",
  organico: "Orgânico",
  organic: "Orgânico",
};

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function resolveOrigin(utm: UtmParams): string {
  const source = (utm.utm_source || "").toLowerCase().trim();
  const medium = (utm.utm_medium || "").toLowerCase().trim();

  if (!source && !medium) return "Orgânico";

  if (ORIGIN_MAP[source]) return ORIGIN_MAP[source];

  if (medium === "cpc" || medium === "ppc" || medium === "paid") {
    if (source.includes("google")) return "Google Ads";
    if (source.includes("facebook") || source.includes("meta") || source.includes("ig")) {
      return "Meta Ads";
    }
  }

  if (source) {
    return source.charAt(0).toUpperCase() + source.slice(1);
  }

  return "Orgânico";
}

export function getDevice(): "mobile" | "desktop" | "tablet" {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

export function captureAttributionFromUrl(search?: string): Attribution {
  if (typeof window === "undefined") {
    return { origin: "Orgânico", sessionId: "server" };
  }

  const params = new URLSearchParams(search ?? window.location.search);
  const fromUrl: UtmParams = {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_content: params.get("utm_content") || undefined,
    utm_term: params.get("utm_term") || undefined,
  };

  const hasUtm = Object.values(fromUrl).some(Boolean);
  const existing = readStoredAttribution();

  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = createId();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }

  if (hasUtm) {
    const attribution: Attribution = {
      ...fromUrl,
      origin: resolveOrigin(fromUrl),
      campaign: fromUrl.utm_campaign,
      sessionId,
    };
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(attribution));
    return attribution;
  }

  if (existing) {
    return { ...existing, sessionId };
  }

  const organic: Attribution = {
    origin: "Orgânico",
    sessionId,
  };
  sessionStorage.setItem(ATTR_KEY, JSON.stringify(organic));
  return organic;
}

function readStoredAttribution(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(ATTR_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") {
    return { origin: "Orgânico", sessionId: "server" };
  }
  return captureAttributionFromUrl();
}
