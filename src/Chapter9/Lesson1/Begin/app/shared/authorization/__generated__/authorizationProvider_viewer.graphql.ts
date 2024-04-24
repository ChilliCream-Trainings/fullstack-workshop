/**
 * @generated SignedSource<<50e288d5899ede5e04310c57c837f27c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type authorizationProvider_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useUserInfo_viewer">;
  readonly " $fragmentType": "authorizationProvider_viewer";
};
export type authorizationProvider_viewer$key = {
  readonly " $data"?: authorizationProvider_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"authorizationProvider_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "authorizationProvider_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useUserInfo_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "76b288a8cb68c5c1f775411468f8202c";

export default node;
