/**
 * @generated SignedSource<<f4bf1f4415f97fb960d527c9906e2284>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type checkoutQuery$variables = Record<PropertyKey, never>;
export type checkoutQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"checkoutForm">;
};
export type checkoutQuery = {
  response: checkoutQuery$data;
  variables: checkoutQuery$variables;
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
    "name": "checkoutQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "checkoutForm"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "checkoutQuery",
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
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "price",
                        "storageKey": null
                      }
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
      }
    ]
  },
  "params": {
    "cacheID": "22a8b6109b9fc2cd64080d9f3d8a24ed",
    "id": null,
    "metadata": {},
    "name": "checkoutQuery",
    "operationKind": "query",
    "text": "query checkoutQuery {\n  ...checkoutForm\n}\n\nfragment checkoutForm on Query {\n  viewer {\n    ...useCheckout_viewer\n  }\n}\n\nfragment useCheckout_viewer on Viewer {\n  basket {\n    items {\n      quantity\n      product {\n        id\n        price\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1a021233779596055805109d4e2c1944";

export default node;
