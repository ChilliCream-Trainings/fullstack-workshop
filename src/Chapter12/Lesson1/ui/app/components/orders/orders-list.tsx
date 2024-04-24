import { graphql, useFragment, usePaginationFragment } from "react-relay";
import { ordersList_viewer$key } from "./__generated__/ordersList_viewer.graphql";
import { ordersListItem_order$key } from "./__generated__/ordersListItem_order.graphql";

import "./orders-list.css";
import { useIntersectionObserver } from "@/app/shared/utils/use-intersection-observer";
import { useEffect } from "react";
import { useLoadMoreFunction } from "react-relay/relay-hooks/useLoadMoreFunction";
import { useLoadMore } from "@/app/shared/utils/use-load-more";

interface OrdersListProps {
  $ref: ordersList_viewer$key;
}

export function OrdersList({ $ref }: OrdersListProps) {
  const { data, loadNext, hasNext } = usePaginationFragment(
    graphql`
      fragment ordersList_viewer on Viewer
      @refetchable(queryName: "OrdersListPaginationQuery")
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 10 }
      ) {
        orders(first: $count, after: $cursor)
          @connection(key: "OrdersList_viewer_orders") {
          edges {
            node {
              id
              ...ordersListItem_order
            }
          }
        }
      }
    `,
    $ref
  );

  const { element } = useLoadMore(loadNext, hasNext);
  return (
    <ul className="orders-list">
      <li className="orders-header orders-item">
        <div>Number</div>
        <div>Date</div>
        <div className="total-header">Total</div>
        <div>Status</div>
      </li>
      {data.orders?.edges?.map((x) => (
        <OrdersListItem key={x?.node.id} $ref={x?.node} />
      ))}
      {element}
    </ul>
  );
}

interface OrdersListItemProps {
  $ref: ordersListItem_order$key;
}

function OrdersListItem({ $ref }: OrdersListItemProps) {
  const data = useFragment(
    graphql`
      fragment ordersListItem_order on Order {
        id
        date
        total
        status
      }
    `,
    $ref
  );

  return (
    <li className="orders-item">
      <div className="order-number">{data.id}</div>
      <div className="order-date">{data.date}</div>
      <div className="order-total">${data.total}</div>
      <div className="order-status">
        <span className={`status ${data.status.toLowerCase()}`}>
          {data.status}
        </span>
      </div>
    </li>
  );
}
