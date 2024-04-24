/**
 * @generated SignedSource<<d4e1fab552569c573140e4422ce1afff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type addToBasketButtonMutation$variables = {
  productId: string;
  quantity: number;
};
export type addToBasketButtonMutation$data = {
  readonly addToBasket: {
    readonly errors: ReadonlyArray<{
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly kind: "%other";
    } | {
      readonly kind: "QuantityCannotBeNegativeError";
      readonly quantity: number;
    }> | null | undefined;
    readonly shoppingBasket: {
      readonly id: string;
      readonly items: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"cartCatalogItemQuantity_shoppingBasketItem" | "cartItemsCatalogItemInfo_shoppingBasketItem" | "cartItemsCatalogItemTotal_shoppingBasketItem">;
      }>;
    } | null | undefined;
  };
};
export type addToBasketButtonMutation = {
  response: addToBasketButtonMutation$data;
  variables: addToBasketButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "productId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "quantity"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "productId",
        "variableName": "productId"
      },
      {
        "kind": "Variable",
        "name": "quantity",
        "variableName": "quantity"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
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
  "alias": "kind",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "quantity",
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    (v4/*: any*/)
  ],
  "type": "QuantityCannotBeNegativeError",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "addToBasketButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddToBasketPayload",
        "kind": "LinkedField",
        "name": "addToBasket",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ShoppingBasket",
            "kind": "LinkedField",
            "name": "shoppingBasket",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ShoppingBasketItem",
                "kind": "LinkedField",
                "name": "items",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "cartCatalogItemQuantity_shoppingBasketItem"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "cartItemsCatalogItemTotal_shoppingBasketItem"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "cartItemsCatalogItemInfo_shoppingBasketItem"
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
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "addToBasketButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddToBasketPayload",
        "kind": "LinkedField",
        "name": "addToBasket",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ShoppingBasket",
            "kind": "LinkedField",
            "name": "shoppingBasket",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ShoppingBasketItem",
                "kind": "LinkedField",
                "name": "items",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
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
                        "name": "price",
                        "storageKey": null
                      },
                      (v2/*: any*/),
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
                        "name": "name",
                        "storageKey": null
                      }
                    ],
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
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v3/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "615da631a716f74aaf1d14721fea917e",
    "id": null,
    "metadata": {},
    "name": "addToBasketButtonMutation",
    "operationKind": "mutation",
    "text": "mutation addToBasketButtonMutation(\n  $productId: ID!\n  $quantity: Int!\n) {\n  addToBasket(input: {productId: $productId, quantity: $quantity}) {\n    shoppingBasket {\n      id\n      items {\n        id\n        ...cartCatalogItemQuantity_shoppingBasketItem\n        ...cartItemsCatalogItemTotal_shoppingBasketItem\n        ...cartItemsCatalogItemInfo_shoppingBasketItem\n      }\n    }\n    errors {\n      __typename\n      kind: __typename\n      ... on QuantityCannotBeNegativeError {\n        quantity\n      }\n    }\n  }\n}\n\nfragment cartCatalogItemQuantity_shoppingBasketItem on ShoppingBasketItem {\n  quantity\n  id\n}\n\nfragment cartItemsCatalogItemInfo_shoppingBasketItem on ShoppingBasketItem {\n  product {\n    imageUrl\n    name\n    price\n    id\n  }\n}\n\nfragment cartItemsCatalogItemTotal_shoppingBasketItem on ShoppingBasketItem {\n  product {\n    price\n    id\n  }\n  quantity\n}\n"
  }
};
})();

(node as any).hash = "4771b1b779f7af5e4d9869c8ca406e30";

export default node;
