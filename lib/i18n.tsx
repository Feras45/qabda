"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "ar" | "en";

const ar = {
  currency: "ر.س",
  nav: { order: "اطلب الآن", details: "المواصفات", faq: "الأسئلة" },
  hero: {
    eyebrow: "أحزمة رفع أثقال",
    line1: "ارفع أثقل.",
    line2: "أمسك أطول.",
    sub: "أحزمة رفع من قطن قوي مع بطانة ناعمة تريّح معصمك في السحبات الثقيلة.",
    cta: "اطلب الآن",
    cta2: "شاهد المواصفات",
    from: "يبدأ من",
    shipNote: "توصيل 2–5 أيام لكل الخليج",
  },
  product: {
    eyebrow: "المنتج",
    title: "حزام قبضة برو",
    desc: "زوج أحزمة بطول 60 سم يلتف مرتين حول البار. قطن 12 طبقة بخياطة مقوّاة وبطانة ناعمة 5 ملم تريّح معصمك في السحبات الثقيلة.",
    color: "اللون",
    qty: "الكمية (أزواج)",
    save: "وفّرت",
    perPair: "للزوج عند طلب زوجين أو أكثر",
    order: "اطلب الآن",
    whatsapp: "أو اطلب عبر واتساب",
    specsTitle: "في الصندوق",
    specs: [
      "زوج أحزمة (يمين + يسار)",
      "طول 60 سم × عرض 4 سم",
      "قطن 12 طبقة",
      "بطانة ناعمة 5 ملم",
      "خياطة مقوّاة",
      "كيس شبكي للحفظ",
    ],
  },
  features: {
    eyebrow: "لماذا قبضة؟",
    title: "تفاصيل تفرق في تمرينك",
    items: [
      { h: "قطن 12 طبقة", p: "قماش قطن قوي ما يتمدد ولا ينزلق مع العرق، ويلين مع الاستخدام." },
      { h: "قبضة ثابتة", p: "الحزام يلتف على البار ويثبت، فتكمل تكراراتك بدون ما تشغل بالك في قبضتك." },
      { h: "بطانة ناعمة 5 ملم", p: "تريّح معصمك في السحبات الثقيلة، وبنفس الوقت ما تفقدك الإحساس بالبار." },
      { h: "خياطة مقوّاة", p: "خياطة مضاعفة عند نقاط الشد، وهي أكثر مكان يتعرض للضغط في الحزام." },
      { h: "طول 60 سم", p: "يلتف لفتين كاملتين حول البار الأولمبي، ويبقى طرف كافي في قبضتك." },
      { h: "ضمان سنة", p: "لو انقطعت الخياطة أو تمزق القماش خلال سنة، نبدله لك." },
    ],
  },
  stats: {
    items: [
      { n: 12, suffix: " طبقة", label: "قماش قطن" },
      { n: 60, suffix: " سم", label: "طول الحزام" },
      { n: 5, suffix: " ملم", label: "سماكة البطانة" },
      { n: 5, suffix: " أيام", label: "أقصى مدة توصيل" },
    ],
  },
  faq: {
    eyebrow: "الأسئلة الشائعة",
    title: "قبل ما تطلب",
    items: [
      { q: "كم يستغرق التوصيل؟", a: "داخل السعودية 2–3 أيام عمل. لدول الخليج (الإمارات، الكويت، قطر، البحرين، عُمان) 3–5 أيام عمل." },
      { q: "هل الدفع عند الاستلام متاح؟", a: "نعم، داخل السعودية. لدول الخليج الدفع الإلكتروني فقط (بطاقة، مدى، Apple Pay، STC Pay)." },
      { q: "كيف أستخدم الحزام؟", a: "أدخل يدك في العروة، ولف الطرف الحر حول البار مرتين باتجاه جسمك، ثم اقبض على الحزام والبار مع بعض. من أول تمرين بتتعوّد عليه." },
      { q: "ما سياسة الاستبدال؟", a: "استبدال مجاني خلال 14 يوم لو ما ناسبك، وضمان سنة على الخياطة والقماش." },
      { q: "هل يناسب الكروس فت والرفعات الأولمبية؟", a: "مناسب للسحبات الثقيلة مثل الديدلفت والرو والشراقات. للخطف والنتر الأفضل أحزمة أقصر." },
    ],
  },
  finalCta: {
    title: "الحديد ما ينتظر.",
    sub: "اطلب اليوم ويوصلك خلال أيام. الدفع عند الاستلام متاح داخل السعودية.",
    cta: "اطلب قبضتك",
  },
  footer: {
    tag: "أحزمة رفع أثقال.",
    rights: "© 2026 قبضة. جميع الحقوق محفوظة.",
    payments: "مدى · Visa · Mastercard · Apple Pay · STC Pay · الدفع عند الاستلام",
  },
  checkout: {
    title: "إتمام الطلب",
    back: "رجوع للمتجر",
    summary: "ملخص الطلب",
    product: "حزام قبضة برو",
    pair: "زوج",
    pairs: "أزواج",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    freeShip: "مجاني",
    total: "الإجمالي",
    info: "بيانات التوصيل",
    name: "الاسم الكامل",
    phone: "رقم الجوال",
    phonePh: "05xxxxxxxx",
    country: "الدولة",
    city: "المدينة",
    address: "العنوان (الحي، الشارع، رقم المبنى)",
    notes: "ملاحظات (اختياري)",
    payTitle: "طريقة الدفع",
    payCard: "دفع إلكتروني",
    payCardSub: "مدى · بطاقة ائتمانية · STC Pay",
    payCod: "الدفع عند الاستلام",
    payCodSub: "متاح داخل السعودية فقط",
    place: "تأكيد الطلب",
    placeCard: "المتابعة للدفع",
    processing: "جاري المعالجة…",
    payNow: "أكمل الدفع بأمان",
    secure: "الدفع مشفّر عبر ميسر، مزود دفع سعودي مرخّص",
    errRequired: "فضلًا عبّئ جميع الحقول المطلوبة",
    errPhone: "رقم الجوال غير صحيح",
    errServer: "حدث خطأ، حاول مرة أخرى",
  },
  success: {
    title: "استلمنا طلبك",
    sub: "بنتواصل معك على جوالك لتأكيد التفاصيل قبل الشحن.",
    orderNo: "رقم الطلب",
    statusPaid: "تم الدفع بنجاح",
    statusCod: "الدفع عند الاستلام",
    statusPending: "بانتظار تأكيد الدفع",
    home: "الرجوع للمتجر",
  },
};

export type Dict = typeof ar;

const en: Dict = {
  currency: "SAR",
  nav: { order: "Order now", details: "Specs", faq: "FAQ" },
  hero: {
    eyebrow: "Weightlifting straps",
    line1: "Lift heavier.",
    line2: "Hold longer.",
    sub: "Cotton lifting straps with soft padding that keeps your wrists comfortable on heavy pulls.",
    cta: "Order now",
    cta2: "See specs",
    from: "From",
    shipNote: "2–5 day delivery across the GCC",
  },
  product: {
    eyebrow: "The product",
    title: "Qabda Pro Straps",
    desc: "A pair of 60 cm straps that wrap twice around the bar. 12-ply cotton with reinforced stitching and 5 mm soft padding to keep your wrists comfortable under heavy pulls.",
    color: "Color",
    qty: "Quantity (pairs)",
    save: "You save",
    perPair: "per pair when ordering 2+",
    order: "Order now",
    whatsapp: "Or order via WhatsApp",
    specsTitle: "In the box",
    specs: [
      "Pair of straps (left + right)",
      "60 cm long × 4 cm wide",
      "12-ply cotton",
      "5 mm soft padding",
      "Reinforced stitching",
      "Mesh pouch",
    ],
  },
  features: {
    eyebrow: "Why Qabda",
    title: "Details that make a difference",
    items: [
      { h: "12-ply cotton", p: "Strong cotton weave that won't stretch or slip with sweat, and softens with use." },
      { h: "Steady grip", p: "The strap wraps around the bar and holds, so you can finish your reps without thinking about your grip." },
      { h: "5 mm soft padding", p: "Keeps your wrists comfortable under heavy pulls without killing your feel for the bar." },
      { h: "Reinforced stitching", p: "Double stitching at the load points, where the strap takes the most pressure." },
      { h: "60 cm length", p: "Wraps twice around an Olympic bar with enough tail left in your grip." },
      { h: "1-year warranty", p: "If the stitching fails or the fabric tears within a year, we replace it." },
    ],
  },
  stats: {
    items: [
      { n: 12, suffix: "-ply", label: "Cotton weave" },
      { n: 60, suffix: " cm", label: "Strap length" },
      { n: 5, suffix: " mm", label: "Padding thickness" },
      { n: 5, suffix: " days", label: "Max delivery time" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Before you order",
    items: [
      { q: "How long is delivery?", a: "Within Saudi Arabia: 2–3 working days. GCC countries (UAE, Kuwait, Qatar, Bahrain, Oman): 3–5 working days." },
      { q: "Is cash on delivery available?", a: "Yes, within Saudi Arabia. For GCC countries, electronic payment only (card, mada, Apple Pay, STC Pay)." },
      { q: "How do I use the straps?", a: "Slide your hand through the loop, wrap the free end twice around the bar toward your body, then grip strap and bar together. You'll get used to it from the first session." },
      { q: "What's the return policy?", a: "Free exchange within 14 days if it's not right for you, plus a 1-year warranty on the stitching and fabric." },
      { q: "Good for CrossFit and Olympic lifts?", a: "Suited to heavy pulls like deadlifts, rows and shrugs. For snatch and clean & jerk, shorter straps work better." },
    ],
  },
  finalCta: {
    title: "The iron doesn't wait.",
    sub: "Order today and receive it within days. Cash on delivery available in Saudi Arabia.",
    cta: "Get your grip",
  },
  footer: {
    tag: "Weightlifting straps.",
    rights: "© 2026 Qabda. All rights reserved.",
    payments: "mada · Visa · Mastercard · Apple Pay · STC Pay · Cash on delivery",
  },
  checkout: {
    title: "Checkout",
    back: "Back to store",
    summary: "Order summary",
    product: "Qabda Pro Straps",
    pair: "pair",
    pairs: "pairs",
    subtotal: "Subtotal",
    shipping: "Shipping",
    freeShip: "Free",
    total: "Total",
    info: "Delivery details",
    name: "Full name",
    phone: "Mobile number",
    phonePh: "05xxxxxxxx",
    country: "Country",
    city: "City",
    address: "Address (district, street, building)",
    notes: "Notes (optional)",
    payTitle: "Payment method",
    payCard: "Pay online",
    payCardSub: "mada · Credit card · STC Pay",
    payCod: "Cash on delivery",
    payCodSub: "Saudi Arabia only",
    place: "Confirm order",
    placeCard: "Continue to payment",
    processing: "Processing…",
    payNow: "Complete payment securely",
    secure: "Payments encrypted via Moyasar, a licensed Saudi payment provider",
    errRequired: "Please fill in all required fields",
    errPhone: "Invalid mobile number",
    errServer: "Something went wrong, please try again",
  },
  success: {
    title: "Order received",
    sub: "We'll contact you on your mobile to confirm details before shipping.",
    orderNo: "Order number",
    statusPaid: "Payment successful",
    statusCod: "Cash on delivery",
    statusPending: "Awaiting payment confirmation",
    home: "Back to store",
  },
};

const dicts: Record<Lang, Dict> = { ar, en };

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "ar",
  setLang: () => {},
  t: ar,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: dicts[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
