// Single source of truth for pricing/shipping.
// Totals are ALWAYS recomputed server-side in /api/orders — never trust the client.

export const PRICE_SINGLE = 89; // SAR, one pair
export const PRICE_MULTI = 75; // SAR per pair when ordering 2+
export const FREE_SHIPPING_SA_OVER = 199; // SAR
export const SHIPPING_SA = 19; // SAR
export const SHIPPING_GCC = 39; // SAR
export const MAX_QTY = 5;

export const COUNTRIES = [
  { code: "SA", ar: "السعودية", en: "Saudi Arabia" },
  { code: "AE", ar: "الإمارات", en: "UAE" },
  { code: "KW", ar: "الكويت", en: "Kuwait" },
  { code: "QA", ar: "قطر", en: "Qatar" },
  { code: "BH", ar: "البحرين", en: "Bahrain" },
  { code: "OM", ar: "عُمان", en: "Oman" },
] as const;

export type CountryCode = (typeof COUNTRIES)[number]["code"];

export const COLORS = [
  { id: "black", ar: "أسود فحمي", en: "Carbon Black", hex: "#1F1D1A", stitch: "#E8482B" },
  { id: "sand", ar: "رملي", en: "Desert Sand", hex: "#C4A876", stitch: "#1F1D1A" },
  { id: "ember", ar: "أحمر جمري", en: "Ember Red", hex: "#A3301D", stitch: "#EDE6D6" },
] as const;

export type ColorId = (typeof COLORS)[number]["id"];

export function subtotalFor(qty: number): number {
  const q = Math.min(Math.max(Math.round(qty) || 1, 1), MAX_QTY);
  return q >= 2 ? q * PRICE_MULTI : PRICE_SINGLE;
}

export function savingsFor(qty: number): number {
  const q = Math.min(Math.max(Math.round(qty) || 1, 1), MAX_QTY);
  return q >= 2 ? q * (PRICE_SINGLE - PRICE_MULTI) : 0;
}

export function shippingFor(country: string, subtotal: number): number {
  if (country === "SA") return subtotal >= FREE_SHIPPING_SA_OVER ? 0 : SHIPPING_SA;
  return SHIPPING_GCC;
}

export function isValidCountry(code: string): code is CountryCode {
  return COUNTRIES.some((c) => c.code === code);
}

export function isValidColor(id: string): id is ColorId {
  return COLORS.some((c) => c.id === id);
}
