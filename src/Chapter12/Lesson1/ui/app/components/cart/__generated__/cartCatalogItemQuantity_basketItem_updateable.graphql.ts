/**
 * @generated SignedSource<<cd3fe5024849d5193dcb94ca6bff3a54>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { UpdatableFragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type cartCatalogItemQuantity_basketItem_updateable$data = {
  quantity: number;
  readonly " $fragmentType": "cartCatalogItemQuantity_basketItem_updateable";
};
export type cartCatalogItemQuantity_basketItem_updateable$key = {
  readonly " $data"?: cartCatalogItemQuantity_basketItem_updateable$data;
  readonly $updatableFragmentSpreads: FragmentRefs<"cartCatalogItemQuantity_basketItem_updateable">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cartCatalogItemQuantity_basketItem_updateable",
  "selections": [
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

(node as any).hash = "fcc1fab0e577b9976de9c350e2c35569";

export default node;
