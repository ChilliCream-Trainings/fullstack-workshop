/**
 * @generated SignedSource<<923aa267bcca5e9f7dd514285ed548af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalog_query$data = {
  readonly " $fragmentSpreads": FragmentRefs<"catalogSearch_query" | "catalog_products_query">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "catalog_products_query"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "catalogSearch_query"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "34888a2fde5b62bd0955ff09754ee9fd";

export default node;
