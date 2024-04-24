/**
 * @generated SignedSource<<6d42b5294473a4b0882f2c6a7d9b45ea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type authorizationProvider_useSessionId$data = {
  readonly sessionId: string | null | undefined;
  readonly " $fragmentType": "authorizationProvider_useSessionId";
};
export type authorizationProvider_useSessionId$key = {
  readonly " $data"?: authorizationProvider_useSessionId$data;
  readonly " $fragmentSpreads": FragmentRefs<"authorizationProvider_useSessionId">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "authorizationProvider_useSessionId",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sessionId",
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "7696e0150ee168434bb87d344f6581ca";

export default node;
