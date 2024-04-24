import { graphql, useFragment } from "react-relay";
import { productAmountInBasket_basket$key } from "./__generated__/productAmountInBasket_basket.graphql";
import { Link } from "react-router-dom";

interface ProductAmountInBasketProps {
  $ref?: productAmountInBasket_basket$key | null;
  productId: string;
}
export function ProductAmountInBasket({
  productId,
  $ref,
}: ProductAmountInBasketProps) {
  const data = useFragment(
    graphql`
      fragment productAmountInBasket_basket on Basket {
        items {
          id
          quantity
          product {
            id
          }
        }
      }
    `,
    $ref
  );
  if (!data) {
    return null;
  }

  const amount =
    data?.items.find((x) => x.product.id == productId)?.quantity ?? 0;

  return (
    <p>
      <strong>{amount}</strong> in <Link to="/cart">shopping bag</Link>
    </p>
  );
}
