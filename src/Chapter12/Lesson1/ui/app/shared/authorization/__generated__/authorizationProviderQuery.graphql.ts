/**
 * @generated SignedSource<<9fb228c7125af783d3e84876461a22fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type authorizationProviderQuery$variables = Record<PropertyKey, never>;
export type authorizationProviderQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"authorizationProvider_useSessionId" | "authorizationProvider_useUserName">;
  };
};
export type authorizationProviderQuery = {
  response: authorizationProviderQuery$data;
  variables: authorizationProviderQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "authorizationProviderQuery",
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
            "name": "authorizationProvider_useSessionId"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "authorizationProvider_useUserName"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "authorizationProviderQuery",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sessionId",
            "storageKey": null
          },
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f30ec06468dadc64112309554fd8e45e",
    "id": null,
    "metadata": {},
    "name": "authorizationProviderQuery",
    "operationKind": "query",
    "text": "query authorizationProviderQuery {\n  viewer {\n    ...authorizationProvider_useSessionId\n    ...authorizationProvider_useUserName\n  }\n}\n\nfragment authorizationProvider_useSessionId on Viewer {\n  sessionId\n}\n\nfragment authorizationProvider_useUserName on Viewer {\n  user {\n    userName\n    id\n    email\n    name\n    lastName\n  }\n}\n"
  }
};

(node as any).hash = "ce6f196d083426e2a50a94a0fea3ff52";

export default node;
