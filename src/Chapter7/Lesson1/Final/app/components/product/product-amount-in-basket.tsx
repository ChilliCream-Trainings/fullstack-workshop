import { Link } from "react-router-dom";

interface ProductAmountInBasketProps {
  productId: string;
}
export function ProductAmountInBasket({
  productId,
}: ProductAmountInBasketProps) {
  return (
    <p>
      <strong>{0}</strong> in <Link to="/cart">shopping bag</Link>
    </p>
  );
}
