import { NextResponse } from "next/server";
import { getSql, ensureSchema } from "@/lib/db";
import {
  MAX_QTY,
  subtotalFor,
  shippingFor,
  isValidCountry,
  isValidColor,
} from "@/lib/config";

export const runtime = "nodejs";

function orderNumber() {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `QBD-${ts}${rnd}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim().slice(0, 120);
    const phone = String(body.phone || "").trim().slice(0, 24);
    const country = String(body.country || "");
    const city = String(body.city || "").trim().slice(0, 80);
    const address = String(body.address || "").trim().slice(0, 400);
    const notes = String(body.notes || "").trim().slice(0, 400);
    const color = String(body.color || "");
    const method = body.method === "cod" ? "cod" : "card";
    const quantity = Math.min(Math.max(Math.round(Number(body.quantity)) || 1, 1), MAX_QTY);

    if (!name || !phone || !city || !address) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) {
      return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 400 });
    }
    if (!isValidCountry(country) || !isValidColor(color)) {
      return NextResponse.json({ ok: false, error: "invalid_selection" }, { status: 400 });
    }
    if (method === "cod" && country !== "SA") {
      return NextResponse.json({ ok: false, error: "cod_sa_only" }, { status: 400 });
    }

    // Totals are authoritative here — client values are ignored.
    const subtotal = subtotalFor(quantity);
    const shipping = shippingFor(country, subtotal);
    const total = subtotal + shipping;
    const number = orderNumber();
    const paymentStatus = method === "cod" ? "cod_pending" : "pending";

    const sql = getSql();
    if (sql) {
      await ensureSchema(sql);
      await sql`
        insert into orders
          (order_number, customer_name, phone, country, city, address, notes,
           color, quantity, subtotal_sar, shipping_sar, total_sar,
           payment_method, payment_status)
        values
          (${number}, ${name}, ${phone}, ${country}, ${city}, ${address}, ${notes},
           ${color}, ${quantity}, ${subtotal}, ${shipping}, ${total},
           ${method}, ${paymentStatus})
      `;
    }

    return NextResponse.json({
      ok: true,
      orderNumber: number,
      totalSar: total,
      totalHalalas: Math.round(total * 100),
      demo: !sql, // true when DATABASE_URL isn't configured
    });
  } catch (e) {
    console.error("orders POST failed:", e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
