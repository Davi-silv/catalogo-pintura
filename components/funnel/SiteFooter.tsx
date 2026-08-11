import { getBrandName } from "@/lib/whatsapp";

export function SiteFooter() {
  const brand = getBrandName();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)] px-[var(--page-x)] py-8 sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="font-display text-lg text-[var(--ink)] sm:text-xl">{brand}</p>
        <p className="text-sm text-[var(--muted)]">
          Pintura residencial e comercial · {year}
        </p>
      </div>
    </footer>
  );
}
