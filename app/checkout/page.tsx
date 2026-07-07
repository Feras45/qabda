import CheckoutForm from "@/components/CheckoutForm";
import { isValidColor } from "@/lib/config";

export const metadata = { title: "إتمام الطلب — قبضة QABDA" };

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { color?: string; qty?: string };
}) {
  const color = searchParams.color && isValidColor(searchParams.color) ? searchParams.color : "black";
  const qty = Math.min(Math.max(parseInt(searchParams.qty || "1") || 1, 1), 5);

  return <CheckoutForm initialColor={color} initialQty={qty} />;
}
