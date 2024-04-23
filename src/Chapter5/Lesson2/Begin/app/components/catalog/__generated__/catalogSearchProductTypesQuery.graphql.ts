/**
 * @generated SignedSource<<f536f3f757eb1a4488f93978210e16a0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type catalogSearchProductTypesQuery$variables = Record<PropertyKey, never>;
export type catalogSearchProductTypesQuery$data = {
  readonly productTypes: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    }> | null | undefined;
  } | null | undefined;
};
export type catalogSearchProductTypesQuery = {
  response: catalogSearchProductTypesQuery$data;
  variables: catalogSearchProductTypesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ProductTypesConnection",
    "kind": "LinkedField",
    "name": "productTypes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ProductType",
        "kind": "LinkedField",
        "name": "nodes",
        "plural": true,
        "selections": [
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
            "name": "name",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "catalogSearchProductTypesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "catalogSearchProductTypesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "eda72dbd4600b81a545e5ef4fca96188",
    "id": null,
    "metadata": {},
    "name": "catalogSearchProductTypesQuery",
    "operationKind": "query",
    "text": "query catalogSearchProductTypesQuery {\n  productTypes {\n    nodes {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cc3beac69ca4aeab7c8378ae764210d1";

export default node;
