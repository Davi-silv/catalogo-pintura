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
    <div className="float-cta fixed bottom-5 right-5 z-50 md:bottom-7 md:right-7">
      <WhatsAppCta context="final" className="shadow-lg shadow-teal-900/25" />
    </div>
  );
}
