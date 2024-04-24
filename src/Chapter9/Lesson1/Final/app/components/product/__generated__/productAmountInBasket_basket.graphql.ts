/**
 * @generated SignedSource<<e3d40c89466881d7506859750ddcda2b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type productAmountInBasket_basket$data = {
  readonly items: ReadonlyArray<{
    readonly product: {
      readonly id: string;
    };
    readonly quantity: number;
  }>;
  readonly " $fragmentType": "productAmountInBasket_basket";
};
export type productAmountInBasket_basket$key = {
  readonly " $data"?: productAmountInBasket_basket$data;
  readonly " $fragmentSpreads": FragmentRefs<"productAmountInBasket_basket">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "productAmountInBasket_basket",
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
      "storageKey": null
    }
  ],
  "type": "ShoppingBasket",
  "abstractKey": null
};

(node as any).hash = "e88ec5c353af4899d6d81b4858b6d3df";

export default node;
