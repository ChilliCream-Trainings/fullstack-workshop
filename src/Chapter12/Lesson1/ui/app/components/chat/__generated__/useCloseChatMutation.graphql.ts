/**
 * @generated SignedSource<<57e76dbd6897121450035a3437da9a4a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChatStatus = "CLOSED" | "PROCESSING" | "READY";
export type CloseChatInput = {
  chatId: string;
};
export type useCloseChatMutation$variables = {
  input: CloseChatInput;
};
export type useCloseChatMutation$data = {
  readonly closeChat: {
    readonly chat: {
      readonly id: string;
      readonly status: ChatStatus;
    } | null | undefined;
  };
};
export type useCloseChatMutation = {
  response: useCloseChatMutation$data;
  variables: useCloseChatMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CloseChatPayload",
    "kind": "LinkedField",
    "name": "closeChat",
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
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCloseChatMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCloseChatMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ccfab531786a0297b45c2ce6bf0fd210",
    "id": null,
    "metadata": {},
    "name": "useCloseChatMutation",
    "operationKind": "mutation",
    "text": "mutation useCloseChatMutation(\n  $input: CloseChatInput!\n) {\n  closeChat(input: $input) {\n    chat {\n      id\n      status\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b3fd2fa086fd089cdb10efed63ee903c";

export default node;
