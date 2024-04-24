/**
 * @generated SignedSource<<e764fed67e037c7a249209f52ac9c0e2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalogListItem$data = {
  readonly id: string;
  readonly imageUrl: any;
  readonly name: string;
  readonly price: any;
  readonly " $fragmentType": "catalogListItem";
};
export type catalogListItem$key = {
  readonly " $data"?: catalogListItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"catalogListItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "catalogListItem",
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

(node as any).hash = "7deee1dd6e642eee3d4683e2a9fe7d97";

export default node;
