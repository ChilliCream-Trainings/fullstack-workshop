/**
 * @generated SignedSource<<b0ea625e9f35c6181d9f59e976030d1f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type checkoutButton_viewer$data = {
  readonly basket: {
    readonly items: ReadonlyArray<{
      readonly product: {
        readonly name: string;
        readonly price: any;
      };
      readonly quantity: number;
    }>;
  } | null | undefined;
  readonly " $fragmentType": "checkoutButton_viewer";
};
export type checkoutButton_viewer$key = {
  readonly " $data"?: checkoutButton_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"checkoutButton_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "checkoutButton_viewer",
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

(node as any).hash = "8eb455eee3a3aca066ab3df806308a25";

export default node;
