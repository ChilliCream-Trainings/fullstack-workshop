import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { cartSummary_viewer$key } from "./__generated__/cartSummary_viewer.graphql";

import "./cart-summary.css";
import { Link } from "react-router-dom";

interface CartSummaryProps {
  $ref: cartSummary_viewer$key;
}

export function CartSummary({ $ref }: CartSummaryProps) {
  const data = useFragment(
    graphql`
      fragment cartSummary_viewer on Viewer {
        basket {
          items {
            quantity
            product {
              name
              price
            }
          }
        }
      }
    `,
    $ref
  );

  const totalQuantity = data.basket?.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalPrice = data.basket?.items.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  return (
    <div className="cart-summary">
      <div className="cart-summary-container">
        <div className="cart-summary-header">
          <img role="presentation" src="icons/cart.svg" />
          Your shopping bag
          <span className="filter-badge">{totalQuantity}</span>
        </div>
        <div className="cart-summary-total">
          <div>Total</div>
          <div>${totalPrice}</div>
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
