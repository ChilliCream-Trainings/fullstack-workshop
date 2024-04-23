/**
 * @generated SignedSource<<ff852b0ae57ab9c12b0e21aa54445fcd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalogQueryRefetchQuery$variables = {
  brandId?: ReadonlyArray<string> | null | undefined;
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
    "name": "brandId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "typeId"
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "915d46830c4109147b3e7ac526ae952e",
    "id": null,
    "metadata": {},
    "name": "catalogQueryRefetchQuery",
    "operationKind": "query",
    "text": "query catalogQueryRefetchQuery(\n  $brandId: [ID!] = null\n  $typeId: [ID!] = null\n) {\n  ...catalog_query_1u9j7c\n}\n\nfragment catalogListItem_product on Product {\n  id\n  name\n  description\n  price\n  imageUrl\n}\n\nfragment catalog_query_1u9j7c on Query {\n  products(where: {brandId: {in: $brandId}, typeId: {in: $typeId}}) {\n    nodes {\n      ...catalogListItem_product\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3e31c387ac4ead78ee9f33f5b21bcef4";

export default node;
