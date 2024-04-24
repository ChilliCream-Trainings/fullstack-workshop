/**
 * @generated SignedSource<<3babbf22bd1a3eec83c006519f1b1640>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { UpdatableFragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type cartCatalogItemQuantity_shoppingBasketItem_updateable$data = {
  quantity: number;
  readonly " $fragmentType": "cartCatalogItemQuantity_shoppingBasketItem_updateable";
};
export type cartCatalogItemQuantity_shoppingBasketItem_updateable$key = {
  readonly " $data"?: cartCatalogItemQuantity_shoppingBasketItem_updateable$data;
  readonly $updatableFragmentSpreads: FragmentRefs<"cartCatalogItemQuantity_shoppingBasketItem_updateable">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cartCatalogItemQuantity_shoppingBasketItem_updateable",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "quantity",
      "storageKey": null
    }
  ],
  "type": "ShoppingBasketItem",
  "abstractKey": null
};

(node as any).hash = "394f429ba31a963c18ce8712f90a4b6e";

export default node;
