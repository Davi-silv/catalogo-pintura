"use client";

import { useEffect, useState } from "react";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="float-cta fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 sm:bottom-7 sm:right-7">
      <WhatsAppCta
        context="final"
        compact
        className="shadow-lg shadow-teal-900/25 !px-4 !py-3 text-xs sm:!px-5 sm:!py-3.5 sm:text-sm"
      />
    </div>
  );
}
