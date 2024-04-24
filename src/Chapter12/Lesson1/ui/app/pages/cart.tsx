import { graphql, useLazyLoadQuery } from "react-relay";
import { cartQuery } from "./__generated__/cartQuery.graphql";
import { CartItems } from "../components/cart/cart-items";
import { CartSummary } from "../components/cart/cart-summary";

import "./cart.css";
import { Title } from "../components/structural/title";
import { Link } from "react-router-dom";

export default function Cart() {
  const data = useLazyLoadQuery<cartQuery>(
    graphql`
      query cartQuery {
        viewer {
          basket {
            items {
              id
            }
          }
          ...cartSummary_viewer
          ...cartItems_viewer
        }
      }
    `,
    {}
  );

  if (!data.viewer) {
    return <NotLoggedIn />;
  }

  if ((data.viewer.basket?.items.length ?? 0) === 0) {
    return (
      <>
        <Title title="Cart" subtitle="" />
        <div className="cart">
          <p>
            Your shopping bag is empty. <Link to="/">Continue shopping.</Link>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Title title="Cart" subtitle="" />
      <div className="cart">
        <CartItems $ref={data.viewer} />
        <CartSummary $ref={data.viewer} />
      </div>
    </>
  );
}

function NotLoggedIn() {
  return (
    <h1>
      You are not logged in, logg in <a href="/bff/login">here</a>
    </h1>
  );
}
