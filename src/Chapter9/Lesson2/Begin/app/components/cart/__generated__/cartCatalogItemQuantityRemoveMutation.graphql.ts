/**
 * @generated SignedSource<<1a50fa8dc6b5ebd57a1a8334591cf024>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveFromBasketInput = {
  id: string;
};
export type cartCatalogItemQuantityRemoveMutation$variables = {
  input: RemoveFromBasketInput;
};
export type cartCatalogItemQuantityRemoveMutation$data = {
  readonly removeFromBasket: {
    readonly shoppingBasket: {
      readonly items: ReadonlyArray<{
        readonly id: string;
      }>;
    } | null | undefined;
  };
};
export type cartCatalogItemQuantityRemoveMutation = {
  response: cartCatalogItemQuantityRemoveMutation$data;
  variables: cartCatalogItemQuantityRemoveMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
  "concreteType": "ShoppingBasketItem",
  "kind": "LinkedField",
  "name": "items",
  "plural": true,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "cartCatalogItemQuantityRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveFromBasketPayload",
        "kind": "LinkedField",
        "name": "removeFromBasket",
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
              (v3/*: any*/)
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
    "name": "cartCatalogItemQuantityRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveFromBasketPayload",
        "kind": "LinkedField",
        "name": "removeFromBasket",
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
              (v3/*: any*/),
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
    "cacheID": "becdfb18196aa38f080718eacd2375c6",
    "id": null,
    "metadata": {},
    "name": "cartCatalogItemQuantityRemoveMutation",
    "operationKind": "mutation",
    "text": "mutation cartCatalogItemQuantityRemoveMutation(\n  $input: RemoveFromBasketInput!\n) {\n  removeFromBasket(input: $input) {\n    shoppingBasket {\n      items {\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "39f24c268261a0860e40f76e7e4df1ec";

export default node;
