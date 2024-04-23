/**
 * @generated SignedSource<<a36b0892e5e41fe8484ca182275a8a24>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalog_query$data = {
  readonly products: {
    readonly nodes: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"catalogListItem_product">;
    }> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "catalog_query";
};
export type catalog_query$key = {
  readonly " $data"?: catalog_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"catalog_query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "brandId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "typeId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "catalog_query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "fields": [
            {
              "fields": [
                {
                  "kind": "Variable",
                  "name": "in",
                  "variableName": "brandId"
                }
              ],
              "kind": "ObjectValue",
              "name": "brandId"
            },
            {
              "fields": [
                {
                  "kind": "Variable",
                  "name": "in",
                  "variableName": "typeId"
                }
              ],
              "kind": "ObjectValue",
              "name": "typeId"
            }
          ],
          "kind": "ObjectValue",
          "name": "where"
        }
      ],
      "concreteType": "ProductsConnection",
      "kind": "LinkedField",
      "name": "products",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Product",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "catalogListItem_product"
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

(node as any).hash = "f0fbad0d872aed8306e6a3a3a3bf4d87";

export default node;
