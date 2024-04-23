/**
 * @generated SignedSource<<2806566175527fab526453f1c359c23c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalogSearch_query$data = {
  readonly " $fragmentSpreads": FragmentRefs<"catalogSearchBrands_query" | "catalogSearchProductTypes_query">;
  readonly " $fragmentType": "catalogSearch_query";
};
export type catalogSearch_query$key = {
  readonly " $data"?: catalogSearch_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"catalogSearch_query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "catalogSearch_query",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "catalogSearchBrands_query"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "catalogSearchProductTypes_query"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "1da820618208a91a51eee8d55629202b";

export default node;
