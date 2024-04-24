/**
 * @generated SignedSource<<eebc3dad3b6a88cf23a2b1e9f17e7c35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalogListItem_product$data = {
  readonly description: string | null | undefined;
  readonly id: string;
  readonly imageUrl: any;
  readonly name: string;
  readonly price: any;
  readonly " $fragmentType": "catalogListItem_product";
};
export type catalogListItem_product$key = {
  readonly " $data"?: catalogListItem_product$data;
  readonly " $fragmentSpreads": FragmentRefs<"catalogListItem_product">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "catalogListItem_product",
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

(node as any).hash = "7e70777072181349487918835a905718";

export default node;
