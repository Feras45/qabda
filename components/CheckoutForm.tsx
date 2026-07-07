"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import {
  COLORS,
  COUNTRIES,
  MAX_QTY,
  subtotalFor,
  shippingFor,
  type ColorId,
} from "@/lib/config";

declare global {
  interface Window {
    Moyasar?: { init: (config: Record<string, unknown>) => void };
  }
}

type Stage = "form" | "pay";

export default function CheckoutForm({
  initialColor,
  initialQty,
}: {
  initialColor: ColorId;
  initialQty: number;
}) {
  const { lang, t } = useLang();
  const router = useRouter();

  const [color] = useState<ColorId>(initialColor);
  const [qty, setQty] = useState(initialQty);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("SA");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [method, setMethod] = useState<"card" | "cod">("card");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [stage, setStage] = useState<Stage>("form");
  const [scriptReady, setScriptReady] = useState(false);
  const payRef = useRef<{ orderNumber: string; totalHalalas: number } | null>(null);
  const mounted = useRef(false);

  const activeColor = COLORS.find((c) => c.id === color)!;
  const subtotal = subtotalFor(qty);
  const shipping = shippingFor(country, subtotal);
  const total = subtotal + shipping;
  const codAllowed = country === "SA";
  const pubKey = process.env.NEXT_PUBLIC_MOYASAR_PUBLISHABLE_KEY;

  useEffect(() => {
    if (!codAllowed && method === "cod") setMethod("card");
  }, [codAllowed, method]);

  // next/script onLoad only fires on first load — if the script is already
  // cached (client-side nav back to checkout), pick it up here.
  useEffect(() => {
    if (window.Moyasar) setScriptReady(true);
  }, []);

  // Initialize the Moyasar form once we enter the pay stage and the script is loaded
  useEffect(() => {
    if (stage !== "pay" || !scriptReady || !payRef.current || !window.Moyasar) return;
    if (mounted.current) return;
    mounted.current = true;

    window.Moyasar.init({
      element: ".mysr-form",
      amount: payRef.current.totalHalalas,
      currency: "SAR",
      description: `Qabda order ${payRef.current.orderNumber}`,
      publishable_api_key: pubKey,
      callback_url: `${window.location.origin}/success?order=${payRef.current.orderNumber}`,
      methods: ["creditcard", "stcpay"],
      // To enable Apple Pay: verify your domain in the Moyasar dashboard,
      // then add "applepay" above and the apple_pay config block. See README.
      metadata: { order_number: payRef.current.orderNumber },
    });
  }, [stage, scriptReady, pubKey]);

  async function placeOrder() {
    setError("");
    if (!name.trim() || !phone.trim() || !city.trim() || !address.trim()) {
      setError(t.checkout.errRequired);
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) {
      setError(t.checkout.errPhone);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, country, city, address, notes, color, quantity: qty, method }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "server");

      if (method === "cod") {
        router.push(`/success?order=${data.orderNumber}&cod=1`);
        return;
      }
      payRef.current = { orderNumber: data.orderNumber, totalHalalas: data.totalHalalas };
      setStage("pay");
    } catch {
      setError(t.checkout.errServer);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-5 pb-24 pt-10">
      <Script
        src="https://cdn.moyasar.com/mpf/1.15.0/moyasar.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />

      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-extrabold">قبضة</span>
          <span className="font-display text-[10px] font-semibold tracking-[0.3em] text-sand">QABDA</span>
        </Link>
        <Link href="/" className="text-sm text-faded transition-colors hover:text-bone">
          ← {t.checkout.back}
        </Link>
      </div>

      <h1 className="font-display text-4xl font-extrabold">{t.checkout.title}</h1>
      <div className="stitch mt-5" />

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1fr_380px]">
        {/* ---- form / payment column ---- */}
        <div>
          {stage === "form" ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="mb-5 font-display text-xl font-bold">{t.checkout.info}</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input className="field sm:col-span-2" placeholder={t.checkout.name} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                <input className="field" placeholder={`${t.checkout.phone} — ${t.checkout.phonePh}`} value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" dir="ltr" />
                <select className="field" value={country} onChange={(e) => setCountry(e.target.value)} aria-label={t.checkout.country}>
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {lang === "ar" ? c.ar : c.en}
                    </option>
                  ))}
                </select>
                <input className="field" placeholder={t.checkout.city} value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" />
                <input className="field sm:col-span-2" placeholder={t.checkout.address} value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" />
                <textarea className="field sm:col-span-2" rows={2} placeholder={t.checkout.notes} value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>

              <h2 className="mb-4 mt-10 font-display text-xl font-bold">{t.checkout.payTitle}</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <PayOption
                  active={method === "card"}
                  onClick={() => setMethod("card")}
                  title={t.checkout.payCard}
                  sub={t.checkout.payCardSub}
                />
                <PayOption
                  active={method === "cod"}
                  disabled={!codAllowed}
                  onClick={() => codAllowed && setMethod("cod")}
                  title={t.checkout.payCod}
                  sub={t.checkout.payCodSub}
                />
              </div>

              {error && <p className="mt-5 rounded-lg border border-ember/50 bg-ember/10 px-4 py-3 text-sm text-ember">{error}</p>}

              <button
                onClick={placeOrder}
                disabled={busy}
                className="mt-8 w-full rounded-lg bg-ember py-4 font-display text-lg font-bold text-ink shadow-ember transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
              >
                {busy ? t.checkout.processing : method === "card" ? t.checkout.placeCard : t.checkout.place}
              </button>
              <p className="mt-4 text-center text-xs text-faded">{t.checkout.secure}</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="mb-2 font-display text-xl font-bold">{t.checkout.payNow}</h2>
              <p className="mb-5 text-sm text-faded">
                {t.success.orderNo}: <span className="font-bold text-sand" dir="ltr">{payRef.current?.orderNumber}</span>
              </p>
              {pubKey ? (
                <div className="mysr-wrap">
                  <div className="mysr-form" />
                </div>
              ) : (
                <p className="rounded-lg border border-ember/50 bg-ember/10 px-4 py-3 text-sm text-ember" dir="ltr">
                  Missing NEXT_PUBLIC_MOYASAR_PUBLISHABLE_KEY — add your Moyasar keys to .env to enable card payments.
                </p>
              )}
              <p className="mt-4 text-center text-xs text-faded">{t.checkout.secure}</p>
            </motion.div>
          )}
        </div>

        {/* ---- summary column ---- */}
        <aside className="h-fit rounded-2xl border border-line bg-coal p-6">
          <h2 className="font-display text-lg font-bold">{t.checkout.summary}</h2>
          <div className="stitch my-4" />
          <div className="flex items-center gap-4">
            <span className="h-10 w-10 shrink-0 rounded-full border-2 border-line" style={{ background: activeColor.hex }} aria-hidden />
            <div className="flex-1">
              <p className="font-display font-bold">{t.checkout.product}</p>
              <p className="text-sm text-faded">{lang === "ar" ? activeColor.ar : activeColor.en}</p>
            </div>
            {stage === "form" ? (
              <div className="flex items-center rounded-md border border-line">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-2.5 py-1 text-faded hover:text-bone" aria-label="-">−</button>
                <span className="w-7 text-center font-display font-bold">{qty}</span>
                <button onClick={() => setQty(Math.min(MAX_QTY, qty + 1))} className="px-2.5 py-1 text-faded hover:text-bone" aria-label="+">+</button>
              </div>
            ) : (
              <span className="font-display font-bold">×{qty}</span>
            )}
          </div>

          <div className="mt-6 space-y-2.5 text-sm">
            <Row label={t.checkout.subtotal} value={`${subtotal} ${t.currency}`} />
            <Row
              label={t.checkout.shipping}
              value={shipping === 0 ? t.checkout.freeShip : `${shipping} ${t.currency}`}
              accent={shipping === 0}
            />
            <div className="stitch !opacity-30" />
            <div className="flex items-center justify-between pt-1">
              <span className="font-display text-base font-bold">{t.checkout.total}</span>
              <span className="font-display text-2xl font-extrabold text-bone">
                {total} <span className="text-sm text-sand">{t.currency}</span>
              </span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-faded">{label}</span>
      <span className={accent ? "font-semibold text-ember" : "text-bone"}>{value}</span>
    </div>
  );
}

function PayOption({
  active,
  disabled,
  onClick,
  title,
  sub,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  title: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`rounded-xl border p-4 text-start transition-all ${
        active ? "border-ember bg-ember/10" : "border-line bg-coal hover:border-sand/60"
      } disabled:cursor-not-allowed disabled:opacity-40`}
    >
      <p className="font-display font-bold text-bone">{title}</p>
      <p className="mt-1 text-xs text-faded">{sub}</p>
    </button>
  );
}
