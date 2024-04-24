/**
 * @generated SignedSource<<b90de38855ca11a8ab398103baed421a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type relatedProductListItem_product$data = {
  readonly description: string | null | undefined;
  readonly id: string;
  readonly imageUrl: any;
  readonly name: string;
  readonly price: any;
  readonly " $fragmentType": "relatedProductListItem_product";
};
export type relatedProductListItem_product$key = {
  readonly " $data"?: relatedProductListItem_product$data;
  readonly " $fragmentSpreads": FragmentRefs<"relatedProductListItem_product">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "relatedProductListItem_product",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
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
  "type": "Product",
  "abstractKey": null
};

(node as any).hash = "4becd0936a5482a387063006ab1b43a5";

export default node;
