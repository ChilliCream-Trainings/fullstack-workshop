/**
 * @generated SignedSource<<5b85af14744a8191628e9c57ab64c8bf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useCheckout_viewer$data = {
  readonly basket: {
    readonly items: ReadonlyArray<{
      readonly product: {
        readonly id: string;
        readonly price: any;
      };
      readonly quantity: number;
    }>;
  } | null | undefined;
  readonly " $fragmentType": "useCheckout_viewer";
};
export type useCheckout_viewer$key = {
  readonly " $data"?: useCheckout_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"useCheckout_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useCheckout_viewer",
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
                  "name": "id",
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

(node as any).hash = "6979462bf898fbe2b7f407d561cf86fa";

export default node;
