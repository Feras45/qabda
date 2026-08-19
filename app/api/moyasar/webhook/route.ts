import { NextResponse } from "next/server";
import { getSql, ensureSchema } from "@/lib/db";
import { notifyPaymentConfirmed } from "@/lib/notify";

export const runtime = "nodejs";

// Configure in Moyasar Dashboard -> Settings -> Webhooks
//   URL:    https://<your-domain>/api/moyasar/webhook
//   Secret: same value as MOYASAR_WEBHOOK_SECRET
//   Events: payment_paid (and optionally payment_failed)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const secret = process.env.MOYASAR_WEBHOOK_SECRET;
    if (!secret || body.secret_token !== secret) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const payment = body.data;
    const orderNumber: string | undefined = payment?.metadata?.order_number;
    if (!orderNumber) return NextResponse.json({ ok: true, skipped: "no_order_number" });

    const sql = getSql();
    if (!sql) return NextResponse.json({ ok: true, skipped: "no_db" });
    await ensureSchema(sql);

    if (body.type === "payment_paid" || payment?.status === "paid") {
      // `returning` tells us whether this call actually flipped the row, so a
      // repeated webhook delivery doesn't fire a duplicate notification.
      const changed = (await sql`
        update orders
        set payment_status = 'paid', payment_id = ${payment.id}
        where order_number = ${orderNumber} and payment_status <> 'paid'
        returning order_number
      `) as { order_number: string }[];
      if (changed.length > 0) await notifyPaymentConfirmed(orderNumber, payment.id);
    } else if (body.type === "payment_failed" || payment?.status === "failed") {
      await sql`
        update orders
        set payment_status = 'failed', payment_id = ${payment.id}
        where order_number = ${orderNumber} and payment_status = 'pending'
      `;
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("moyasar webhook failed:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
