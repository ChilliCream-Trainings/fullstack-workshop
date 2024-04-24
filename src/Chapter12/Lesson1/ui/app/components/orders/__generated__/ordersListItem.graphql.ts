/**
 * @generated SignedSource<<9f825f36e4add5e53dad1fb9a68da63a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type OrderStatus = "AWAITING_VALIDATION" | "CANCELLED" | "PAID" | "SHIPPED" | "STOCK_CONFIRMED" | "SUBMITTED";
import { FragmentRefs } from "relay-runtime";
export type ordersListItem$data = {
  readonly date: any;
  readonly id: string;
  readonly status: OrderStatus;
  readonly total: any;
  readonly " $fragmentType": "ordersListItem";
};
export type ordersListItem$key = {
  readonly " $data"?: ordersListItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"ordersListItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ordersListItem",
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

(node as any).hash = "d22789e6b1a9fc3d8785515d009ae929";

export default node;
