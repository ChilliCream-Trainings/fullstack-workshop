/**
 * @generated SignedSource<<6e16950572b85e243d4d45338fbd0e73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type homeQuery$variables = Record<PropertyKey, never>;
export type homeQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"catalogSearch_query" | "catalog_query">;
};
export type homeQuery = {
  response: homeQuery$data;
  variables: homeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "in",
    "value": null
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  },
  {
    "fields": [
      {
        "fields": (v0/*: any*/),
        "kind": "ObjectValue",
        "name": "brandId"
      },
      {
        "fields": (v0/*: any*/),
        "kind": "ObjectValue",
        "name": "typeId"
      }
    ],
    "kind": "ObjectValue",
    "name": "where"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v6 = {
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
},
v7 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
],
v8 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "homeQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "catalog_query"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "catalogSearch_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "homeQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                  (v2/*: any*/),
                  (v3/*: any*/),
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
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": "products(first:20,where:{\"brandId\":{\"in\":null},\"typeId\":{\"in\":null}})"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": [
          "where"
        ],
        "handle": "connection",
        "key": "catalog_query_products",
        "kind": "LinkedHandle",
        "name": "products"
      },
      {
        "alias": null,
        "args": (v7/*: any*/),
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
                "selections": (v8/*: any*/),
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": "brands(first:5)"
      },
      {
        "alias": null,
        "args": (v7/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "catalogSearchBrands_query_brands",
        "kind": "LinkedHandle",
        "name": "brands"
      },
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "ProductTypesConnection",
        "kind": "LinkedField",
        "name": "productTypes",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ProductTypesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ProductType",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": "productTypes(first:5)"
      },
      {
        "alias": null,
        "args": (v7/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "catalogSearchProductTypes_query_productTypes",
        "kind": "LinkedHandle",
        "name": "productTypes"
      }
    ]
  },
  "params": {
    "cacheID": "78a5305a7c32c7d5274994780d4fad40",
    "id": null,
    "metadata": {},
    "name": "homeQuery",
    "operationKind": "query",
    "text": "query homeQuery {\n  ...catalog_query\n  ...catalogSearch_query\n}\n\nfragment catalogListItem_product on Product {\n  id\n  name\n  description\n  price\n  imageUrl\n}\n\nfragment catalogSearchBrands_query on Query {\n  brands(first: 5) {\n    edges {\n      node {\n        id\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment catalogSearchProductTypes_query on Query {\n  productTypes(first: 5) {\n    edges {\n      node {\n        id\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment catalogSearch_query on Query {\n  ...catalogSearchBrands_query\n  ...catalogSearchProductTypes_query\n}\n\nfragment catalog_products_query on Query {\n  products(first: 20, where: {brandId: {}, typeId: {}}) {\n    edges {\n      node {\n        id\n        ...catalogListItem_product\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment catalog_query on Query {\n  ...catalog_products_query\n  ...catalogSearch_query\n}\n"
  }
};
})();

(node as any).hash = "e319d8bf3e3dd74f202d59f362615b78";

export default node;
