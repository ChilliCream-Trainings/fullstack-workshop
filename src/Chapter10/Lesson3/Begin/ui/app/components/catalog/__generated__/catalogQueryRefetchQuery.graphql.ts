/**
 * @generated SignedSource<<9b367faabf34669882128d25a053b6bd>>
 * @relayHash 9fc2be8eb83677c55ee9518930ef4162
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 9fc2be8eb83677c55ee9518930ef4162

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalogQueryRefetchQuery$variables = {
  after?: string | null | undefined;
  brandId?: ReadonlyArray<string> | null | undefined;
  first?: number | null | undefined;
  typeId?: ReadonlyArray<string> | null | undefined;
};
export type catalogQueryRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"catalog_products_query">;
};
export type catalogQueryRefetchQuery = {
  response: catalogQueryRefetchQuery$data;
  variables: catalogQueryRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "brandId"
  },
  {
    "defaultValue": 20,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "typeId"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/),
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "in",
            "variableName": "brandId"
          }
        ],
        "kind": "ObjectValue",
        "name": "brandId"
      },
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "in",
            "variableName": "typeId"
          }
        ],
        "kind": "ObjectValue",
        "name": "typeId"
      }
    ],
    "kind": "ObjectValue",
    "name": "where"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "catalogQueryRefetchQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/),
          {
            "kind": "Variable",
            "name": "brandId",
            "variableName": "brandId"
          },
          (v2/*: any*/),
          {
            "kind": "Variable",
            "name": "typeId",
            "variableName": "typeId"
          }
        ],
        "kind": "FragmentSpread",
        "name": "catalog_products_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "catalogQueryRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "ProductsConnection",
        "kind": "LinkedField",
        "name": "products",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ProductsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Product",
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
                    "name": "description",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "price",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "imageUrl",
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
        "args": (v3/*: any*/),
        "filters": [
          "where"
        ],
        "handle": "connection",
        "key": "catalog_query_products",
        "kind": "LinkedHandle",
        "name": "products"
      }
    ]
  },
  "params": {
    "id": "9fc2be8eb83677c55ee9518930ef4162",
    "metadata": {},
    "name": "catalogQueryRefetchQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "a2c9dc0b6e8eec8c114656d8b07ffb3c";

export default node;
