/**
 * @generated SignedSource<<22a9bbd00e278bbc189552b9f3022bb8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type checkoutForm$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"useCheckout_viewer">;
  };
  readonly " $fragmentType": "checkoutForm";
};
export type checkoutForm$key = {
  readonly " $data"?: checkoutForm$data;
  readonly " $fragmentSpreads": FragmentRefs<"checkoutForm">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "checkoutForm",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Viewer",
      "kind": "LinkedField",
      "name": "viewer",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useCheckout_viewer"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "5dd505df8c1fd1963b8caf69253dc524";

export default node;
