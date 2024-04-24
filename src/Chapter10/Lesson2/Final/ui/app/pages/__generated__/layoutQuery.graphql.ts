/**
 * @generated SignedSource<<0171920427547f0fb906cac3fa1e2910>>
 * @relayHash 4f12c959a6e0e5c4aa62ac3e785dfbd7
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4f12c959a6e0e5c4aa62ac3e785dfbd7

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type layoutQuery$variables = Record<PropertyKey, never>;
export type layoutQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"authorizationProvider_viewer" | "headerBar_viewer">;
  };
};
export type layoutQuery = {
  response: layoutQuery$data;
  variables: layoutQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "layoutQuery",
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
            "name": "headerBar_viewer"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "authorizationProvider_viewer"
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
    "name": "layoutQuery",
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
            "concreteType": "ShoppingBasket",
            "kind": "LinkedField",
            "name": "basket",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ShoppingBasketItem",
                "kind": "LinkedField",
                "name": "items",
                "plural": true,
                "selections": [
                  (v0/*: any*/)
                ],
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "4f12c959a6e0e5c4aa62ac3e785dfbd7",
    "metadata": {},
    "name": "layoutQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "59b07b4219d513d97d711030655e485d";

export default node;
