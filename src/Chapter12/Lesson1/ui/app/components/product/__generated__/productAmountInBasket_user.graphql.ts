/**
 * @generated SignedSource<<1b32700de4f72d7107a85fff5bdebf3d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type productAmountInBasket_user$data = {
  readonly items: ReadonlyArray<{
    readonly id: string;
    readonly quantity: number;
  }>;
  readonly " $fragmentType": "productAmountInBasket_user";
};
export type productAmountInBasket_user$key = {
  readonly " $data"?: productAmountInBasket_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"productAmountInBasket_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "productAmountInBasket_user",
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
          "name": "id",
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
  "type": "Basket",
  "abstractKey": null
};

(node as any).hash = "17f9475c931d42b0b1272127972c3f31";

export default node;
