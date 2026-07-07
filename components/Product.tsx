"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { COLORS, MAX_QTY, PRICE_MULTI, subtotalFor, savingsFor, type ColorId } from "@/lib/config";
import StrapArt from "./StrapArt";

export default function Product() {
  const { lang, t } = useLang();
  const [color, setColor] = useState<ColorId>("black");
  const [qty, setQty] = useState(1);

  const active = COLORS.find((c) => c.id === color)!;
  const subtotal = subtotalFor(qty);
  const savings = savingsFor(qty);
  const wa = process.env.NEXT_PUBLIC_WHATSAPP;
  const waText = encodeURIComponent(
    lang === "ar"
      ? `أبغى أطلب حزام قبضة برو — اللون: ${active.ar} — الكمية: ${qty}`
      : `I'd like to order Qabda Pro Straps — color: ${active.en} — qty: ${qty}`
  );

  return (
    <section id="product" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <p className="font-display text-sm font-semibold tracking-wide text-sand">{t.product.eyebrow}</p>
      <h2 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">{t.product.title}</h2>

      <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl border border-line bg-coal p-8 shadow-lift"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={color}
              initial={{ opacity: 0, rotate: -2, scale: 0.97 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
            >
              <StrapArt body={active.hex} stitch={active.stitch} className="w-full" />
            </motion.div>
          </AnimatePresence>
          <div className="stitch mt-6" />
          <div className="mt-5">
            <p className="font-display text-sm font-semibold text-faded">{t.product.specsTitle}</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-bone/85">
              {t.product.specs.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-sand" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* configurator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          <p className="text-lg leading-relaxed text-faded">{t.product.desc}</p>

          {/* color */}
          <div className="mt-8">
            <p className="mb-3 font-display text-sm font-semibold text-bone">
              {t.product.color}: <span className="text-sand">{lang === "ar" ? active.ar : active.en}</span>
            </p>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  aria-label={lang === "ar" ? c.ar : c.en}
                  aria-pressed={color === c.id}
                  className={`h-11 w-11 rounded-full border-2 transition-all ${
                    color === c.id ? "scale-110 border-ember" : "border-line hover:border-sand"
                  }`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* qty */}
          <div className="mt-8">
            <p className="mb-3 font-display text-sm font-semibold text-bone">{t.product.qty}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-line bg-coal">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2.5 text-xl text-faded transition-colors hover:text-bone"
                  aria-label="-"
                >
                  −
                </button>
                <span className="w-10 text-center font-display text-lg font-bold">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(MAX_QTY, qty + 1))}
                  className="px-4 py-2.5 text-xl text-faded transition-colors hover:text-bone"
                  aria-label="+"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-faded">
                {PRICE_MULTI} {t.currency} {t.product.perPair}
              </p>
            </div>
          </div>

          {/* price */}
          <div className="mt-8 rounded-xl border border-line bg-coal p-5">
            <div className="flex items-end justify-between">
              <div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={subtotal}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="font-display text-4xl font-extrabold text-bone"
                  >
                    {subtotal} <span className="text-xl text-sand">{t.currency}</span>
                  </motion.p>
                </AnimatePresence>
                {savings > 0 && (
                  <p className="mt-1 text-sm font-semibold text-ember">
                    {t.product.save} {savings} {t.currency}
                  </p>
                )}
              </div>
            </div>
            <div className="stitch-ember mt-4" />
            <Link
              href={`/checkout?color=${color}&qty=${qty}`}
              className="mt-5 block rounded-lg bg-ember py-4 text-center font-display text-lg font-bold text-ink shadow-ember transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {t.product.order}
            </Link>
            {wa && (
              <a
                href={`https://wa.me/${wa}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center text-sm text-faded transition-colors hover:text-sand"
              >
                {t.product.whatsapp}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
