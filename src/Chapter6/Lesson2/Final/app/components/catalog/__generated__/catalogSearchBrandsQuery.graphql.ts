/**
 * @generated SignedSource<<59133bba7743cca4fd8bdd281aa3fb23>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type catalogSearchBrandsQuery$variables = Record<PropertyKey, never>;
export type catalogSearchBrandsQuery$data = {
  readonly brands: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    }> | null | undefined;
  } | null | undefined;
};
export type catalogSearchBrandsQuery = {
  response: catalogSearchBrandsQuery$data;
  variables: catalogSearchBrandsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "BrandsConnection",
    "kind": "LinkedField",
    "name": "brands",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Brand",
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
    "name": "catalogSearchBrandsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "catalogSearchBrandsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "76b3d05c56e1e0434a844a33f2492ca7",
    "id": null,
    "metadata": {},
    "name": "catalogSearchBrandsQuery",
    "operationKind": "query",
    "text": "query catalogSearchBrandsQuery {\n  brands {\n    nodes {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "259afd9b3f0882a4989a11f98ec5ec45";

export default node;
