/**
 * @generated SignedSource<<2e7aa9208c57d5e1e17bd4374eb714b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type productDetailsAddToBasketMutation$variables = {
  productId: string;
};
export type productDetailsAddToBasketMutation$data = {
  readonly addToBasket: {
    readonly basket: {
      readonly __typename: "Basket";
    } | null | undefined;
  };
};
export type productDetailsAddToBasketMutation = {
  response: productDetailsAddToBasketMutation$data;
  variables: productDetailsAddToBasketMutation$variables;
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
    "alias": null,
    "args": [
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
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "productDetailsAddToBasketMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "productDetailsAddToBasketMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "908bcbc7f1aff3a65bd6a2b1b4b14393",
    "id": null,
    "metadata": {},
    "name": "productDetailsAddToBasketMutation",
    "operationKind": "mutation",
    "text": "mutation productDetailsAddToBasketMutation(\n  $productId: ID!\n) {\n  addToBasket(input: {productId: $productId, quantity: 1}) {\n    basket {\n      __typename\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0218bf63db6c3aa3f83a81a766537735";

export default node;
