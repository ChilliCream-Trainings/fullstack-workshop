/**
 * @generated SignedSource<<4fd6aa2d02232ff33ecdb1e0c7a2385a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ChatMessageRole = "ASSISTANT" | "SYSTEM" | "USER";
import { FragmentRefs } from "relay-runtime";
export type chat_message$data = {
  readonly __typename: string;
  readonly content?: string;
  readonly id: string;
  readonly role: ChatMessageRole;
  readonly sentAt: any;
  readonly " $fragmentType": "chat_message";
};
export type chat_message$key = {
  readonly " $data"?: chat_message$data;
  readonly " $fragmentSpreads": FragmentRefs<"chat_message">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "chat_message",
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
      "name": "role",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sentAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "content",
          "storageKey": null
        }
      ],
      "type": "ChatMessage",
      "abstractKey": null
    }
  ],
  "type": "Message",
  "abstractKey": "__isMessage"
};

(node as any).hash = "f1abe4ae8075a521fad3128bb05917f1";

export default node;
