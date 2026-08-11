import { NextResponse } from "next/server";
import { commercialEventSchema } from "@/lib/events";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = commercialEventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    await prisma.commercialEvent.create({
      data: {
        event: data.event,
        page: data.page,
        projectId: data.projectId,
        serviceId: data.serviceId,
        origin: data.origin,
        campaign: data.campaign,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        utmContent: data.utmContent,
        utmTerm: data.utmTerm,
        device: data.device,
        sessionId: data.sessionId,
        timestamp: new Date(data.timestamp),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("events ingest error", error);
    return NextResponse.json({ error: "Falha ao registrar evento" }, { status: 500 });
  }
}
