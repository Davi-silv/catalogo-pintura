-- CreateTable
CREATE TABLE "CommercialEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "projectId" TEXT,
    "serviceId" TEXT,
    "origin" TEXT,
    "campaign" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmContent" TEXT,
    "utmTerm" TEXT,
    "device" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "CommercialEvent_event_idx" ON "CommercialEvent"("event");

-- CreateIndex
CREATE INDEX "CommercialEvent_origin_idx" ON "CommercialEvent"("origin");

-- CreateIndex
CREATE INDEX "CommercialEvent_campaign_idx" ON "CommercialEvent"("campaign");

-- CreateIndex
CREATE INDEX "CommercialEvent_timestamp_idx" ON "CommercialEvent"("timestamp");

-- CreateIndex
CREATE INDEX "CommercialEvent_sessionId_idx" ON "CommercialEvent"("sessionId");
