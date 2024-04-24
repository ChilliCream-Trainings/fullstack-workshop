/**
 * @generated SignedSource<<d17779238004d31c91ad8b80716404d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalogSearch$data = {
  readonly " $fragmentSpreads": FragmentRefs<"catalogSearch_Brands" | "catalogSearch_ProductTypes">;
  readonly " $fragmentType": "catalogSearch";
};
export type catalogSearch$key = {
  readonly " $data"?: catalogSearch$data;
  readonly " $fragmentSpreads": FragmentRefs<"catalogSearch">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "catalogSearch",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "catalogSearch_Brands"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "catalogSearch_ProductTypes"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "0d0d3b7b1f877ea5c8b365821a9da2bd";

export default node;
