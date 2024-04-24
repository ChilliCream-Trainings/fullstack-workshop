/**
 * @generated SignedSource<<989eb1b394732b5d236f48ce8eefe09b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type cartItemsCatalogItemInfo_basketItem$data = {
  readonly product: {
    readonly imageUrl: any;
    readonly name: string;
    readonly price: any;
  };
  readonly " $fragmentType": "cartItemsCatalogItemInfo_basketItem";
};
export type cartItemsCatalogItemInfo_basketItem$key = {
  readonly " $data"?: cartItemsCatalogItemInfo_basketItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"cartItemsCatalogItemInfo_basketItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cartItemsCatalogItemInfo_basketItem",
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
  "type": "BasketItem",
  "abstractKey": null
};

(node as any).hash = "9df7be0831979ad85c3c7464e4e7a1b9";

export default node;
