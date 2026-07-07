# قبضة QABDA — Store

Production e-commerce site for Qabda lifting straps. Arabic-first (RTL) with EN toggle, single-product direct checkout, cash on delivery + Moyasar online payments (mada / cards / STC Pay), orders in Neon Postgres, deployable to Vercel as-is.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + Framer Motion
- Neon Postgres (`@neondatabase/serverless`)
- Moyasar payment form (Saudi PSP: mada, Visa/MC, STC Pay, Apple Pay)

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in values (all optional for a first look)
npm run dev
```

Without any env vars the site runs in **demo mode**: the full order flow works but orders aren't persisted and card payment shows a config hint instead of the payment form.

## Environment variables

| Var | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon pooled connection string. Orders table auto-creates on first order (or run `db/schema.sql` manually). |
| `NEXT_PUBLIC_MOYASAR_PUBLISHABLE_KEY` | Moyasar publishable key (test keys start with `pk_test_`). |
| `MOYASAR_SECRET_KEY` | Moyasar secret key. Used server-side to verify payments on `/success`. |
| `MOYASAR_WEBHOOK_SECRET` | Shared token you set in the Moyasar webhook config. |
| `ADMIN_KEY` | Open `/admin?key=<ADMIN_KEY>` to view orders. |
| `NEXT_PUBLIC_WHATSAPP` | Optional. `9665XXXXXXXX` — shows an "order via WhatsApp" link. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata. |

## Payments (Moyasar)

1. Create an account at dashboard.moyasar.com and grab test keys (Settings → API Keys).
2. Add both keys to env. Test card flow works immediately with Moyasar's test cards.
3. Webhook (recommended): Dashboard → Webhooks → add `https://<domain>/api/moyasar/webhook`, event `payment_paid`, secret token = `MOYASAR_WEBHOOK_SECRET`. The `/success` page also verifies the payment server-side against the Moyasar API, so the flow is correct even before the webhook is configured.
4. Apple Pay: verify your domain in the Moyasar dashboard, then add `"applepay"` to the `methods` array in `components/CheckoutForm.tsx`.
5. Go-live in KSA requires CR/Maroof verification on the Moyasar side.

Payment flow: order is created first (`/api/orders`, status `pending`), then the Moyasar form charges `total * 100` halalas with `metadata.order_number`. `/success` verifies the payment id against Moyasar's API with the secret key and marks the order `paid` — redirect params are never trusted. COD orders go straight to `cod_pending`.

## Deploy to Vercel

```bash
git init && git add -A && git commit -m "qabda store"
# push to GitHub, then import in Vercel — no config needed
```

Add the env vars in Vercel → Project → Settings → Environment Variables, redeploy. Point `qabda`-domain DNS at Vercel as usual.

## Pricing / shipping rules

All in `lib/config.ts` (client display) and re-enforced server-side in `/api/orders`:

- 1 pair = 89 SAR, 2+ pairs = 75 SAR/pair
- KSA shipping 19 SAR, free over 199 SAR
- GCC (AE/KW/QA/BH/OM) flat 39 SAR, online payment only (COD is KSA-only)

## Customization notes

- **Product photography**: the recolorable SVG in `components/StrapArt.tsx` is a placeholder. When real shots are ready, replace it with `next/image` renders per color variant (`public/products/{black,sand,ember}.jpg`).
- **Copy**: all AR/EN copy lives in one dictionary, `lib/i18n.tsx`. The reviews there are sample placeholders — replace with real customer reviews before launch.
- **Design tokens**: palette and fonts in `tailwind.config.ts` (ink/coal/bone/sand/ember, Changa + IBM Plex Sans Arabic). The dashed "stitch" motif is defined in `app/globals.css`.
- **Admin**: `/admin?key=...` is a read-only order list. For anything beyond low volume, put it behind real auth.
