/**
 * @generated SignedSource<<1eba62b4a88f8c4f7e9fb6cce1cb6ec0>>
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
    readonly " $fragmentSpreads": FragmentRefs<"cartItems_viewer" | "cartSummary_viewer">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"relatedProducts_query">;
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
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageUrl",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 4
  }
];
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "cartItems_viewer"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "cartSummary_viewer"
          }
        ],
        "storageKey": null
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "relatedProducts_query"
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
            "concreteType": "ShoppingBasket",
            "kind": "LinkedField",
            "name": "basket",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ShoppingBasketItem",
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
                      (v1/*: any*/),
                      (v0/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/)
                    ],
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
      },
      {
        "alias": "relatedProducts",
        "args": (v4/*: any*/),
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
                  (v0/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  (v2/*: any*/),
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
        "storageKey": "products(first:4)"
      },
      {
        "alias": "relatedProducts",
        "args": (v4/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "relatedProducts_relatedProducts",
        "kind": "LinkedHandle",
        "name": "products"
      }
    ]
  },
  "params": {
    "cacheID": "21af513d4ba8f866d2e7579c47b1b1f2",
    "id": null,
    "metadata": {},
    "name": "cartQuery",
    "operationKind": "query",
    "text": "query cartQuery {\n  viewer {\n    ...cartItems_viewer\n    ...cartSummary_viewer\n  }\n  ...relatedProducts_query\n}\n\nfragment cartCatalogItemQuantity_shoppingBasketItem on ShoppingBasketItem {\n  quantity\n  id\n}\n\nfragment cartItemsCatalogItemInfo_shoppingBasketItem on ShoppingBasketItem {\n  product {\n    imageUrl\n    name\n    price\n    id\n  }\n}\n\nfragment cartItemsCatalogItemTotal_shoppingBasketItem on ShoppingBasketItem {\n  product {\n    price\n    id\n  }\n  quantity\n}\n\nfragment cartItems_viewer on Viewer {\n  basket {\n    items {\n      id\n      ...cartCatalogItemQuantity_shoppingBasketItem\n      ...cartItemsCatalogItemTotal_shoppingBasketItem\n      ...cartItemsCatalogItemInfo_shoppingBasketItem\n    }\n    id\n  }\n}\n\nfragment cartSummary_viewer on Viewer {\n  basket {\n    items {\n      quantity\n      product {\n        name\n        price\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment relatedProductListItem_product on Product {\n  id\n  name\n  description\n  price\n  imageUrl\n}\n\nfragment relatedProducts_query on Query {\n  viewer {\n    basket {\n      items {\n        id\n        product {\n          id\n        }\n      }\n      id\n    }\n  }\n  relatedProducts: products(first: 4) {\n    edges {\n      node {\n        id\n        ...relatedProductListItem_product\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3347eb10dd7da777ee857ecf5782d65c";

export default node;
