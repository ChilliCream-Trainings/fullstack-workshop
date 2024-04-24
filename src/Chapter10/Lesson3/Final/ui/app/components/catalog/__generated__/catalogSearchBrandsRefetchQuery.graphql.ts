/**
 * @generated SignedSource<<5e02b2408229b8898c2078fa5fddf8f4>>
 * @relayHash ffaaa1bcb762cc422be6204a689503ac
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ffaaa1bcb762cc422be6204a689503ac

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalogSearchBrandsRefetchQuery$variables = {
  after?: string | null | undefined;
  first?: number | null | undefined;
};
export type catalogSearchBrandsRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"catalogSearchBrands_query">;
};
export type catalogSearchBrandsRefetchQuery = {
  response: catalogSearchBrandsRefetchQuery$data;
  variables: catalogSearchBrandsRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 5,
    "kind": "LocalArgument",
    "name": "first"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "catalogSearchBrandsRefetchQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "catalogSearchBrands_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "catalogSearchBrandsRefetchQuery",
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
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
        "key": "catalogSearchBrands_query_brands",
        "kind": "LinkedHandle",
        "name": "brands"
      }
    ]
  },
  "params": {
    "id": "ffaaa1bcb762cc422be6204a689503ac",
    "metadata": {},
    "name": "catalogSearchBrandsRefetchQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "836d5e34cabdbeb495bb3d57f64943ce";

export default node;
