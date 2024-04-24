/**
 * @generated SignedSource<<a407f55cef4e82527b25adf93e66580c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalogSearchBrandsQuery$variables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
};
export type catalogSearchBrandsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"catalogSearch_Brands">;
};
export type catalogSearchBrandsQuery = {
  response: catalogSearchBrandsQuery$data;
  variables: catalogSearchBrandsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 10,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "catalogSearchBrandsQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count"
          },
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          }
        ],
        "kind": "FragmentSpread",
        "name": "catalogSearch_Brands"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "catalogSearchBrandsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BrandsConnection",
        "kind": "LinkedField",
        "name": "brands",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "BrandsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Brand",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
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
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "catalogSearch_brands",
        "kind": "LinkedHandle",
        "name": "brands"
      }
    ]
  },
  "params": {
    "cacheID": "e2b05bcb20b6ddbd4026710179891479",
    "id": null,
    "metadata": {},
    "name": "catalogSearchBrandsQuery",
    "operationKind": "query",
    "text": "query catalogSearchBrandsQuery(\n  $count: Int = 10\n  $cursor: String\n) {\n  ...catalogSearch_Brands_1G22uz\n}\n\nfragment catalogSearch_Brands_1G22uz on Query {\n  brands(first: $count, after: $cursor) {\n    edges {\n      cursor\n      node {\n        id\n        name\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f4846a45aab33b3d4ae44921eb1ae11b";

export default node;
