"use client";

import { useLang } from "@/lib/i18n";

export default function Marquee() {
  const { t } = useLang();
  const items = [...t.marquee, ...t.marquee];

  return (
    <div className="relative overflow-hidden border-y border-line bg-coal py-4" dir="ltr">
      <div className="marquee-track flex w-max items-center gap-10">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-sm font-semibold text-bone/80">{item}</span>
            <span className="h-2 w-2 rotate-45 bg-ember" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
