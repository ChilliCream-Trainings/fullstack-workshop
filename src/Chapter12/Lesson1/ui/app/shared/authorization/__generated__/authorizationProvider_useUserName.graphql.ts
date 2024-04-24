/**
 * @generated SignedSource<<2bc6200dffc1319d3830ef718219babc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type authorizationProvider_useUserName$data = {
  readonly user: {
    readonly email: string | null | undefined;
    readonly id: string;
    readonly lastName: string;
    readonly name: string;
    readonly userName: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "authorizationProvider_useUserName";
};
export type authorizationProvider_useUserName$key = {
  readonly " $data"?: authorizationProvider_useUserName$data;
  readonly " $fragmentSpreads": FragmentRefs<"authorizationProvider_useUserName">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "authorizationProvider_useUserName",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "email",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastName",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "76747eadfcf5d65469399fb2d26a00c1";

export default node;
