// Order notifications to the store owner.
//
// Two optional channels — configure either, both, or neither:
//   Telegram: TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID   (instant push to your phone, free)
//   Email:    RESEND_API_KEY + ORDER_EMAIL_TO + ORDER_EMAIL_FROM
//
// Notifications must NEVER break an order: every failure is swallowed and logged.
// If nothing is configured this is a no-op.

import { COLORS, COUNTRIES } from "./config";

export type OrderNotice = {
  orderNumber: string;
  name: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  notes: string;
  color: string;
  quantity: number;
  total: number;
  method: "card" | "cod";
};

const TIMEOUT_MS = 4000;

export function riyadhTime(d: Date = new Date()) {
  return d.toLocaleString("en-GB", { timeZone: "Asia/Riyadh", hour12: false });
}

function labelFor(o: OrderNotice) {
  const color = COLORS.find((c) => c.id === o.color)?.ar || o.color;
  const country = COUNTRIES.find((c) => c.code === o.country)?.ar || o.country;
  return { color, country };
}

function orderText(o: OrderNotice) {
  const { color, country } = labelFor(o);
  const pay = o.method === "cod" ? "الدفع عند الاستلام" : "دفع إلكتروني (بانتظار التأكيد)";
  return [
    `طلب جديد · ${o.orderNumber}`,
    ``,
    `الاسم: ${o.name}`,
    `الجوال: ${o.phone}`,
    `العنوان: ${country} · ${o.city} · ${o.address}`,
    `المنتج: ${color} × ${o.quantity}`,
    `الإجمالي: ${o.total} ر.س`,
    `الدفع: ${pay}`,
    o.notes ? `ملاحظات: ${o.notes}` : ``,
    ``,
    `الوقت (الرياض): ${riyadhTime()}`,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`telegram ${res.status}: ${await res.text()}`);
}

async function sendEmail(subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_EMAIL_TO;
  const from = process.env.ORDER_EMAIL_FROM;
  if (!key || !to || !from) return;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, text }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
}

async function dispatch(subject: string, text: string) {
  const results = await Promise.allSettled([sendTelegram(text), sendEmail(subject, text)]);
  for (const r of results) {
    if (r.status === "rejected") console.error("notify failed:", r.reason);
  }
}

/** Fired when an order row is created. Never throws. */
export async function notifyNewOrder(o: OrderNotice) {
  try {
    await dispatch(`طلب جديد ${o.orderNumber} — ${o.total} ر.س`, orderText(o));
  } catch (e) {
    console.error("notifyNewOrder failed:", e);
  }
}

/** Fired when Moyasar confirms a card payment. Never throws. */
export async function notifyPaymentConfirmed(orderNumber: string, paymentId: string) {
  try {
    const text = [
      `تم تأكيد الدفع · ${orderNumber}`,
      ``,
      `رقم العملية: ${paymentId}`,
      `الوقت (الرياض): ${riyadhTime()}`,
      ``,
      `الطلب جاهز للشحن.`,
    ].join("\n");
    await dispatch(`تم الدفع ${orderNumber}`, text);
  } catch (e) {
    console.error("notifyPaymentConfirmed failed:", e);
  }
}
