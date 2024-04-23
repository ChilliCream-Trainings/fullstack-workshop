/**
 * @generated SignedSource<<78ae4ec65da564853709cb0281879d0e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
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

import catalogQueryRefetchQuery_graphql from './catalogQueryRefetchQuery.graphql';

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
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": catalogQueryRefetchQuery_graphql
    }
  },
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

(node as any).hash = "3e31c387ac4ead78ee9f33f5b21bcef4";

export default node;
