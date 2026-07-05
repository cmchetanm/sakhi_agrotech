export function whatsappUrl(number: string | null | undefined, message?: string): string | null {
  const digits = number?.replace(/\D/g, "");
  if (!digits) return null;

  const base = `https://wa.me/${digits}`;
  if (!message?.trim()) return base;

  return `${base}?text=${encodeURIComponent(message.trim())}`;
}

export const PRODUCE_ORDER_MESSAGE = "Hi Sakhi Agrotech, I'd like to order this week's basket.";
