import { graphql, useFragment } from "react-relay";
import { cartMenuViewer$key } from "./__generated__/cartMenuViewer.graphql";
import { Link } from "react-router-dom";

import "./cart-menu.css";

interface CartMenuProps {
  $ref: cartMenuViewer$key;
}

export function CartMenu({ $ref }: CartMenuProps) {
  const data = useFragment(
    graphql`
      fragment cartMenuViewer on Viewer {
        basket {
          items {
            id
          }
        }
      }
    `,
    $ref
  );

  const length = data.basket?.items?.length ?? 0;
  return (
    <Link aria-label="cart" to="/cart">
      <img role="presentation" src="/icons/cart.svg" />
      {length === 0 ? null : <span className="cart-badge">{length}</span>}
    </Link>
  );
}
