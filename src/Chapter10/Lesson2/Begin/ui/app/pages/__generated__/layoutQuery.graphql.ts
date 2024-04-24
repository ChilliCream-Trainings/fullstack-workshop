/**
 * @generated SignedSource<<a617da11c2462c2303fc2d21387b9d5f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "cacheID": "4f12c959a6e0e5c4aa62ac3e785dfbd7",
    "id": null,
    "metadata": {},
    "name": "layoutQuery",
    "operationKind": "query",
    "text": "query layoutQuery {\n  viewer {\n    ...headerBar_viewer\n    ...authorizationProvider_viewer\n  }\n}\n\nfragment authorizationProvider_viewer on Viewer {\n  ...useUserInfo_viewer\n}\n\nfragment cartMenu_viewer on Viewer {\n  basket {\n    items {\n      id\n    }\n    id\n  }\n}\n\nfragment headerBar_viewer on Viewer {\n  ...cartMenu_viewer\n}\n\nfragment useUserInfo_viewer on Viewer {\n  username\n}\n"
  }
};
})();

(node as any).hash = "59b07b4219d513d97d711030655e485d";

export default node;
