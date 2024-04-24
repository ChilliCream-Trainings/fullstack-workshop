/**
 * @generated SignedSource<<e0926755e819ffa88de839976520c47d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalog$data = {
  readonly " $fragmentSpreads": FragmentRefs<"catalogSearch" | "catalog_products">;
  readonly " $fragmentType": "catalog";
};
export type catalog$key = {
  readonly " $data"?: catalog$data;
  readonly " $fragmentSpreads": FragmentRefs<"catalog">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "catalog",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "catalog_products"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "catalogSearch"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "8c0e6f1f7e910edbc9bcbf3de470c54a";

export default node;
