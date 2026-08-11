import type { Metadata } from "next";
import { Newsreader, Manrope } from "next/font/google";
import { AnalyticsProvider } from "@/components/tracking/AnalyticsProvider";
import "./globals.css";

const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const brand = process.env.NEXT_PUBLIC_BRAND_NAME || "Robson Barbosa";

export const metadata: Metadata = {
  title: `${brand} · Pintura residencial e comercial`,
  description:
    "Pintura residencial e comercial com acabamento profissional. Solicite orçamento pelo WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[var(--bg)] text-[var(--ink)]">
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
