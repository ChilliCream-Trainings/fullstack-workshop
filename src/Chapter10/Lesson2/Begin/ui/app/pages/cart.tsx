import "./cart.css";
import { useLoaderData } from "react-router-dom";
import { CartItems } from "../components/cart/cart-items";
import { CartSummary } from "../components/cart/cart-summary";
import { Title } from "../components/structural/title";
import { usePreloadedQuery } from "react-relay";
import { cartQuery } from "./__generated__/cartQuery.graphql";
import query from "./cart-query";
import { RelatedProducts } from "../components/cart/related-products";

export default function Cart() {
  const $ref = useLoaderData() as any;
  const data = usePreloadedQuery<cartQuery>(query, $ref);
  return (
    <>
      <Title title="Cart" subtitle="" />
      <div className="cart">
        <CartItems $ref={data.viewer} />
        <CartSummary $ref={data.viewer} />
      </div>
      <RelatedProducts $ref={data} />
    </>
  );
}
