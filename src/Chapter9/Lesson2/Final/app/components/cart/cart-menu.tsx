import "./cart-menu.css";
import { graphql, useFragment } from "react-relay";
import { Link } from "react-router-dom";
import { cartMenu_viewer$key } from "./__generated__/cartMenu_viewer.graphql";

interface CartMenuProps {
  $ref: cartMenu_viewer$key;
}

export function CartMenu({ $ref }: CartMenuProps) {
  const data = useFragment(
    graphql`
      fragment cartMenu_viewer on Viewer {
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
