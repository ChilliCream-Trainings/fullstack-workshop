/**
 * @generated SignedSource<<9df3c2ced41a70d0c3cd1ed50b383bfd>>
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
};
export type addToBasketButtonMutation$data = {
  readonly addToBasket: {
    readonly basket: {
      readonly " $fragmentSpreads": FragmentRefs<"productAmountInBasket_basket">;
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
        "kind": "Literal",
        "name": "quantity",
        "value": 1
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
            "concreteType": "Basket",
            "kind": "LinkedField",
            "name": "basket",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "productAmountInBasket_basket"
              }
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
                  (v2/*: any*/),
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
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "38292b1b0fbcc560a99fd3da0e104bec",
    "id": null,
    "metadata": {},
    "name": "addToBasketButtonMutation",
    "operationKind": "mutation",
    "text": "mutation addToBasketButtonMutation(\n  $productId: ID!\n) {\n  addToBasket(input: {productId: $productId, quantity: 1}) {\n    basket {\n      ...productAmountInBasket_basket\n      id\n    }\n  }\n}\n\nfragment productAmountInBasket_basket on Basket {\n  items {\n    id\n    quantity\n    product {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a3b914b18905936e1b7f118b93e20509";

export default node;
