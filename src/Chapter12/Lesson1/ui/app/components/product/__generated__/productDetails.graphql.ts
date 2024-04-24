/**
 * @generated SignedSource<<ff8c91d14cf249c3400251bf42bde5f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type productDetails$data = {
  readonly brand: {
    readonly name: string;
  };
  readonly description: string | null | undefined;
  readonly id: string;
  readonly imageUrl: any;
  readonly name: string;
  readonly price: any;
  readonly " $fragmentType": "productDetails";
};
export type productDetails$key = {
  readonly " $data"?: productDetails$data;
  readonly " $fragmentSpreads": FragmentRefs<"productDetails">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "productDetails",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Brand",
      "kind": "LinkedField",
      "name": "brand",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Product",
  "abstractKey": null
};
})();

(node as any).hash = "50fadb9ffdab46ce77bc89600c1b8e9a";

export default node;
