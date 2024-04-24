/**
 * @generated SignedSource<<744cb17388c42e133d4f75b12229d0ac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type OrderStatus = "AWAITING_VALIDATION" | "CANCELLED" | "PAID" | "SHIPPED" | "STOCK_CONFIRMED" | "SUBMITTED";
import { FragmentRefs } from "relay-runtime";
export type ordersListItem_order$data = {
  readonly date: any;
  readonly id: string;
  readonly status: OrderStatus;
  readonly total: any;
  readonly " $fragmentType": "ordersListItem_order";
};
export type ordersListItem_order$key = {
  readonly " $data"?: ordersListItem_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"ordersListItem_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ordersListItem_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "total",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "c30f23a6af9c1372642e09caa1b41868";

export default node;
