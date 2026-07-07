"use client";

// Stylized top-down lifting strap: loop, long tail, bar-tack stitch marks.
// Recolors live with the selected variant. Swap this component for real
// product photography (public/products/*.jpg) when shots are ready.
export default function StrapArt({
  body = "#1F1D1A",
  stitch = "#E8482B",
  className = "",
}: {
  body?: string;
  stitch?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 520 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Lifting strap illustration"
    >
      {/* tail: long S-curve ribbon */}
      <path
        d="M 92 366 C 210 380, 300 320, 300 240 C 300 160, 180 150, 160 220 C 140 290, 260 320, 360 260 C 448 207, 452 120, 400 78"
        stroke={body}
        strokeWidth="46"
        strokeLinecap="round"
      />
      {/* loop at the top end */}
      <ellipse cx="392" cy="70" rx="58" ry="40" transform="rotate(-24 392 70)" stroke={body} strokeWidth="42" />
      {/* stitch lines following the ribbon */}
      <path
        d="M 96 352 C 206 364, 286 310, 286 240 C 286 168, 190 160, 174 220 C 158 282, 262 304, 352 250 C 432 202, 436 124, 390 88"
        stroke={stitch}
        strokeWidth="2.5"
        strokeDasharray="9 7"
        opacity="0.9"
      />
      <path
        d="M 90 380 C 214 396, 314 330, 314 240 C 314 152, 170 140, 146 220 C 122 298, 258 336, 368 270 C 462 212, 468 116, 410 68"
        stroke={stitch}
        strokeWidth="2.5"
        strokeDasharray="9 7"
        opacity="0.9"
      />
      {/* bar-tack reinforcement marks near the loop */}
      <g stroke={stitch} strokeWidth="3" opacity="0.95">
        <line x1="352" y1="96" x2="368" y2="118" />
        <line x1="362" y1="90" x2="378" y2="112" />
        <line x1="372" y1="84" x2="388" y2="106" />
      </g>
      {/* frayed end cap detail */}
      <g stroke={body} strokeWidth="4" strokeLinecap="round">
        <line x1="84" y1="352" x2="72" y2="348" />
        <line x1="84" y1="362" x2="68" y2="360" />
        <line x1="84" y1="372" x2="70" y2="374" />
      </g>
    </svg>
  );
}
