/**
 * @generated SignedSource<<f898c63836739558f6d394ecac7f5861>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ChatStatus = "CLOSED" | "PROCESSING" | "READY";
import { FragmentRefs } from "relay-runtime";
export type chat_chat$data = {
  readonly id: string;
  readonly status: ChatStatus;
  readonly " $fragmentType": "chat_chat";
};
export type chat_chat$key = {
  readonly " $data"?: chat_chat$data;
  readonly " $fragmentSpreads": FragmentRefs<"chat_chat">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "chat_chat",
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
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "Chat",
  "abstractKey": null
};

(node as any).hash = "75300518e751e75015770f467312c2e0";

export default node;
