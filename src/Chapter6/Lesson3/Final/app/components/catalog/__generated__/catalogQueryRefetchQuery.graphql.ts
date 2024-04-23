/**
 * @generated SignedSource<<0398b6591e323351638c9a94a72b9e6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalogQueryRefetchQuery$variables = {
  after?: string | null | undefined;
  brandId?: ReadonlyArray<string> | null | undefined;
  first?: number | null | undefined;
  typeId?: ReadonlyArray<string> | null | undefined;
};
export type catalogQueryRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"catalog_query">;
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
        "name": "catalog_query"
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
    "cacheID": "563b8118ece228a72e61e30a950d2ff9",
    "id": null,
    "metadata": {},
    "name": "catalogQueryRefetchQuery",
    "operationKind": "query",
    "text": "query catalogQueryRefetchQuery(\n  $after: String = null\n  $brandId: [ID!] = null\n  $first: Int = 20\n  $typeId: [ID!] = null\n) {\n  ...catalog_query_2FQR1N\n}\n\nfragment catalogListItem_product on Product {\n  id\n  name\n  description\n  price\n  imageUrl\n}\n\nfragment catalog_query_2FQR1N on Query {\n  products(first: $first, after: $after, where: {brandId: {in: $brandId}, typeId: {in: $typeId}}) {\n    edges {\n      node {\n        id\n        ...catalogListItem_product\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "59c7b2eba4409849be4546e1b06d3d46";

export default node;
