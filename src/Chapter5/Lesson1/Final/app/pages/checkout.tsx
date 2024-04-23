import { Title } from "../components/structural/title";
import { CheckoutFrom } from "../components/checkout/checkout-form";
import "./cart.css";

export default function Checkout() {
  return (
    <>
      <Title title="Checkout" subtitle="" />
      <CheckoutFrom />
    </>
  );
}
