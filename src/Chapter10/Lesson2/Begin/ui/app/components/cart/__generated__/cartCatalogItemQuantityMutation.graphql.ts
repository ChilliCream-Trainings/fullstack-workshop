/**
 * @generated SignedSource<<d39b10e32a4f4be04d8238b88a589d9d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChangeQuantityInput = {
  id: string;
  quantity: number;
};
export type cartCatalogItemQuantityMutation$variables = {
  input: ChangeQuantityInput;
};
export type cartCatalogItemQuantityMutation$data = {
  readonly changeQuantity: {
    readonly errors: ReadonlyArray<{
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly kind: "%other";
    } | {
      readonly kind: "InvalidBasketItemId";
      readonly message: string;
    } | {
      readonly kind: "QuantityCannotBeNegativeError";
      readonly message: string;
    }> | null | undefined;
    readonly shoppingBasket: {
      readonly items: ReadonlyArray<{
        readonly id: string;
        readonly quantity: number;
      }>;
    } | null | undefined;
  };
};
export type cartCatalogItemQuantityMutation = {
  response: cartCatalogItemQuantityMutation$data;
  variables: cartCatalogItemQuantityMutation$variables;
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
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "quantity",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": "kind",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "message",
    "storageKey": null
  }
],
v6 = {
  "kind": "InlineFragment",
  "selections": (v5/*: any*/),
  "type": "InvalidBasketItemId",
  "abstractKey": null
},
v7 = {
  "kind": "InlineFragment",
  "selections": (v5/*: any*/),
  "type": "QuantityCannotBeNegativeError",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "cartCatalogItemQuantityMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangeQuantityPayload",
        "kind": "LinkedField",
        "name": "changeQuantity",
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
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
    "name": "cartCatalogItemQuantityMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangeQuantityPayload",
        "kind": "LinkedField",
        "name": "changeQuantity",
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
              (v4/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2f1926e8d44c69622985a3e26f1c5ea2",
    "id": null,
    "metadata": {},
    "name": "cartCatalogItemQuantityMutation",
    "operationKind": "mutation",
    "text": "mutation cartCatalogItemQuantityMutation(\n  $input: ChangeQuantityInput!\n) {\n  changeQuantity(input: $input) {\n    shoppingBasket {\n      items {\n        id\n        quantity\n      }\n      id\n    }\n    errors {\n      __typename\n      kind: __typename\n      ... on InvalidBasketItemId {\n        message\n      }\n      ... on QuantityCannotBeNegativeError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "70483e8832e2f7acd01145271a18a2e9";

export default node;
