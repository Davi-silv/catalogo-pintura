export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP || "5521991060924";
}

export function getBrandName(): string {
  return process.env.NEXT_PUBLIC_BRAND_NAME || "Robson Barbosa";
}

export function buildWhatsAppUrl(message: string): string {
  const phone = getWhatsAppNumber().replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
