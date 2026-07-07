import { neon } from "@neondatabase/serverless";

// Returns a Neon SQL client, or null when DATABASE_URL is not set (demo mode:
// the flow still works end-to-end, orders just aren't persisted).
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

let schemaReady = false;

export async function ensureSchema(sql: NonNullable<ReturnType<typeof getSql>>) {
  if (schemaReady) return;
  await sql`
    create table if not exists orders (
      id serial primary key,
      order_number text unique not null,
      customer_name text not null,
      phone text not null,
      country text not null,
      city text not null,
      address text not null,
      notes text default '',
      color text not null,
      quantity int not null,
      subtotal_sar numeric not null,
      shipping_sar numeric not null,
      total_sar numeric not null,
      payment_method text not null,
      payment_status text not null default 'pending',
      payment_id text,
      created_at timestamptz not null default now()
    )
  `;
  schemaReady = true;
}
