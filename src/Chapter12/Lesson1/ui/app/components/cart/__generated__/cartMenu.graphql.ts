/**
 * @generated SignedSource<<eb2bd5e008db7fec92e1142e1f534546>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type cartMenu$data = {
  readonly basket:
    | {
        readonly items: ReadonlyArray<{
          readonly id: string;
        }>;
      }
    | null
    | undefined;
  readonly " $fragmentType": "cartMenu";
};
export type cartMenu$key = {
  readonly " $data"?: cartMenu$data;
  readonly " $fragmentSpreads": FragmentRefs<"cartMenu">;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "cartMenu",
  selections: [
    {
      alias: null,
      args: null,
      concreteType: "Basket",
      kind: "LinkedField",
      name: "basket",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "BasketItem",
          kind: "LinkedField",
          name: "items",
          plural: true,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "id",
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: "Viewer",
  abstractKey: null,
};

(node as any).hash = "4cadc3fae5cdc7394cf52c09263677c5";

export default node;
