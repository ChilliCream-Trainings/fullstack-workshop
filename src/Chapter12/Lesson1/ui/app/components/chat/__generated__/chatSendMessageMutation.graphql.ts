/**
 * @generated SignedSource<<9b1959d95a32abcd5987f3fbe9502e7f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SendMessageInput = {
  chatId: string;
  content: string;
};
export type chatSendMessageMutation$variables = {
  connectionId: string;
  input: SendMessageInput;
};
export type chatSendMessageMutation$data = {
  readonly sendMessage: {
    readonly message: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"chat_message">;
    } | null | undefined;
  };
};
export type chatSendMessageMutation = {
  response: chatSendMessageMutation$data;
  variables: chatSendMessageMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connectionId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "chatSendMessageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "SendMessagePayload",
        "kind": "LinkedField",
        "name": "sendMessage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ChatMessage",
            "kind": "LinkedField",
            "name": "message",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "chat_message"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "chatSendMessageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "SendMessagePayload",
        "kind": "LinkedField",
        "name": "sendMessage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ChatMessage",
            "kind": "LinkedField",
            "name": "message",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
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
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "message",
            "handleArgs": [
              {
                "items": [
                  {
                    "kind": "Variable",
                    "name": "connections.0",
                    "variableName": "connectionId"
                  }
                ],
                "kind": "ListValue",
                "name": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "MessageEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "74e87c5b53df38a397cade0b105ab862",
    "id": null,
    "metadata": {},
    "name": "chatSendMessageMutation",
    "operationKind": "mutation",
    "text": "mutation chatSendMessageMutation(\n  $input: SendMessageInput!\n) {\n  sendMessage(input: $input) {\n    message {\n      id\n      ...chat_message\n    }\n  }\n}\n\nfragment chat_message on Message {\n  __isMessage: __typename\n  id\n  role\n  sentAt\n  __typename\n  ... on ChatMessage {\n    content\n  }\n}\n"
  }
};
})();

(node as any).hash = "afa715ce0d597bd0b8b2cd31c118fd7e";

export default node;
