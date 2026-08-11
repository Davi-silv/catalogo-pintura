import { z } from "zod";

export const COMMERCIAL_EVENTS = [
  "page_view",
  "project_view",
  "service_view",
  "video_play",
  "before_after_interaction",
  "whatsapp_click",
  "budget_click",
  "contact_click",
] as const;

export type CommercialEventName = (typeof COMMERCIAL_EVENTS)[number];

export const deviceSchema = z.enum(["mobile", "desktop", "tablet"]);

export const commercialEventSchema = z.object({
  event: z.enum(COMMERCIAL_EVENTS),
  page: z.string().min(1),
  projectId: z.string().optional(),
  serviceId: z.string().optional(),
  origin: z.string().optional(),
  campaign: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  device: deviceSchema,
  sessionId: z.string().min(1),
  timestamp: z.string().datetime(),
});

export type CommercialEventPayload = z.infer<typeof commercialEventSchema>;
