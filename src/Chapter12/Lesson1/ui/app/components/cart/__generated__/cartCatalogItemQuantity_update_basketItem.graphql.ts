/**
 * @generated SignedSource<<e9bbc1b43284e8638869a03250320bf1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type cartCatalogItemQuantity_update_basketItem$data = {
  readonly id: string;
  readonly quantity: number;
  readonly " $fragmentType": "cartCatalogItemQuantity_update_basketItem";
};
export type cartCatalogItemQuantity_update_basketItem$key = {
  readonly " $data"?: cartCatalogItemQuantity_update_basketItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"cartCatalogItemQuantity_update_basketItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cartCatalogItemQuantity_update_basketItem",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "quantity",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "BasketItem",
  "abstractKey": null
};

(node as any).hash = "904f75795ac596a07aa6e8b693faaf4a";

export default node;
