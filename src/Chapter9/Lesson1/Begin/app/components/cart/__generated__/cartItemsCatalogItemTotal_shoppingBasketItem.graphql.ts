/**
 * @generated SignedSource<<9cd7945b897bbb0d3421a6fc1190f64f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type cartItemsCatalogItemTotal_shoppingBasketItem$data = {
  readonly product: {
    readonly price: any;
  };
  readonly quantity: number;
  readonly " $fragmentType": "cartItemsCatalogItemTotal_shoppingBasketItem";
};
export type cartItemsCatalogItemTotal_shoppingBasketItem$key = {
  readonly " $data"?: cartItemsCatalogItemTotal_shoppingBasketItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"cartItemsCatalogItemTotal_shoppingBasketItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cartItemsCatalogItemTotal_shoppingBasketItem",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Product",
      "kind": "LinkedField",
      "name": "product",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "price",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "quantity",
      "storageKey": null
    }
  ],
  "type": "ShoppingBasketItem",
  "abstractKey": null
};

(node as any).hash = "b5764a455db4ac54a6117039ae574126";

export default node;
