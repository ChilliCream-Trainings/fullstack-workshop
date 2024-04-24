/**
 * @generated SignedSource<<584d65da0959dc67cd4d32c9f3b816a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type cartCatalogItemQuantity_shoppingBasketItem$data = {
  readonly id: string;
  readonly quantity: number;
  readonly " $fragmentType": "cartCatalogItemQuantity_shoppingBasketItem";
};
export type cartCatalogItemQuantity_shoppingBasketItem$key = {
  readonly " $data"?: cartCatalogItemQuantity_shoppingBasketItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"cartCatalogItemQuantity_shoppingBasketItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cartCatalogItemQuantity_shoppingBasketItem",
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
  "type": "ShoppingBasketItem",
  "abstractKey": null
};

(node as any).hash = "7620b643d9056b8112b4da2669da71cf";

export default node;
