/**
 * @generated SignedSource<<6e27c28848745ab62cfaa5fae226a2d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CardType = "AMEX" | "MASTER_CARD" | "VISA";
export type CreateOrderInput = {
  address: AddressInput;
  items: ReadonlyArray<OrderItemInput>;
  paymentMethod: PaymentMethodInput;
};
export type AddressInput = {
  city: string;
  country: string;
  state: string;
  street: string;
  zipCode: string;
};
export type OrderItemInput = {
  productId: string;
  unitPrice: any;
  units: number;
};
export type PaymentMethodInput = {
  cardHolderName: string;
  cardNumber: string;
  cardType: CardType;
  expiration: any;
  securityNumber: string;
};
export type useCheckoutMutation$variables = {
  input: CreateOrderInput;
};
export type useCheckoutMutation$data = {
  readonly createOrder: {
    readonly errors: ReadonlyArray<{
      readonly message?: string;
      readonly product?: {
        readonly name: string;
        readonly price: any;
      };
      readonly productId?: string;
    }> | null | undefined;
    readonly order: {
      readonly id: string;
    } | null | undefined;
  };
};
export type useCheckoutMutation = {
  response: useCheckoutMutation$data;
  variables: useCheckoutMutation$variables;
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
  "concreteType": "Order",
  "kind": "LinkedField",
  "name": "order",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "productId",
      "storageKey": null
    }
  ],
  "type": "InvalidProductIdError",
  "abstractKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCheckoutMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateOrderPayload",
        "kind": "LinkedField",
        "name": "createOrder",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Product",
                    "kind": "LinkedField",
                    "name": "product",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "PriceChangedError",
                "abstractKey": null
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
    "name": "useCheckoutMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateOrderPayload",
        "kind": "LinkedField",
        "name": "createOrder",
        "plural": false,
        "selections": [
          (v3/*: any*/),
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
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Product",
                    "kind": "LinkedField",
                    "name": "product",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "PriceChangedError",
                "abstractKey": null
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
    "cacheID": "0df27d8c9de353faa741a26d190bd0c9",
    "id": null,
    "metadata": {},
    "name": "useCheckoutMutation",
    "operationKind": "mutation",
    "text": "mutation useCheckoutMutation(\n  $input: CreateOrderInput!\n) {\n  createOrder(input: $input) {\n    order {\n      id\n    }\n    errors {\n      __typename\n      ... on InvalidProductIdError {\n        message\n        productId\n      }\n      ... on PriceChangedError {\n        message\n        product {\n          price\n          name\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4e4de0beb6e62c2d7123e2ea63541503";

export default node;
