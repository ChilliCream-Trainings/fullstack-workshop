/**
 * @generated SignedSource<<f97cbca30e224e46a44a6328a2c38e1d>>
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
      readonly $updatableFragmentSpreads: FragmentRefs<"cartCatalogItemQuantity_shoppingBasketItem_updateable">;
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"cartCatalogItemQuantity_shoppingBasketItem" | "cartItemsCatalogItemInfo_shoppingBasketItem" | "cartItemsCatalogItemTotal_shoppingBasketItem">;
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
      "concreteType": "ShoppingBasket",
      "kind": "LinkedField",
      "name": "basket",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ShoppingBasketItem",
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
              "name": "cartCatalogItemQuantity_shoppingBasketItem"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "cartItemsCatalogItemTotal_shoppingBasketItem"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "cartItemsCatalogItemInfo_shoppingBasketItem"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "cartCatalogItemQuantity_shoppingBasketItem_updateable"
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

(node as any).hash = "dc5ec4c96b6b6629aa08ab97c7d7e07c";

export default node;
