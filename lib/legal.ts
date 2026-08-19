// Store policies, written against the Saudi E-Commerce Law (نظام التجارة الإلكترونية,
// issued 2019) and its Implementing Regulations.
//
// Statutory points reflected below:
//   - Consumer may cancel within 7 days of receiving the goods, without giving a
//     reason, provided the goods are unused (Art. 13). Exceptions apply to
//     custom-made, perishable, and opened/sealed goods.
//   - Consumer may cancel and be refunded if the order is not delivered within 15 days.
//   - Refunds go back through the original payment method, within 15 days.
//   - The store must disclose its commercial name, CR number, address and contact
//     details, the total price, shipping cost, delivery timeframe, and a written
//     return policy.
//
// This is a good-faith implementation, not legal advice — have it reviewed before
// launch, and keep it in sync with the actual terms you operate under.

import {
  FREE_SHIPPING_SA_OVER,
  SHIPPING_SA,
  SHIPPING_GCC,
  PRICE_SINGLE,
  PRICE_MULTI,
} from "./config";

/** Merchant identity — REQUIRED by law before you launch. Set these in Vercel. */
export const MERCHANT = {
  name: process.env.NEXT_PUBLIC_MERCHANT_NAME || "",
  cr: process.env.NEXT_PUBLIC_MERCHANT_CR || "",
  vat: process.env.NEXT_PUBLIC_MERCHANT_VAT || "",
  address: process.env.NEXT_PUBLIC_MERCHANT_ADDRESS || "",
  email: process.env.NEXT_PUBLIC_MERCHANT_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_MERCHANT_PHONE || "",
  maroof: process.env.NEXT_PUBLIC_MAROOF_URL || "",
};

export type Section = { id: string; title: string; body: string[] };

export const legalAr = {
  title: "السياسات والشروط",
  intro: "هذه الصفحة توضح من نحن، وكيف نشحن، وحقوقك في الإرجاع والاسترداد، وكيف نتعامل مع بياناتك.",
  identityTitle: "معلومات المتجر",
  identityLabels: {
    name: "الاسم التجاري",
    cr: "السجل التجاري",
    vat: "الرقم الضريبي",
    address: "العنوان",
    email: "البريد الإلكتروني",
    phone: "الجوال",
    maroof: "معروف",
  },
  identityMissing: "لم تُضف بيانات المتجر بعد.",
  sections: [
    {
      id: "shipping",
      title: "الشحن والتوصيل",
      body: [
        "داخل السعودية: التوصيل خلال 2–3 أيام عمل. باقي دول الخليج (الإمارات، الكويت، قطر، البحرين، عُمان): 3–5 أيام عمل.",
        `رسوم الشحن داخل السعودية ${SHIPPING_SA} ر.س، ومجانية للطلبات ${FREE_SHIPPING_SA_OVER} ر.س فأكثر. الشحن لدول الخليج ${SHIPPING_GCC} ر.س.`,
        "لو تأخر طلبك أكثر من 15 يوم من تاريخ الطلب ولم يصلك، يحق لك إلغاء الطلب واسترداد المبلغ كاملًا.",
        "نتواصل معك على جوالك لتأكيد العنوان قبل الشحن، فتأكد من صحة رقم الجوال عند الطلب.",
      ],
    },
    {
      id: "returns",
      title: "الإرجاع والاستبدال",
      body: [
        "يحق لك إلغاء الطلب واسترداد المبلغ خلال 7 أيام من استلام المنتج، بدون الحاجة لذكر سبب، بشرط أن يكون المنتج غير مستخدم وبحالته وتغليفه الأصلي. هذا حق مكفول لك بموجب نظام التجارة الإلكترونية.",
        "بالإضافة لذلك، نوفر استبدال مجاني خلال 14 يوم من الاستلام لو ما ناسبك المقاس أو اللون، بنفس الشرط: المنتج غير مستخدم وبتغليفه الأصلي.",
        "يُستثنى من حق الإرجاع المنتج المستخدم أو التالف بسبب سوء الاستخدام، والمنتجات المصنوعة حسب طلب خاص.",
        "نرد المبلغ بنفس وسيلة الدفع التي استخدمتها، خلال مدة لا تتجاوز 15 يوم من تاريخ استلامنا للمنتج المرتجع أو إلغاء الطلب. الدفع عند الاستلام يُرد تحويلًا بنكيًا على حسابك.",
        "ضمان سنة على الخياطة والقماش: لو انقطعت الخياطة أو تمزق القماش خلال سنة من الاستلام، نبدله لك.",
        "لطلب إرجاع أو استبدال، تواصل معنا على بيانات التواصل أعلاه ومعك رقم الطلب.",
      ],
    },
    {
      id: "payment",
      title: "الأسعار والدفع",
      body: [
        `السعر ${PRICE_SINGLE} ر.س للزوج الواحد، و${PRICE_MULTI} ر.س للزوج عند طلب زوجين أو أكثر.`,
        "جميع الأسعار بالريال السعودي وهي الأسعار النهائية شاملة الضريبة إن كانت مطبقة. لا تُضاف أي رسوم عند الدفع عدا الشحن الموضّح في صفحة إتمام الطلب.",
        "وسائل الدفع: مدى، بطاقات Visa وMastercard، STC Pay، والدفع عند الاستلام داخل السعودية فقط.",
        "عمليات الدفع الإلكتروني تتم عبر بوابة ميسر، وهي مزود دفع مرخّص من البنك المركزي السعودي. لا نحفظ بيانات بطاقتك على خوادمنا إطلاقًا.",
      ],
    },
    {
      id: "privacy",
      title: "الخصوصية وحماية البيانات",
      body: [
        "نجمع فقط ما نحتاجه لتنفيذ طلبك: الاسم، رقم الجوال، الدولة، المدينة، العنوان، وأي ملاحظات تكتبها.",
        "نشارك بياناتك مع شركة الشحن لتوصيل طلبك، ومع مزود الدفع لإتمام العملية. لا نبيع بياناتك ولا نشاركها مع أي جهة أخرى لأغراض تسويقية.",
        "نحتفظ ببيانات الطلب للمدة اللازمة لتنفيذه ولمتطلبات المحاسبة والأنظمة، ثم نتخلص منها.",
        "يحق لك طلب الاطلاع على بياناتك أو تصحيحها أو حذفها. راسلنا على البريد الإلكتروني أعلاه.",
      ],
    },
    {
      id: "complaints",
      title: "الشكاوى",
      body: [
        "لو عندك أي ملاحظة أو شكوى، تواصل معنا مباشرة وبنرد عليك في أسرع وقت.",
        "كما يمكنك تقديم شكوى لوزارة التجارة عبر تطبيق أو موقع الوزارة، أو الاتصال على 1900.",
      ],
    },
  ] as Section[],
};

export type Legal = typeof legalAr;

export const legalEn: Legal = {
  title: "Policies & Terms",
  intro: "Who we are, how we ship, your return and refund rights, and how we handle your data.",
  identityTitle: "Store information",
  identityLabels: {
    name: "Trade name",
    cr: "Commercial registration",
    vat: "VAT number",
    address: "Address",
    email: "Email",
    phone: "Mobile",
    maroof: "Maroof",
  },
  identityMissing: "Store details have not been added yet.",
  sections: [
    {
      id: "shipping",
      title: "Shipping & delivery",
      body: [
        "Within Saudi Arabia: 2–3 working days. Other GCC countries (UAE, Kuwait, Qatar, Bahrain, Oman): 3–5 working days.",
        `Shipping within Saudi Arabia is ${SHIPPING_SA} SAR, free on orders of ${FREE_SHIPPING_SA_OVER} SAR or more. Shipping to GCC countries is ${SHIPPING_GCC} SAR.`,
        "If your order has not arrived within 15 days of being placed, you may cancel it and receive a full refund.",
        "We call you to confirm your address before shipping, so please make sure your mobile number is correct at checkout.",
      ],
    },
    {
      id: "returns",
      title: "Returns & exchanges",
      body: [
        "You may cancel your order and get your money back within 7 days of receiving the product, without giving a reason, provided it is unused and in its original condition and packaging. This is your right under the Saudi E-Commerce Law.",
        "On top of that, we offer a free exchange within 14 days of delivery if the colour isn't right for you — same condition: unused and in its original packaging.",
        "The right of return does not cover products that have been used or damaged through misuse, or products made to a custom specification.",
        "Refunds go back through the same payment method you used, within no more than 15 days of us receiving the returned product or cancelling the order. Cash-on-delivery orders are refunded by bank transfer.",
        "One-year warranty on stitching and fabric: if the stitching fails or the fabric tears within a year of delivery, we replace it.",
        "To request a return or exchange, contact us using the details above with your order number to hand.",
      ],
    },
    {
      id: "payment",
      title: "Prices & payment",
      body: [
        `${PRICE_SINGLE} SAR for a single pair, ${PRICE_MULTI} SAR per pair when ordering two or more.`,
        "All prices are in Saudi Riyals and are final, inclusive of VAT where it applies. No fees are added at checkout beyond the shipping shown on the checkout page.",
        "Payment methods: mada, Visa and Mastercard, STC Pay, and cash on delivery within Saudi Arabia only.",
        "Online payments are processed by Moyasar, a payment provider licensed by the Saudi Central Bank. We never store your card details on our servers.",
      ],
    },
    {
      id: "privacy",
      title: "Privacy & data protection",
      body: [
        "We collect only what we need to fulfil your order: name, mobile number, country, city, address, and any notes you write.",
        "We share your details with the courier to deliver your order, and with the payment provider to process payment. We do not sell your data or share it with anyone else for marketing.",
        "We keep order data for as long as needed to fulfil the order and to meet accounting and regulatory requirements, then dispose of it.",
        "You may ask to see, correct, or delete your data. Email us at the address above.",
      ],
    },
    {
      id: "complaints",
      title: "Complaints",
      body: [
        "If something is wrong, contact us directly and we'll get back to you as soon as we can.",
        "You may also file a complaint with the Ministry of Commerce through its app or website, or by calling 1900.",
      ],
    },
  ],
};

export const legalDicts = { ar: legalAr, en: legalEn };
