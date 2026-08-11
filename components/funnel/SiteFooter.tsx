import { getBrandName } from "@/lib/whatsapp";

export function SiteFooter() {
  const brand = getBrandName();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-xl text-[var(--ink)]">{brand}</p>
        <p className="text-sm text-[var(--muted)]">
          Pintura residencial e comercial · {year}
        </p>
      </div>
    </footer>
  );
}
