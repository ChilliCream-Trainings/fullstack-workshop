/**
 * @generated SignedSource<<56d4d5cda91173d42fa8639c828f179a>>
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
    readonly id: string;
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

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "productAmountInBasket_basket",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "BasketItem",
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        (v0/*: any*/),
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
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Basket",
  "abstractKey": null
};
})();

(node as any).hash = "6b47fd30d5c9e407ffb5d0b897c0e58e";

export default node;
