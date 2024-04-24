/**
 * @generated SignedSource<<9904591de68f681df05dd9186530064f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type cartMenuViewer$data = {
  readonly basket: {
    readonly items: ReadonlyArray<{
      readonly id: string;
    }>;
  } | null | undefined;
  readonly " $fragmentType": "cartMenuViewer";
};
export type cartMenuViewer$key = {
  readonly " $data"?: cartMenuViewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"cartMenuViewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cartMenuViewer",
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

(node as any).hash = "d37d26b30e65a8bb061e07f436ce0419";

export default node;
