/**
 * @generated SignedSource<<49d7c2856eae5cf4fa263ad65db64baa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type chatQuery$variables = {
  chatId: string;
};
export type chatQuery$data = {
  readonly chatById: {
    readonly " $fragmentSpreads": FragmentRefs<"chat_chatMessages" | "chat_sendMessageForm">;
  } | null | undefined;
};
export type chatQuery = {
  response: chatQuery$data;
  variables: chatQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "chatId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "chatId"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 10
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "chatQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Chat",
        "kind": "LinkedField",
        "name": "chatById",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "chat_chatMessages"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "chat_sendMessageForm"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Chat",
        "kind": "LinkedField",
        "name": "chatById",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "MessagesConnection",
            "kind": "LinkedField",
            "name": "messages",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MessagesEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ChatMessage",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
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
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasPreviousPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "messages(last:10)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "chat_chatMessages_messages",
            "kind": "LinkedHandle",
            "name": "messages"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "71fb20c3e8ef7caed911b06b3a6eed83",
    "id": null,
    "metadata": {},
    "name": "chatQuery",
    "operationKind": "query",
    "text": "query chatQuery(\n  $chatId: ID!\n) {\n  chatById(id: $chatId) {\n    ...chat_chatMessages\n    ...chat_sendMessageForm\n    id\n  }\n}\n\nfragment chat_chatMessages on Chat {\n  status\n  messages(last: 10) {\n    edges {\n      node {\n        id\n        ...chat_message\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n  id\n}\n\nfragment chat_message on Message {\n  __isMessage: __typename\n  id\n  role\n  sentAt\n  __typename\n  ... on ChatMessage {\n    content\n  }\n}\n\nfragment chat_sendMessageForm on Chat {\n  id\n  status\n}\n"
  }
};
})();

(node as any).hash = "0310e2e8b8dae11187ef96ee3123899b";

export default node;
