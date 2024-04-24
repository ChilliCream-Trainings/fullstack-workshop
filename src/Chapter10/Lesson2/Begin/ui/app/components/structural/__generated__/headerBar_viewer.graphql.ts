/**
 * @generated SignedSource<<42254ab6c2efab0ee4199c1e98b97aaf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type headerBar_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"cartMenu_viewer">;
  readonly " $fragmentType": "headerBar_viewer";
};
export type headerBar_viewer$key = {
  readonly " $data"?: headerBar_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"headerBar_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "headerBar_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "cartMenu_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "70856de6defb404f77d6729aefa6ca3b";

export default node;
