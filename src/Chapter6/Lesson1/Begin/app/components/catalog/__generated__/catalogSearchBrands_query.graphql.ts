/**
 * @generated SignedSource<<c874b4629c897003320d51d117ed90ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type catalogSearchBrands_query$data = {
  readonly brands: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    }> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "catalogSearchBrands_query";
};
export type catalogSearchBrands_query$key = {
  readonly " $data"?: catalogSearchBrands_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"catalogSearchBrands_query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "catalogSearchBrands_query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "BrandsConnection",
      "kind": "LinkedField",
      "name": "brands",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Brand",
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

(node as any).hash = "63ffa2681381a4b9b49a35e914d26efe";

export default node;
