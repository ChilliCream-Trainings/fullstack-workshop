/**
 * @generated SignedSource<<c272038214c1b03e3c92f245ec5380b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type productQuery$variables = {
  id: string;
};
export type productQuery$data = {
  readonly productById: {
    readonly brand: {
      readonly name: string;
    };
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"productDetails_product">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"productDetails_query">;
};
export type productQuery = {
  response: productQuery$data;
  variables: productQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
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
    "name": "productQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "productDetails_query"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "productById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Brand",
            "kind": "LinkedField",
            "name": "brand",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "productDetails_product"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "productQuery",
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
                  (v3/*: any*/),
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "productById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Brand",
            "kind": "LinkedField",
            "name": "brand",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "price",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "imageUrl",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "40a53e645aeeb8abfa117258bbd12638",
    "id": null,
    "metadata": {},
    "name": "productQuery",
    "operationKind": "query",
    "text": "query productQuery(\n  $id: ID!\n) {\n  ...productDetails_query\n  productById(id: $id) {\n    name\n    brand {\n      name\n      id\n    }\n    ...productDetails_product\n    id\n  }\n}\n\nfragment productAmountInBasket_basket on Basket {\n  items {\n    id\n    quantity\n    product {\n      id\n    }\n  }\n}\n\nfragment productDetails_product on Product {\n  id\n  name\n  description\n  price\n  imageUrl\n  brand {\n    name\n    id\n  }\n}\n\nfragment productDetails_query on Query {\n  viewer {\n    basket {\n      ...productAmountInBasket_basket\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6cbf741e289401873cd5d892a6d2bb91";

export default node;
