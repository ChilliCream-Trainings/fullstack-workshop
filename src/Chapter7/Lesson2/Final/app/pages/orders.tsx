import { Title } from "../components/structural/title";
import { OrdersList } from "../components/orders/orders-list";

import "./orders.css";

export default function Orders() {
  return (
    <>
      <Title title="Cart" subtitle="" />
      <div className="orders">
        <OrdersList />
      </div>
    </>
  );
}
