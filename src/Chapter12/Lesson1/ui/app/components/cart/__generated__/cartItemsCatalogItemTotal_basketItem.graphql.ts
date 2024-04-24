/**
 * @generated SignedSource<<3c88024b0ed315006962eb4aaaf7bdd3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type cartItemsCatalogItemTotal_basketItem$data = {
  readonly product: {
    readonly price: any;
  };
  readonly quantity: number;
  readonly " $fragmentType": "cartItemsCatalogItemTotal_basketItem";
};
export type cartItemsCatalogItemTotal_basketItem$key = {
  readonly " $data"?: cartItemsCatalogItemTotal_basketItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"cartItemsCatalogItemTotal_basketItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cartItemsCatalogItemTotal_basketItem",
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
  "type": "BasketItem",
  "abstractKey": null
};

(node as any).hash = "566b85c9c3b75a583ebe60c6952fb4d4";

export default node;
