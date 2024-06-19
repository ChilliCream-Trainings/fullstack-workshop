import { Link } from "react-router-dom";
import { productAmountInBasket_basket$key } from "./__generated__/productAmountInBasket_basket.graphql";
import { graphql, useFragment } from "react-relay";

interface ProductAmountInBasketProps {
  productId: string;
  $ref?: productAmountInBasket_basket$key | null;
}
export function ProductAmountInBasket({
  productId,
  $ref,
}: ProductAmountInBasketProps) {
  const data = useFragment(
    graphql`
      fragment productAmountInBasket_basket on ShoppingBasket {
        items {
          product {
            id
          }
          quantity
        }
      }
    `,
    $ref
  );

  const amount =
    data?.items.find((x) => x.product.id == productId)?.quantity ?? 0;

  return (
    <p>
      <strong>{amount}</strong> in <Link to="/cart">shopping bag</Link>
    </p>
  );
}
