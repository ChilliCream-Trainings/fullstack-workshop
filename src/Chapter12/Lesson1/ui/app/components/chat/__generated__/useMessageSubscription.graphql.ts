/**
 * @generated SignedSource<<fe5bad89d99dfde451c7466ec672e553>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useMessageSubscription$variables = {
  chatId: string;
  connectionId: string;
};
export type useMessageSubscription$data = {
  readonly onChatMessagesUpdated: {
    readonly message?: {
      readonly " $fragmentSpreads": FragmentRefs<"chat_message">;
    } | null | undefined;
  };
};
export type useMessageSubscription = {
  response: useMessageSubscription$data;
  variables: useMessageSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "chatId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "connectionId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "chatId",
    "variableName": "chatId"
  }
],
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ChatMessage",
    "kind": "LinkedField",
    "name": "message",
    "plural": false,
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "chat_message"
      }
    ],
    "storageKey": null
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "ChatMessage",
  "kind": "LinkedField",
  "name": "message",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
        (v3/*: any*/),
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useMessageSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "onChatMessagesUpdated",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": (v2/*: any*/),
            "type": "ChatMessageCreated",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": (v2/*: any*/),
            "type": "ChatMessageUpdated",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useMessageSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "onChatMessagesUpdated",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
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
            "type": "ChatMessageCreated",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/)
            ],
            "type": "ChatMessageUpdated",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5aff78ec4e5bf9f1d9a233ddd9af19c9",
    "id": null,
    "metadata": {},
    "name": "useMessageSubscription",
    "operationKind": "subscription",
    "text": "subscription useMessageSubscription(\n  $chatId: ID!\n) {\n  onChatMessagesUpdated(chatId: $chatId) {\n    __typename\n    ... on ChatMessageCreated {\n      message {\n        ...chat_message\n        id\n      }\n    }\n    ... on ChatMessageUpdated {\n      message {\n        ...chat_message\n        id\n      }\n    }\n  }\n}\n\nfragment chat_message on Message {\n  __isMessage: __typename\n  id\n  role\n  sentAt\n  __typename\n  ... on ChatMessage {\n    content\n  }\n}\n"
  }
};
})();

(node as any).hash = "876d03c8c4a255146870cf44d7654a89";

export default node;
