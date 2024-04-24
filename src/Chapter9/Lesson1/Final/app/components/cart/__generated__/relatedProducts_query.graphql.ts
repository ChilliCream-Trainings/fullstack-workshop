/**
 * @generated SignedSource<<cde425b9b06850d9b69f2ca6f41aa66d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type relatedProducts_query$data = {
  readonly relatedProducts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"relatedProductListItem_product">;
      };
    }> | null | undefined;
  } | null | undefined;
  readonly viewer: {
    readonly basket: {
      readonly items: ReadonlyArray<{
        readonly id: string;
        readonly product: {
          readonly id: string;
        };
      }>;
    } | null | undefined;
  };
  readonly " $fragmentType": "relatedProducts_query";
};
export type relatedProducts_query$key = {
  readonly " $data"?: relatedProducts_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"relatedProducts_query">;
};

import relatedProductsRefetchQuery_graphql from './relatedProductsRefetchQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "relatedProducts"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 4,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": relatedProductsRefetchQuery_graphql
    }
  },
  "name": "relatedProducts_query",
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
          "concreteType": "ShoppingBasket",
          "kind": "LinkedField",
          "name": "basket",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ShoppingBasketItem",
              "kind": "LinkedField",
              "name": "items",
              "plural": true,
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Product",
                  "kind": "LinkedField",
                  "name": "product",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/)
                  ],
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
      "alias": "relatedProducts",
      "args": null,
      "concreteType": "ProductsConnection",
      "kind": "LinkedField",
      "name": "__relatedProducts_relatedProducts_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ProductsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Product",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "relatedProductListItem_product"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "93a8b4392c49976195edd7dd6837672e";

export default node;
