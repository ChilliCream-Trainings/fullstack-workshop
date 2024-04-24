import { graphql, useLazyLoadQuery } from "react-relay";

import { Title } from "../components/structural/title";
import { CheckoutFrom } from "../components/checkout/checkout-form";
import "./cart.css";
import { checkoutQuery } from "./__generated__/checkoutQuery.graphql";

export default function Checkout() {
  const data = useLazyLoadQuery<checkoutQuery>(
    graphql`
      query checkoutQuery {
        ...checkoutForm
      }
    `,
    {}
  );

  return (
    <>
      <Title title="Checkout" subtitle="" />
      <CheckoutFrom $ref={data} />
    </>
  );
}
