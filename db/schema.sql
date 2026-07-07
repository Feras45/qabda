-- Qabda orders table.
-- Optional: the app auto-creates this on first order. Run manually in the
-- Neon SQL console if you prefer explicit setup.

create table if not exists orders (
  id serial primary key,
  order_number text unique not null,
  customer_name text not null,
  phone text not null,
  country text not null,           -- SA | AE | KW | QA | BH | OM
  city text not null,
  address text not null,
  notes text default '',
  color text not null,             -- black | sand | ember
  quantity int not null,           -- pairs
  subtotal_sar numeric not null,
  shipping_sar numeric not null,
  total_sar numeric not null,
  payment_method text not null,    -- card | cod
  payment_status text not null default 'pending', -- pending | paid | cod_pending | failed
  payment_id text,                 -- Moyasar payment id
  created_at timestamptz not null default now()
);

create index if not exists orders_created_at_idx on orders (created_at desc);
