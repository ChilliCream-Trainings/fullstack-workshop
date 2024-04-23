import { Link } from "react-router-dom";

import "./cart-menu.css";

export function CartMenu() {
  return (
    <Link aria-label="cart" to="/cart">
      <img role="presentation" src="/icons/cart.svg" />
      <span className="cart-badge">0</span>
    </Link>
  );
}
