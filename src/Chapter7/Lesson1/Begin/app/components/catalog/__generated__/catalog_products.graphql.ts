/**
 * @generated SignedSource<<8f420a04143b2e23da0e4ef4fe4f6f13>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalog_products$data = {
  readonly products: {
    readonly nodes: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"catalogListItem_product">;
    }> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "catalog_products";
};
export type catalog_products$key = {
  readonly " $data"?: catalog_products$data;
  readonly " $fragmentSpreads": FragmentRefs<"catalog_products">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "catalog_products",
  "selections": [
    {
      "alias": null,
      "args": null,
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

(node as any).hash = "2a0e1b185ef543ff09188265073bd2e3";

export default node;
