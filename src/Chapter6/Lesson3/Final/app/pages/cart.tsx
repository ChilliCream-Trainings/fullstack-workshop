import { CartItems } from "../components/cart/cart-items";
import { CartSummary } from "../components/cart/cart-summary";
import { Title } from "../components/structural/title";

import "./cart.css";

export default function Cart() {
  return (
    <>
      <Title title="Cart" subtitle="" />
      <div className="cart">
        <CartItems />
        <CartSummary />
      </div>
    </>
  );
}
