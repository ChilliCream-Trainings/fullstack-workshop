/**
 * @generated SignedSource<<d5d316ffa7390ad5d2223fe60f572cea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type catalogQuery$variables = Record<PropertyKey, never>;
export type catalogQuery$data = {
  readonly products: {
    readonly nodes: ReadonlyArray<{
      readonly description: string | null | undefined;
      readonly id: string;
      readonly name: string;
      readonly price: any;
    }> | null | undefined;
  } | null | undefined;
};
export type catalogQuery = {
  response: catalogQuery$data;
  variables: catalogQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ProductsConnection",
    "kind": "LinkedField",
    "name": "products",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Product",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "price",
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
    "name": "catalogQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "catalogQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "3ebc658c6d993258ee43f820292fdb9a",
    "id": null,
    "metadata": {},
    "name": "catalogQuery",
    "operationKind": "query",
    "text": "query catalogQuery {\n  products {\n    nodes {\n      id\n      name\n      description\n      price\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "604d6d1e00dda6defbdf3739c0fcf7c5";

export default node;
