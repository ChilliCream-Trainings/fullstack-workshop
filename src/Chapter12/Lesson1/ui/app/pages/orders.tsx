import { graphql, useLazyLoadQuery } from "react-relay";
import { Title } from "../components/structural/title";
import { OrdersList } from "../components/orders/orders-list";
import { ordersQuery } from "./__generated__/ordersQuery.graphql";

import "./orders.css";

export default function Orders() {
  const data = useLazyLoadQuery<ordersQuery>(
    graphql`
      query ordersQuery {
        viewer {
          ...ordersList_viewer
        }
      }
    `,
    {}
  );

  if (!data.viewer) {
    return <NotLoggedIn />;
  }

  return (
    <>
      <Title title="Cart" subtitle="" />
      <div className="orders">
        <OrdersList $ref={data.viewer} />
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
