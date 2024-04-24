/**
 * @generated SignedSource<<c8b1c022ce0406c0d5536479b8992e7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ChatStatus = "CLOSED" | "PROCESSING" | "READY";
import { FragmentRefs } from "relay-runtime";
export type chat_sendMessageForm$data = {
  readonly id: string;
  readonly status: ChatStatus;
  readonly " $fragmentType": "chat_sendMessageForm";
};
export type chat_sendMessageForm$key = {
  readonly " $data"?: chat_sendMessageForm$data;
  readonly " $fragmentSpreads": FragmentRefs<"chat_sendMessageForm">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "chat_sendMessageForm",
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

(node as any).hash = "255fe4a65e8c31cc9874025640d0b89a";

export default node;
