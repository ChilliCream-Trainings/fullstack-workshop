/**
 * @generated SignedSource<<ec8412b56bbf258a27bb8e6dc454ec5f>>
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
    readonly errors: ReadonlyArray<{
      readonly id: string;
      readonly kind: "InvalidBasketItemId";
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly kind: "%other";
    }> | null | undefined;
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
v3 = [
  (v2/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "ShoppingBasketItem",
  "kind": "LinkedField",
  "name": "items",
  "plural": true,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v5 = {
  "alias": "kind",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": (v3/*: any*/),
  "type": "InvalidBasketItemId",
  "abstractKey": null
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
              (v4/*: any*/)
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
              (v5/*: any*/),
              (v6/*: any*/)
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
              (v4/*: any*/),
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
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4df86f15ab94aeb9e64841bb440f2490",
    "id": null,
    "metadata": {},
    "name": "cartCatalogItemQuantityRemoveMutation",
    "operationKind": "mutation",
    "text": "mutation cartCatalogItemQuantityRemoveMutation(\n  $input: RemoveFromBasketInput!\n) {\n  removeFromBasket(input: $input) {\n    shoppingBasket {\n      items {\n        id\n      }\n      id\n    }\n    errors {\n      __typename\n      kind: __typename\n      ... on InvalidBasketItemId {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f26660e301f232599d4f506922d6abaa";

export default node;
