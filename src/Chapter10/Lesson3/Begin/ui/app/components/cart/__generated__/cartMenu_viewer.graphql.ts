/**
 * @generated SignedSource<<ac86a8fe5a00083d655154299cda5762>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type cartMenu_viewer$data = {
  readonly basket: {
    readonly items: ReadonlyArray<{
      readonly id: string;
    }>;
  } | null | undefined;
  readonly " $fragmentType": "cartMenu_viewer";
};
export type cartMenu_viewer$key = {
  readonly " $data"?: cartMenu_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"cartMenu_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cartMenu_viewer",
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
              "name": "id",
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

(node as any).hash = "c5b0e5c06e7bd31686012e1dd45b4d94";

export default node;
