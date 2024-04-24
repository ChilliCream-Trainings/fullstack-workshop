/**
 * @generated SignedSource<<cf0d08443e7fc48b74671f67e7c9cd35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type cartQuery$variables = Record<PropertyKey, never>;
export type cartQuery$data = {
  readonly viewer: {
    readonly basket: {
      readonly items: ReadonlyArray<{
        readonly id: string;
      }>;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"cartItems_viewer" | "cartSummary_viewer">;
  };
};
export type cartQuery = {
  response: cartQuery$data;
  variables: cartQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "cartQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Basket",
            "kind": "LinkedField",
            "name": "basket",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "BasketItem",
                "kind": "LinkedField",
                "name": "items",
                "plural": true,
                "selections": [
                  (v0/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "cartSummary_viewer"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "cartItems_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "cartQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Basket",
            "kind": "LinkedField",
            "name": "basket",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "BasketItem",
                "kind": "LinkedField",
                "name": "items",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "quantity",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Product",
                    "kind": "LinkedField",
                    "name": "product",
                    "plural": false,
                    "selections": [
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
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "imageUrl",
                        "storageKey": null
                      }
                    ],
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
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7a0278b13d657969315d9cfe8d09acde",
    "id": null,
    "metadata": {},
    "name": "cartQuery",
    "operationKind": "query",
    "text": "query cartQuery {\n  viewer {\n    basket {\n      items {\n        id\n      }\n      id\n    }\n    ...cartSummary_viewer\n    ...cartItems_viewer\n  }\n}\n\nfragment cartCatalogItemQuantity_basketItem on BasketItem {\n  quantity\n  id\n}\n\nfragment cartItemsCatalogItemInfo_basketItem on BasketItem {\n  product {\n    imageUrl\n    name\n    price\n    id\n  }\n}\n\nfragment cartItemsCatalogItemTotal_basketItem on BasketItem {\n  product {\n    price\n    id\n  }\n  quantity\n}\n\nfragment cartItems_viewer on Viewer {\n  basket {\n    items {\n      id\n      ...cartCatalogItemQuantity_basketItem\n      __typename\n      ...cartItemsCatalogItemTotal_basketItem\n      ...cartItemsCatalogItemInfo_basketItem\n    }\n    id\n  }\n}\n\nfragment cartSummary_viewer on Viewer {\n  basket {\n    items {\n      quantity\n      product {\n        name\n        price\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "0b96ffcd70545b585b4bd6b1fe80a7e9";

export default node;
