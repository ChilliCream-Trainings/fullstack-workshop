import "./orders-list.css";

export function OrdersList() {
  return (
    <ul className="orders-list">
      <li className="orders-header orders-item">
        <div>Number</div>
        <div>Date</div>
        <div className="total-header">Total</div>
        <div>Status</div>
      </li>
      <OrdersListItem id="1" date="2021-01-01" total={100} status="Completed" />
      <OrdersListItem id="2" date="2021-01-02" total={50} status="Completed" />
      <OrdersListItem id="3" date="2021-01-03" total={25} status="Completed" />
      <OrdersListItem id="4" date="2021-01-04" total={100} status="Completed" />
    </ul>
  );
}

interface OrdersListItemProps {
  id: string;
  date: string;
  total: number;
  status: string;
}

function OrdersListItem({ id, date, total, status }: OrdersListItemProps) {
  return (
    <li className="orders-item">
      <div className="order-number">{id}</div>
      <div className="order-date">{date}</div>
      <div className="order-total">${total}</div>
      <div className="order-status">
        <span className={`status ${status.toLowerCase()}`}>{status}</span>
      </div>
    </li>
  );
}
