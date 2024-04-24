/**
 * @generated SignedSource<<2795d6a38d76abaf0e6fc292d5cfa6d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type ChatStatus = "CLOSED" | "PROCESSING" | "READY";
export type useChatStatusSubscription$variables = {
  chatId: string;
};
export type useChatStatusSubscription$data = {
  readonly onChatStatusChanged: {
    readonly chat: {
      readonly status: ChatStatus;
    } | null | undefined;
  };
};
export type useChatStatusSubscription = {
  response: useChatStatusSubscription$data;
  variables: useChatStatusSubscription$variables;
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
    "name": "chatId",
    "variableName": "chatId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useChatStatusSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChatStatusChanged",
        "kind": "LinkedField",
        "name": "onChatStatusChanged",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Chat",
            "kind": "LinkedField",
            "name": "chat",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
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
    "name": "useChatStatusSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChatStatusChanged",
        "kind": "LinkedField",
        "name": "onChatStatusChanged",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Chat",
            "kind": "LinkedField",
            "name": "chat",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bd3baf07ab41226e8af5e56fcb765e26",
    "id": null,
    "metadata": {},
    "name": "useChatStatusSubscription",
    "operationKind": "subscription",
    "text": "subscription useChatStatusSubscription(\n  $chatId: ID!\n) {\n  onChatStatusChanged(chatId: $chatId) {\n    chat {\n      status\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5802e3ebc91df0df84437005202be97e";

export default node;
