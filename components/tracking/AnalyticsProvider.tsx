"use client";

import { useEffect } from "react";
import Script from "next/script";
import { captureAttributionFromUrl } from "@/lib/attribution";
import { track } from "@/lib/track";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;

  useEffect(() => {
    captureAttributionFromUrl();
    track({ event: "page_view", page: window.location.pathname || "/" });
  }, []);

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { send_page_view: false });
            `}
          </Script>
        </>
      ) : null}
      {children}
    </>
  );
}
