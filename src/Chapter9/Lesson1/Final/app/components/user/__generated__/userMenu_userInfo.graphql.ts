/**
 * @generated SignedSource<<0705152a58dac338341e4d01c5d4e5f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userMenu_userInfo$data = {
  readonly username: string | null | undefined;
  readonly " $fragmentType": "userMenu_userInfo";
};
export type userMenu_userInfo$key = {
  readonly " $data"?: userMenu_userInfo$data;
  readonly " $fragmentSpreads": FragmentRefs<"userMenu_userInfo">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "userMenu_userInfo",
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

(node as any).hash = "37d870a358125e4e5eaa50bd6bda97a0";

export default node;
