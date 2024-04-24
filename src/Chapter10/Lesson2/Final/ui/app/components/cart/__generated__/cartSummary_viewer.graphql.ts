/**
 * @generated SignedSource<<426293a470258764a928584a82f0cb61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type cartSummary_viewer$data = {
  readonly basket: {
    readonly items: ReadonlyArray<{
      readonly product: {
        readonly name: string;
        readonly price: any;
      };
      readonly quantity: number;
    }>;
  } | null | undefined;
  readonly " $fragmentType": "cartSummary_viewer";
};
export type cartSummary_viewer$key = {
  readonly " $data"?: cartSummary_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"cartSummary_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cartSummary_viewer",
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
              "name": "quantity",
              "storageKey": null
            },
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
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "f8b510dddd5b1a2b5a333eee549780f0";

export default node;
