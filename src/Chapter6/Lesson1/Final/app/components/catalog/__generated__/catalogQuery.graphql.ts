/**
 * @generated SignedSource<<50ebcfbf11340e57c01389b3d1f0c9f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalogQuery$variables = {
  brandId?: ReadonlyArray<string> | null | undefined;
  typeId?: ReadonlyArray<string> | null | undefined;
};
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "brandId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "typeId"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "catalogQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "brandId",
            "variableName": "brandId"
          },
          {
            "kind": "Variable",
            "name": "typeId",
            "variableName": "typeId"
          }
        ],
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "catalogQuery",
    "selections": [
      {
        "alias": null,
        "args": [
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
        "storageKey": null
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
    "cacheID": "ff360bce10d3949c821624a08283be7e",
    "id": null,
    "metadata": {},
    "name": "catalogQuery",
    "operationKind": "query",
    "text": "query catalogQuery(\n  $brandId: [ID!]\n  $typeId: [ID!]\n) {\n  ...catalog_query_1u9j7c\n  ...catalogSearch_query\n}\n\nfragment catalogListItem_product on Product {\n  id\n  name\n  description\n  price\n  imageUrl\n}\n\nfragment catalogSearchBrands_query on Query {\n  brands {\n    nodes {\n      id\n      name\n    }\n  }\n}\n\nfragment catalogSearchProductTypes_query on Query {\n  productTypes {\n    nodes {\n      id\n      name\n    }\n  }\n}\n\nfragment catalogSearch_query on Query {\n  ...catalogSearchBrands_query\n  ...catalogSearchProductTypes_query\n}\n\nfragment catalog_query_1u9j7c on Query {\n  products(where: {brandId: {in: $brandId}, typeId: {in: $typeId}}) {\n    nodes {\n      ...catalogListItem_product\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "83b80b73dce3acabbb3ab967ea766eee";

export default node;
