/**
 * @generated SignedSource<<721f342ab804419d5e5846c156a75122>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type cartCatalogItemQuantity$data = {
  readonly id: string;
  readonly quantity: number;
  readonly " $fragmentType": "cartCatalogItemQuantity";
};
export type cartCatalogItemQuantity$key = {
  readonly " $data"?: cartCatalogItemQuantity$data;
  readonly " $fragmentSpreads": FragmentRefs<"cartCatalogItemQuantity">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cartCatalogItemQuantity",
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

(node as any).hash = "346bbc46ce3ab2fca27f7eff68fc0937";

export default node;
