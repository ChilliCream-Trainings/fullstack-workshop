/**
 * @generated SignedSource<<910f22ac98e535b447dedc95ad43b88d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type headerBarQuery$variables = Record<PropertyKey, never>;
export type headerBarQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"cartMenuViewer">;
  };
};
export type headerBarQuery = {
  response: headerBarQuery$data;
  variables: headerBarQuery$variables;
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
    "name": "headerBarQuery",
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
            "name": "cartMenuViewer"
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
    "name": "headerBarQuery",
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
            "concreteType": "Basket",
            "kind": "LinkedField",
            "name": "basket",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "BasketItem",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "422def91d3dde2c4ae0fbfcdd54ebb3e",
    "id": null,
    "metadata": {},
    "name": "headerBarQuery",
    "operationKind": "query",
    "text": "query headerBarQuery {\n  viewer {\n    ...cartMenuViewer\n  }\n}\n\nfragment cartMenuViewer on Viewer {\n  basket {\n    items {\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "33b5b96990e85e09eea1d19d2bcf9409";

export default node;
