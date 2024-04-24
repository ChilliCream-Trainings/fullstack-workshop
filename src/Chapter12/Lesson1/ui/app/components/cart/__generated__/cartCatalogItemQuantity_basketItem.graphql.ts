/**
 * @generated SignedSource<<e7225af185201b03bbdfe58f3a4eb3c9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type cartCatalogItemQuantity_basketItem$data = {
  readonly id: string;
  readonly quantity: number;
  readonly " $fragmentType": "cartCatalogItemQuantity_basketItem";
};
export type cartCatalogItemQuantity_basketItem$key = {
  readonly " $data"?: cartCatalogItemQuantity_basketItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"cartCatalogItemQuantity_basketItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cartCatalogItemQuantity_basketItem",
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
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "BasketItem",
  "abstractKey": null
};

(node as any).hash = "a5b7e430eead2a053c87db95996bc401";

export default node;
