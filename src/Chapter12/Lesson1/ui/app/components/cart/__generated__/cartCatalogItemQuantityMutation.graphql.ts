/**
 * @generated SignedSource<<0968c4e2bb59a865d34a6f9394e90950>>
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
    readonly basket: {
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
    }
  ],
  "storageKey": null
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
            "concreteType": "Basket",
            "kind": "LinkedField",
            "name": "basket",
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
            "concreteType": "Basket",
            "kind": "LinkedField",
            "name": "basket",
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
    "cacheID": "9dcbc7c2b2f884f925c2f373d090c9a4",
    "id": null,
    "metadata": {},
    "name": "cartCatalogItemQuantityMutation",
    "operationKind": "mutation",
    "text": "mutation cartCatalogItemQuantityMutation(\n  $input: ChangeQuantityInput!\n) {\n  changeQuantity(input: $input) {\n    basket {\n      items {\n        id\n        quantity\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b4473aabe38f1fba1bd0e02b6fa9017b";

export default node;
