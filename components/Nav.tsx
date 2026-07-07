"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function Nav() {
  const { lang, setLang, t } = useLang();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-3xl font-extrabold leading-none text-bone">قبضة</span>
          <span className="font-display text-xs font-semibold tracking-[0.3em] text-sand">QABDA</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-faded md:flex">
          <a href="#product" className="transition-colors hover:text-bone">{t.nav.details}</a>
          <a href="#reviews" className="transition-colors hover:text-bone">{t.nav.reviews}</a>
          <a href="#faq" className="transition-colors hover:text-bone">{t.nav.faq}</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-faded transition-colors hover:border-sand hover:text-sand"
            aria-label="Switch language"
          >
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <a
            href="#product"
            className="hidden rounded-md bg-ember px-4 py-2 font-display text-sm font-bold text-ink shadow-ember transition-transform hover:scale-[1.03] md:block"
          >
            {t.nav.order}
          </a>
        </div>
      </div>
    </header>
  );
}
