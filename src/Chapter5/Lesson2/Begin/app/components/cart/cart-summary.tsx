import "./cart-summary.css";
import { Link } from "react-router-dom";

export function CartSummary() {
  return (
    <div className="cart-summary">
      <div className="cart-summary-container">
        <div className="cart-summary-header">
          <img role="presentation" src="icons/cart.svg" />
          Your shopping bag
          <span className="filter-badge">0</span>
        </div>
        <div className="cart-summary-total">
          <div>Total</div>
          <div>150</div>
        </div>
        <Link to="/checkout" className="button button-primary">
          Check out
        </Link>
        <Link to="/" className="cart-summary-link">
          <img role="presentation" src="icons/arrow-left.svg" />
          <p>Continue shopping</p>
        </Link>
      </div>
    </div>
  );
}
