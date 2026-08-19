"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { legalDicts, MERCHANT } from "@/lib/legal";

export default function PolicyContent() {
  const { lang, setLang, t } = useLang();
  const L = legalDicts[lang];

  const identity = [
    { label: L.identityLabels.name, value: MERCHANT.name },
    { label: L.identityLabels.cr, value: MERCHANT.cr },
    { label: L.identityLabels.vat, value: MERCHANT.vat },
    { label: L.identityLabels.address, value: MERCHANT.address },
    { label: L.identityLabels.email, value: MERCHANT.email },
    { label: L.identityLabels.phone, value: MERCHANT.phone },
  ].filter((row) => row.value);

  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-10">
      <div className="mb-10 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-extrabold">قبضة</span>
          <span className="font-display text-[10px] font-semibold tracking-[0.3em] text-sand">QABDA</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-faded transition-colors hover:border-sand hover:text-sand"
            aria-label="Switch language"
          >
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <Link href="/" className="text-sm text-faded transition-colors hover:text-bone">
            ← {t.checkout.back}
          </Link>
        </div>
      </div>

      <h1 className="font-display text-4xl font-extrabold">{L.title}</h1>
      <p className="mt-3 leading-relaxed text-faded">{L.intro}</p>
      <div className="stitch mt-6" />

      {/* Merchant identity — required disclosure under the Saudi E-Commerce Law */}
      <section className="mt-10 rounded-2xl border border-line bg-coal p-6">
        <h2 className="font-display text-xl font-bold">{L.identityTitle}</h2>
        {identity.length > 0 ? (
          <dl className="mt-4 space-y-2.5 text-sm">
            {identity.map((row) => (
              <div key={row.label} className="flex flex-wrap gap-x-3">
                <dt className="min-w-[140px] text-faded">{row.label}</dt>
                <dd className="text-bone">{row.value}</dd>
              </div>
            ))}
            {MERCHANT.maroof && (
              <div className="flex flex-wrap gap-x-3">
                <dt className="min-w-[140px] text-faded">{L.identityLabels.maroof}</dt>
                <dd>
                  <a
                    href={MERCHANT.maroof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sand underline underline-offset-4"
                  >
                    {MERCHANT.maroof}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="mt-4 text-sm text-faded">{L.identityMissing}</p>
        )}
      </section>

      {L.sections.map((s) => (
        <section key={s.id} id={s.id} className="mt-12 scroll-mt-20">
          <h2 className="font-display text-2xl font-bold">{s.title}</h2>
          <div className="stitch mt-4 !opacity-30" />
          <div className="mt-5 space-y-4">
            {s.body.map((p, i) => (
              <p key={i} className="leading-relaxed text-faded">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
