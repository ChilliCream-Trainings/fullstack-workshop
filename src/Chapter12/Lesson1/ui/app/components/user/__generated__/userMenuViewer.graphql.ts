/**
 * @generated SignedSource<<d4aeb875295cb095e43e3d52b92d5c3c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userMenuViewer$data = {
  readonly user: {
    readonly userName: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "userMenuViewer";
};
export type userMenuViewer$key = {
  readonly " $data"?: userMenuViewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"userMenuViewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "userMenuViewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "userName",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "3c3a64225c36186cfac7f9b6bf08cc54";

export default node;
