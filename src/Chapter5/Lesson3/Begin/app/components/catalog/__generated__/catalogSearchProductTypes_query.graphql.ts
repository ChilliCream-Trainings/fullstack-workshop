/**
 * @generated SignedSource<<d5b041538222498e47b7457a8ebe6793>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalogSearchProductTypes_query$data = {
  readonly productTypes: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    }> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "catalogSearchProductTypes_query";
};
export type catalogSearchProductTypes_query$key = {
  readonly " $data"?: catalogSearchProductTypes_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"catalogSearchProductTypes_query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "catalogSearchProductTypes_query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ProductTypesConnection",
      "kind": "LinkedField",
      "name": "productTypes",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ProductType",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
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

(node as any).hash = "2767ee1621304aa984c65321a0ccfca9";

export default node;
