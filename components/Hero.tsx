"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/lib/i18n";
import { PRICE_SINGLE } from "@/lib/config";
import StrapArt from "./StrapArt";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const driftX = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-16">
      {/* giant outlined watermark, drifts with scroll */}
      <motion.div
        aria-hidden
        style={{ x: driftX }}
        className="pointer-events-none absolute -top-8 start-0 select-none whitespace-nowrap font-display text-[38vw] font-extrabold leading-none outline-type md:text-[26vw]"
      >
        قبضة قبضة
      </motion.div>

      {/* ember glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 end-[-10%] h-[60vh] w-[60vw] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #E8482B 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto grid min-h-[92vh] max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-16 pt-20 md:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mb-5 inline-block font-display text-sm font-semibold tracking-wide text-sand"
          >
            {t.hero.eyebrow}
          </motion.p>

          <h1 className="font-display text-[17vw] font-extrabold leading-[0.95] md:text-[6.5rem]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.25 }}
            >
              {t.hero.line1}
            </motion.span>
            <motion.span
              className="block text-ember"
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.42 }}
            >
              {t.hero.line2}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-faded"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.75 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#product"
              className="rounded-lg bg-ember px-8 py-4 font-display text-lg font-bold text-ink shadow-ember transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              {t.hero.cta} · {PRICE_SINGLE} {t.currency}
            </a>
            <a href="#features" className="stitch-under font-display text-base font-semibold text-bone">
              {t.hero.cta2}
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-6 text-sm text-faded"
          >
            {t.hero.shipNote}
          </motion.p>
        </div>

        {/* product art card */}
        <motion.div
          style={{ y: artY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative rounded-2xl border border-line bg-coal p-6 shadow-lift">
            <div className="stitch mb-4" />
            <StrapArt body="#1F1D1A" stitch="#E8482B" className="w-full drop-shadow-2xl" />
            <div className="stitch mt-4" />
            <div className="mt-4 flex items-center justify-between font-display">
              <span className="text-sm font-semibold text-faded">QBD-PRO / 60CM</span>
              <span className="text-sm font-semibold text-sand">250 KG TESTED</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
