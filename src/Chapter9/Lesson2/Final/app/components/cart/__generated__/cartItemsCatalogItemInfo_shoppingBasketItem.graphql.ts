/**
 * @generated SignedSource<<5dfd194352db2265cacfc733a57e01da>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type cartItemsCatalogItemInfo_shoppingBasketItem$data = {
  readonly product: {
    readonly imageUrl: any;
    readonly name: string;
    readonly price: any;
  };
  readonly " $fragmentType": "cartItemsCatalogItemInfo_shoppingBasketItem";
};
export type cartItemsCatalogItemInfo_shoppingBasketItem$key = {
  readonly " $data"?: cartItemsCatalogItemInfo_shoppingBasketItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"cartItemsCatalogItemInfo_shoppingBasketItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cartItemsCatalogItemInfo_shoppingBasketItem",
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
          "name": "imageUrl",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "price",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ShoppingBasketItem",
  "abstractKey": null
};

(node as any).hash = "33b8aafacccf6ee5194ba4d22d8fb502";

export default node;
