"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { useLang } from "@/lib/i18n";

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ---------------- Features ---------------- */
export function Features() {
  const { t } = useLang();
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <p className="font-display text-sm font-semibold tracking-wide text-sand">{t.features.eyebrow}</p>
      <h2 className="mt-2 max-w-xl font-display text-4xl font-extrabold md:text-5xl">{t.features.title}</h2>

      <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {t.features.items.map((f, i) => (
          <motion.div
            key={f.h}
            custom={i}
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="stitch mb-5" />
            <h3 className="font-display text-2xl font-bold text-bone">{f.h}</h3>
            <p className="mt-3 leading-relaxed text-faded">{f.p}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      <span className="text-sand">{suffix}</span>
    </span>
  );
}

export function Stats() {
  const { t } = useLang();
  return (
    <section className="border-y border-line bg-coal">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 py-16 md:grid-cols-4">
        {t.stats.items.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-5xl font-extrabold text-bone" dir="ltr">
              <Counter to={s.n} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-faded">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Reviews ---------------- */
export function Reviews() {
  const { t } = useLang();
  return (
    <section id="reviews" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <p className="font-display text-sm font-semibold tracking-wide text-sand">{t.reviews.eyebrow}</p>
      <h2 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">{t.reviews.title}</h2>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {t.reviews.items.map((r, i) => (
          <motion.figure
            key={r.name}
            custom={i}
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col justify-between rounded-xl border border-line bg-coal p-6 transition-colors hover:border-sand/50"
          >
            <div>
              <div className="flex gap-1 text-ember" aria-label="5/5">
                {"★★★★★".split("").map((s, j) => (
                  <span key={j}>{s}</span>
                ))}
              </div>
              <blockquote className="mt-4 leading-relaxed text-bone/90">{r.text}</blockquote>
            </div>
            <figcaption className="mt-6 border-t border-line pt-4 text-sm">
              <span className="font-display font-bold text-bone">{r.name}</span>
              <span className="text-faded"> · {r.city}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-24">
      <p className="text-center font-display text-sm font-semibold tracking-wide text-sand">{t.faq.eyebrow}</p>
      <h2 className="mt-2 text-center font-display text-4xl font-extrabold md:text-5xl">{t.faq.title}</h2>

      <div className="mt-12">
        {t.faq.items.map((f, i) => (
          <div key={f.q} className="border-b border-line">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 py-5 text-start"
            >
              <span className="font-display text-lg font-bold text-bone">{f.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-2xl text-ember"
                aria-hidden
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 leading-relaxed text-faded">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */
export function FinalCta() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ background: "radial-gradient(60% 80% at 50% 100%, #E8482B 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-4xl px-5 py-28 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-5xl font-extrabold md:text-7xl"
        >
          {t.finalCta.title}
        </motion.h2>
        <p className="mx-auto mt-5 max-w-md text-lg text-faded">{t.finalCta.sub}</p>
        <a
          href="#product"
          className="mt-10 inline-block rounded-lg bg-ember px-10 py-4 font-display text-xl font-bold text-ink shadow-ember transition-transform hover:scale-[1.03]"
        >
          {t.finalCta.cta}
        </a>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-line bg-coal">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-display text-3xl font-extrabold">
              قبضة <span className="text-sm font-semibold tracking-[0.3em] text-sand">QABDA</span>
            </p>
            <p className="mt-2 text-sm text-faded">{t.footer.tag}</p>
          </div>
          <p className="text-sm text-faded" dir="ltr">
            {t.footer.payments}
          </p>
        </div>
        <div className="stitch mt-8" />
        <p className="mt-6 text-xs text-faded">{t.footer.rights}</p>
      </div>
    </footer>
  );
}

/* ---------------- Sticky mobile buy bar ---------------- */
export function BuyBar() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink/90 p-3 backdrop-blur-md md:hidden"
        >
          <a
            href="#product"
            className="block rounded-lg bg-ember py-3.5 text-center font-display text-lg font-bold text-ink"
          >
            {t.nav.order}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
