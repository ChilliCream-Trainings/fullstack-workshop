/**
 * @generated SignedSource<<4e758b1b8c99b8464152778326b91038>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalogQuery$variables = Record<PropertyKey, never>;
export type catalogQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"catalogSearch_query" | "catalog_query">;
};
export type catalogQuery = {
  response: catalogQuery$data;
  variables: catalogQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "in",
    "value": null
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "catalogQuery",
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
    "name": "catalogQuery",
    "selections": [
      {
        "alias": null,
        "args": [
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
              (v1/*: any*/),
              (v2/*: any*/),
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "products(where:{\"brandId\":{\"in\":null},\"typeId\":{\"in\":null}})"
      },
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
            "selections": (v3/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      },
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
            "selections": (v3/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8054e3d4df580ab2e1ea1c5444ce8b8d",
    "id": null,
    "metadata": {},
    "name": "catalogQuery",
    "operationKind": "query",
    "text": "query catalogQuery {\n  ...catalog_query\n  ...catalogSearch_query\n}\n\nfragment catalogListItem_product on Product {\n  id\n  name\n  description\n  price\n  imageUrl\n}\n\nfragment catalogSearchBrands_query on Query {\n  brands {\n    nodes {\n      id\n      name\n    }\n  }\n}\n\nfragment catalogSearchProductTypes_query on Query {\n  productTypes {\n    nodes {\n      id\n      name\n    }\n  }\n}\n\nfragment catalogSearch_query on Query {\n  ...catalogSearchBrands_query\n  ...catalogSearchProductTypes_query\n}\n\nfragment catalog_query on Query {\n  products(where: {brandId: {}, typeId: {}}) {\n    nodes {\n      ...catalogListItem_product\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "787f5d0be3addf756ef3e995249d479a";

export default node;
