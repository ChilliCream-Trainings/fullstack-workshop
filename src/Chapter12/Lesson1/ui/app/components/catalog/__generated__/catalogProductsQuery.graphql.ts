/**
 * @generated SignedSource<<3b97eb40078816ead29844e0ea0f8933>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProductsFilterInputTypeInput = {
  brandId?: ProductsBrandIdFilterInputTypeInput | null | undefined;
  name?: ProductsNameFilterInputTypeInput | null | undefined;
  typeId?: ProductsTypeIdFilterInputTypeInput | null | undefined;
};
export type ProductsBrandIdFilterInputTypeInput = {
  in?: ReadonlyArray<string> | null | undefined;
};
export type ProductsNameFilterInputTypeInput = {
  in?: ReadonlyArray<string> | null | undefined;
};
export type ProductsTypeIdFilterInputTypeInput = {
  in?: ReadonlyArray<string> | null | undefined;
};
export type catalogProductsQuery$variables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
  where?: ProductsFilterInputTypeInput | null | undefined;
};
export type catalogProductsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"catalog_products">;
};
export type catalogProductsQuery = {
  response: catalogProductsQuery$data;
  variables: catalogProductsQuery$variables;
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "where"
  }
],
v1 = {
  "kind": "Variable",
  "name": "where",
  "variableName": "where"
},
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "catalogProductsQuery",
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
          },
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "catalog_products"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "catalogProductsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
        "args": (v2/*: any*/),
        "filters": [
          "where"
        ],
        "handle": "connection",
        "key": "catalog_products",
        "kind": "LinkedHandle",
        "name": "products"
      }
    ]
  },
  "params": {
    "cacheID": "2e0274936aa8c7d718e611514c91a3e4",
    "id": null,
    "metadata": {},
    "name": "catalogProductsQuery",
    "operationKind": "query",
    "text": "query catalogProductsQuery(\n  $count: Int = 10\n  $cursor: String\n  $where: ProductsFilterInputTypeInput = null\n) {\n  ...catalog_products_mjR8k\n}\n\nfragment catalogListItem on Product {\n  id\n  name\n  price\n  imageUrl\n}\n\nfragment catalog_products_mjR8k on Query {\n  products(first: $count, after: $cursor, where: $where) {\n    edges {\n      node {\n        id\n        ...catalogListItem\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1c8445a4fdaa291c940f09153b94d908";

export default node;
