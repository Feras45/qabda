import Link from "next/link";
import { getSql, ensureSchema } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "تم استلام الطلب — قبضة QABDA" };

type Search = { order?: string; id?: string; status?: string; cod?: string };

async function verifyMoyasarPayment(paymentId: string, orderNumber: string) {
  const secret = process.env.MOYASAR_SECRET_KEY;
  if (!secret) return null;
  try {
    const res = await fetch(`https://api.moyasar.com/v1/payments/${paymentId}`, {
      headers: { Authorization: "Basic " + Buffer.from(secret + ":").toString("base64") },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const p = await res.json();
    if (p?.metadata?.order_number !== orderNumber) return null;
    return p.status as string; // paid | failed | initiated | ...
  } catch {
    return null;
  }
}

export default async function SuccessPage({ searchParams }: { searchParams: Search }) {
  const orderNumber = (searchParams.order || "").slice(0, 40);
  const isCod = searchParams.cod === "1";

  let paymentStatus: "paid" | "cod" | "pending" = isCod ? "cod" : "pending";

  const sql = getSql();

  // Moyasar redirects back with ?id=<payment_id>&status=... — verify server-side,
  // never trust the redirect params alone.
  if (!isCod && searchParams.id && orderNumber) {
    const verified = await verifyMoyasarPayment(searchParams.id, orderNumber);
    if (verified === "paid") {
      paymentStatus = "paid";
      if (sql) {
        await ensureSchema(sql);
        await sql`
          update orders
          set payment_status = 'paid', payment_id = ${searchParams.id}
          where order_number = ${orderNumber} and payment_status <> 'paid'
        `;
      }
    }
  }

  // Fall back to the stored status (e.g. webhook already confirmed it)
  if (!isCod && paymentStatus === "pending" && sql && orderNumber) {
    await ensureSchema(sql);
    const rows = (await sql`
      select payment_status from orders where order_number = ${orderNumber}
    `) as { payment_status: string }[];
    if (rows[0]?.payment_status === "paid") paymentStatus = "paid";
    if (rows[0]?.payment_status === "cod_pending") paymentStatus = "cod";
  }

  const chip =
    paymentStatus === "paid"
      ? { ar: "تم الدفع بنجاح", en: "Payment successful", cls: "border-sand text-sand" }
      : paymentStatus === "cod"
        ? { ar: "الدفع عند الاستلام", en: "Cash on delivery", cls: "border-sand text-sand" }
        : { ar: "بانتظار تأكيد الدفع", en: "Awaiting payment confirmation", cls: "border-faded text-faded" };

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-5 text-center">
      <div className="w-full rounded-2xl border border-line bg-coal p-10 shadow-lift">
        {/* stitched check mark */}
        <svg viewBox="0 0 64 64" className="mx-auto h-16 w-16" aria-hidden>
          <circle cx="32" cy="32" r="28" fill="none" stroke="#C4A876" strokeWidth="2" strokeDasharray="7 5" />
          <path d="M20 33 L28 41 L45 24" fill="none" stroke="#E8482B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <h1 className="mt-6 font-display text-4xl font-extrabold">استلمنا طلبك</h1>
        <p className="mt-1 text-sm text-faded">Order received</p>

        <p className="mt-4 leading-relaxed text-faded">
          بنتواصل معك على جوالك لتأكيد التفاصيل قبل الشحن.
        </p>

        {orderNumber && (
          <div className="mt-8">
            <p className="text-xs text-faded">رقم الطلب · Order number</p>
            <p className="mt-1 font-display text-2xl font-extrabold tracking-wider text-sand" dir="ltr">
              {orderNumber}
            </p>
          </div>
        )}

        <span className={`mt-6 inline-block rounded-full border px-4 py-1.5 text-sm font-semibold ${chip.cls}`}>
          {chip.ar} · {chip.en}
        </span>

        <div className="stitch mt-8" />

        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-ember px-8 py-3.5 font-display text-lg font-bold text-ink shadow-ember transition-transform hover:scale-[1.03]"
        >
          الرجوع للمتجر
        </Link>
      </div>
    </main>
  );
}
