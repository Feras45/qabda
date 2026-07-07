import { getSql, ensureSchema } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "Orders — Qabda Admin", robots: { index: false } };

type OrderRow = {
  id: number;
  order_number: string;
  customer_name: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  notes: string;
  color: string;
  quantity: number;
  total_sar: string;
  payment_method: string;
  payment_status: string;
  created_at: string;
};

const statusColor: Record<string, string> = {
  paid: "text-sand",
  cod_pending: "text-bone",
  pending: "text-faded",
  failed: "text-ember",
};

export default async function AdminPage({ searchParams }: { searchParams: { key?: string } }) {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey || searchParams.key !== adminKey) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5" dir="ltr">
        <p className="text-faded">Unauthorized. Open /admin?key=YOUR_ADMIN_KEY</p>
      </main>
    );
  }

  const sql = getSql();
  if (!sql) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5" dir="ltr">
        <p className="text-faded">No DATABASE_URL configured — running in demo mode, orders are not persisted.</p>
      </main>
    );
  }

  await ensureSchema(sql);
  const orders = (await sql`
    select * from orders order by created_at desc limit 200
  `) as OrderRow[];

  return (
    <main className="mx-auto max-w-7xl px-5 py-12" dir="ltr">
      <h1 className="font-display text-3xl font-extrabold">
        Orders <span className="text-base font-semibold text-faded">({orders.length})</span>
      </h1>
      <div className="stitch mt-4" />

      <div className="mt-8 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-coal text-left text-xs uppercase tracking-wider text-faded">
            <tr>
              {["Order", "Date", "Customer", "Phone", "Ship to", "Item", "Total", "Payment", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-line hover:bg-coal/60">
                <td className="px-4 py-3 font-display font-bold text-sand">{o.order_number}</td>
                <td className="px-4 py-3 text-faded">{new Date(o.created_at).toLocaleString("en-GB")}</td>
                <td className="px-4 py-3">{o.customer_name}</td>
                <td className="px-4 py-3">{o.phone}</td>
                <td className="px-4 py-3 text-faded">
                  {o.country} · {o.city}
                  <span className="block max-w-[220px] truncate text-xs">{o.address}</span>
                </td>
                <td className="px-4 py-3">{o.color} × {o.quantity}</td>
                <td className="px-4 py-3 font-semibold">{Number(o.total_sar)} SAR</td>
                <td className="px-4 py-3 uppercase text-faded">{o.payment_method}</td>
                <td className={`px-4 py-3 font-semibold ${statusColor[o.payment_status] || "text-faded"}`}>
                  {o.payment_status}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-faded">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
