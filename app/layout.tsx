import type { Metadata, Viewport } from "next";
import { Changa, IBM_Plex_Sans_Arabic } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const changa = Changa({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-changa",
  display: "swap",
});

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "قبضة QABDA — أحزمة رفع الأثقال",
  description:
    "أحزمة رفع أثقال بقطن كثيف وبطانة نيوبرين، مختبرة حتى 250 كجم. دفع عند الاستلام، مدى، وApple Pay. توصيل سريع للسعودية والخليج.",
  openGraph: {
    title: "قبضة QABDA — أحزمة رفع الأثقال",
    description: "ارفع أثقل. أمسك أطول. توصيل سريع لكل الخليج.",
    locale: "ar_SA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0D0B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${changa.variable} ${plex.variable}`}>
      <head>
        {/* Moyasar payment form styles (used on /checkout) */}
        <link rel="stylesheet" href="https://cdn.moyasar.com/mpf/1.15.0/moyasar.css" />
      </head>
      <body className="grain">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
