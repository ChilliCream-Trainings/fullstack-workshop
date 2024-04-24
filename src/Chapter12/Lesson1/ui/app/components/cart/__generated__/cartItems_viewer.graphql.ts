/**
 * @generated SignedSource<<7bff5713233e52fcdb72c801e37793c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type cartItems_viewer$data = {
  readonly basket: {
    readonly items: ReadonlyArray<{
      readonly $updatableFragmentSpreads: FragmentRefs<"cartCatalogItemQuantity_basketItem_updateable">;
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"cartCatalogItemQuantity_basketItem" | "cartItemsCatalogItemInfo_basketItem" | "cartItemsCatalogItemTotal_basketItem">;
    }>;
  } | null | undefined;
  readonly " $fragmentType": "cartItems_viewer";
};
export type cartItems_viewer$key = {
  readonly " $data"?: cartItems_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"cartItems_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cartItems_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Basket",
      "kind": "LinkedField",
      "name": "basket",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "BasketItem",
          "kind": "LinkedField",
          "name": "items",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "cartCatalogItemQuantity_basketItem"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "cartCatalogItemQuantity_basketItem_updateable"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "cartItemsCatalogItemTotal_basketItem"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "cartItemsCatalogItemInfo_basketItem"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "e56e9124e78e28667e03a11920bd5e89";

export default node;
