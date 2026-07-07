"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "ar" | "en";

const ar = {
  currency: "ر.س",
  nav: { order: "اطلب الآن", details: "المواصفات", reviews: "الآراء", faq: "الأسئلة" },
  hero: {
    eyebrow: "صُنعت للرافعين الجادّين",
    line1: "ارفع أثقل.",
    line2: "أمسك أطول.",
    sub: "أحزمة رفع بقطن كثيف وبطانة نيوبرين للمعصم، مختبرة حتى 250 كجم. لأن آخر تكرار هو اللي يفرق.",
    cta: "اطلب الآن",
    cta2: "شاهد المواصفات",
    from: "يبدأ من",
    shipNote: "توصيل 2–5 أيام لكل الخليج",
  },
  marquee: [
    "الدفع عند الاستلام",
    "مدى · Apple Pay · STC Pay",
    "شحن مجاني فوق 199 ر.س",
    "توصيل 2–5 أيام عمل",
    "ضمان استبدال سنة كاملة",
  ],
  product: {
    eyebrow: "المنتج",
    title: "حزام قبضة برو",
    desc: "زوج أحزمة رفع بطول 60 سم يلف مرتين حول البار. قطن 12 طبقة بخياطة مقوّاة وبطانة نيوبرين 5 ملم تحمي معصمك في الرفعات الثقيلة.",
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
      "قطن كثيف 12 طبقة",
      "بطانة نيوبرين 5 ملم",
      "خياطة بار-تاك مقوّاة",
      "حقيبة شبكية للحمل",
    ],
  },
  features: {
    eyebrow: "لماذا قبضة؟",
    title: "التفاصيل التي تتحمل الحديد",
    items: [
      { h: "قطن 12 طبقة", p: "نسيج قطني كثيف لا يتمدد ولا ينزلق مع العرق، ويلين مع الاستخدام بدون ما يفقد قوته." },
      { h: "مختبر حتى 250 كجم", p: "كل دفعة تُختبر على أوزان تتجاوز أثقل رفعاتك، حتى تسحب الديدلفت وأنت مطمئن." },
      { h: "بطانة نيوبرين 5 ملم", p: "حماية للمعصم من الضغط في السحبات الثقيلة، بدون سماكة زائدة تفقدك الإحساس بالبار." },
      { h: "خياطة بار-تاك", p: "نفس تقنية الخياطة المستخدمة في معدات التسلق، على كل نقطة تحمّل في الحزام." },
      { h: "طول 60 سم", p: "يلف مرتين كاملتين حول بار أولمبي 28 ملم، مع بقاء طرف كافٍ في قبضتك." },
      { h: "ضمان سنة", p: "لو انقطعت الخياطة أو تمزق النسيج خلال سنة، نستبدله. بدون أسئلة." },
    ],
  },
  stats: {
    items: [
      { n: 250, suffix: " كجم", label: "قوة تحمّل مختبرة" },
      { n: 12, suffix: " طبقة", label: "نسيج قطني" },
      { n: 60, suffix: " سم", label: "طول الحزام" },
      { n: 5, suffix: " أيام", label: "أقصى مدة توصيل" },
    ],
  },
  reviews: {
    eyebrow: "من الصالة",
    title: "قالوا عنها",
    items: [
      { name: "عبدالله م.", city: "الرياض", text: "ديدلفت 220 والحزام ثابت ما تحرك. القبضة كانت آخر همي." },
      { name: "فهد ع.", city: "الكويت", text: "وصلني خلال ثلاثة أيام. الخامة أفضل من حزام أمريكي دفعت فيه ضعف السعر." },
      { name: "سارة خ.", city: "جدة", text: "البطانة فرقت معي كثير في السحبات. ما عاد يترك آثار على معصمي." },
      { name: "محمد س.", city: "الدمام", text: "طلبت زوجين لي ولأخوي. الدفع عند الاستلام سهّل القرار." },
    ],
  },
  faq: {
    eyebrow: "الأسئلة الشائعة",
    title: "قبل ما تطلب",
    items: [
      { q: "كم يستغرق التوصيل؟", a: "داخل السعودية 2–3 أيام عمل. لدول الخليج (الإمارات، الكويت، قطر، البحرين، عُمان) 3–5 أيام عمل." },
      { q: "هل الدفع عند الاستلام متاح؟", a: "نعم، داخل السعودية. لدول الخليج الدفع الإلكتروني فقط (بطاقة، مدى، Apple Pay، STC Pay)." },
      { q: "كيف أستخدم الحزام؟", a: "أدخل يدك في العروة، لف الطرف الحر حول البار مرتين باتجاه جسمك، ثم اقبض على الحزام والبار معًا. مع أول جلسة يصير طبيعة ثانية." },
      { q: "ما سياسة الاستبدال؟", a: "استبدال مجاني خلال 14 يوم لو ما ناسبك، وضمان سنة كاملة ضد عيوب الخياطة والنسيج." },
      { q: "هل يناسب الكروس فت والرفعات الأولمبية؟", a: "مصمم أساسًا للسحبات الثقيلة: ديدلفت، رو، شراقات. للخطف والنتر ننصح بأحزمة أقصر، وهي على قائمتنا القادمة." },
    ],
  },
  finalCta: {
    title: "الحديد ما ينتظر.",
    sub: "اطلب اليوم ويوصلك خلال أيام. الدفع عند الاستلام متاح داخل السعودية.",
    cta: "اطلب قبضتك",
  },
  footer: {
    tag: "أحزمة رفع صُنعت لتتحمل أكثر منك.",
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
  nav: { order: "Order now", details: "Specs", reviews: "Reviews", faq: "FAQ" },
  hero: {
    eyebrow: "Built for serious lifters",
    line1: "Lift heavier.",
    line2: "Hold longer.",
    sub: "Heavy cotton lifting straps with neoprene wrist padding, load-tested to 250 kg. Because the last rep is the one that counts.",
    cta: "Order now",
    cta2: "See specs",
    from: "From",
    shipNote: "2–5 day delivery across the GCC",
  },
  marquee: [
    "Cash on delivery",
    "mada · Apple Pay · STC Pay",
    "Free shipping over 199 SAR",
    "Delivery in 2–5 working days",
    "Full 1-year replacement warranty",
  ],
  product: {
    eyebrow: "The product",
    title: "Qabda Pro Straps",
    desc: "A pair of 60 cm lifting straps that wrap twice around the bar. 12-ply heavy cotton with reinforced stitching and 5 mm neoprene padding to protect your wrists under heavy pulls.",
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
      "12-ply heavy cotton",
      "5 mm neoprene padding",
      "Reinforced bar-tack stitching",
      "Mesh carry pouch",
    ],
  },
  features: {
    eyebrow: "Why Qabda",
    title: "Details that hold up to iron",
    items: [
      { h: "12-ply cotton", p: "Dense cotton weave that won't stretch or slip with sweat, and breaks in without losing strength." },
      { h: "Tested to 250 kg", p: "Every batch is load-tested beyond your heaviest pulls, so you can commit to the deadlift with confidence." },
      { h: "5 mm neoprene padding", p: "Wrist protection under heavy pulls, without excess bulk that kills your bar feel." },
      { h: "Bar-tack stitching", p: "The same stitch technique used in climbing gear, at every load point on the strap." },
      { h: "60 cm length", p: "Wraps twice around a 28 mm Olympic bar with enough tail left in your grip." },
      { h: "1-year warranty", p: "If the stitching fails or the fabric tears within a year, we replace it. No questions." },
    ],
  },
  stats: {
    items: [
      { n: 250, suffix: " kg", label: "Tested load capacity" },
      { n: 12, suffix: "-ply", label: "Cotton weave" },
      { n: 60, suffix: " cm", label: "Strap length" },
      { n: 5, suffix: " days", label: "Max delivery time" },
    ],
  },
  reviews: {
    eyebrow: "From the gym floor",
    title: "What lifters say",
    items: [
      { name: "Abdullah M.", city: "Riyadh", text: "Pulled 220 on deadlift and the strap didn't budge. Grip was the last thing on my mind." },
      { name: "Fahad A.", city: "Kuwait", text: "Arrived in three days. Better material than an American strap I paid double for." },
      { name: "Sara K.", city: "Jeddah", text: "The padding made a real difference on pulls. No more marks on my wrists." },
      { name: "Mohammed S.", city: "Dammam", text: "Ordered two pairs for me and my brother. Cash on delivery made it an easy call." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Before you order",
    items: [
      { q: "How long is delivery?", a: "Within Saudi Arabia: 2–3 working days. GCC countries (UAE, Kuwait, Qatar, Bahrain, Oman): 3–5 working days." },
      { q: "Is cash on delivery available?", a: "Yes, within Saudi Arabia. For GCC countries, electronic payment only (card, mada, Apple Pay, STC Pay)." },
      { q: "How do I use the straps?", a: "Slide your hand through the loop, wrap the free end twice around the bar toward your body, then grip strap and bar together. It becomes second nature after one session." },
      { q: "What's the return policy?", a: "Free exchange within 14 days if it's not right for you, plus a full 1-year warranty against stitching and fabric defects." },
      { q: "Good for CrossFit and Olympic lifts?", a: "Designed primarily for heavy pulls: deadlifts, rows, shrugs. For snatch and clean & jerk we recommend shorter straps — they're on our roadmap." },
    ],
  },
  finalCta: {
    title: "The iron doesn't wait.",
    sub: "Order today and receive it within days. Cash on delivery available in Saudi Arabia.",
    cta: "Get your grip",
  },
  footer: {
    tag: "Lifting straps built to outlast you.",
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
