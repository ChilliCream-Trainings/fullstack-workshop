/**
 * @generated SignedSource<<a2ae6ce1e1d1509f773414fc7e323d9d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useUserInfo_viewer$data = {
  readonly username: string | null | undefined;
  readonly " $fragmentType": "useUserInfo_viewer";
};
export type useUserInfo_viewer$key = {
  readonly " $data"?: useUserInfo_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"useUserInfo_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUserInfo_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "356c961c3406b1515e19827821292812";

export default node;
