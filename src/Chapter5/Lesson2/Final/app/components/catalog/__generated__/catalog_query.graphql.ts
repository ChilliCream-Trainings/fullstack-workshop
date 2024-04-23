/**
 * @generated SignedSource<<b23db4a168b0e6a3f3cf17d94cfc6759>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalog_query$data = {
  readonly products: {
    readonly nodes: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"catalogListItem_product">;
    }> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "catalog_query";
};
export type catalog_query$key = {
  readonly " $data"?: catalog_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"catalog_query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "catalog_query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ProductsConnection",
      "kind": "LinkedField",
      "name": "products",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Product",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "catalogListItem_product"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "7d1c43fb733aa7b300d2e9246dc382a8";

export default node;
