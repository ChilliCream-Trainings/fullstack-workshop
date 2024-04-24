/**
 * @generated SignedSource<<0b293f6baeb8e8861ddcbaef6b7f5025>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type productDetails_query$data = {
  readonly viewer: {
    readonly basket: {
      readonly " $fragmentSpreads": FragmentRefs<"productAmountInBasket_basket">;
    } | null | undefined;
  };
  readonly " $fragmentType": "productDetails_query";
};
export type productDetails_query$key = {
  readonly " $data"?: productDetails_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"productDetails_query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "productDetails_query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Viewer",
      "kind": "LinkedField",
      "name": "viewer",
      "plural": false,
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "productAmountInBasket_basket"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "2b822b50a1bf2656b76c18a47f0a4eef";

export default node;
