import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Acesso não autorizado" }, { status: 401 });
}

function isAuthorized(request: Request): boolean {
  const token = process.env.ADMIN_METRICS_TOKEN;
  if (!token) return false;

  const header = request.headers.get("x-admin-token");
  if (header && header === token) return true;

  const url = new URL(request.url);
  const queryToken = url.searchParams.get("token");
  return queryToken === token;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) return unauthorized();

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "DATABASE_URL não configurada" },
      { status: 503 },
    );
  }

  const events = await prisma.commercialEvent.findMany({
    orderBy: { timestamp: "desc" },
  });

  const countBy = (name: string) => events.filter((e) => e.event === name).length;

  const pageViews = countBy("page_view");
  const projectViews = countBy("project_view");
  const videoPlays = countBy("video_play");
  const beforeAfter = countBy("before_after_interaction");
  const serviceViews = countBy("service_view");
  const whatsappClicks = countBy("whatsapp_click");
  const budgetClicks = countBy("budget_click");
  const contactClicks = countBy("contact_click");

  const conversions = whatsappClicks + budgetClicks + contactClicks;
  const uniqueVisitors = new Set(events.map((e) => e.sessionId)).size;
  const conversionRate =
    pageViews > 0 ? Number(((conversions / pageViews) * 100).toFixed(1)) : 0;

  const originMap = new Map<string, number>();
  const campaignMap = new Map<string, number>();

  for (const event of events) {
    if (["whatsapp_click", "budget_click", "contact_click"].includes(event.event)) {
      const origin = event.origin || "Orgânico";
      originMap.set(origin, (originMap.get(origin) || 0) + 1);
      if (event.campaign) {
        campaignMap.set(event.campaign, (campaignMap.get(event.campaign) || 0) + 1);
      }
    }
  }

  const sortEntries = (map: Map<string, number>) =>
    [...map.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

  return NextResponse.json({
    summary: {
      visitors: uniqueVisitors,
      pageViews,
      projectViews,
      videoPlays,
      beforeAfterInteractions: beforeAfter,
      serviceClicks: serviceViews,
      whatsappClicks,
      budgetRequests: budgetClicks,
      contactClicks,
      conversions,
      conversionRate,
    },
    origins: sortEntries(originMap),
    campaigns: sortEntries(campaignMap),
    recent: events.slice(0, 50).map((e) => ({
      id: e.id,
      event: e.event,
      page: e.page,
      projectId: e.projectId,
      serviceId: e.serviceId,
      origin: e.origin,
      campaign: e.campaign,
      device: e.device,
      timestamp: e.timestamp,
    })),
  });
}
