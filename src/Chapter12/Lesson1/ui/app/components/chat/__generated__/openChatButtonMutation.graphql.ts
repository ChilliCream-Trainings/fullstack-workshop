/**
 * @generated SignedSource<<db87ed411c6761bad1e65d2562e598aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type openChatButtonMutation$variables = Record<PropertyKey, never>;
export type openChatButtonMutation$data = {
  readonly createChat: {
    readonly chat: {
      readonly id: string;
    } | null | undefined;
    readonly errors: ReadonlyArray<{
      readonly message?: string;
    }> | null | undefined;
  };
};
export type openChatButtonMutation = {
  response: openChatButtonMutation$data;
  variables: openChatButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
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
    }
  ],
  "storageKey": null
},
v1 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    }
  ],
  "type": "Error",
  "abstractKey": "__isError"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "openChatButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CreateChatPayload",
        "kind": "LinkedField",
        "name": "createChat",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v1/*: any*/)
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "openChatButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CreateChatPayload",
        "kind": "LinkedField",
        "name": "createChat",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d5e3cb46e89daeeb752b796a274e080b",
    "id": null,
    "metadata": {},
    "name": "openChatButtonMutation",
    "operationKind": "mutation",
    "text": "mutation openChatButtonMutation {\n  createChat {\n    chat {\n      id\n    }\n    errors {\n      __typename\n      ... on Error {\n        __isError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1a90d6ecc21cae03c62027f5ad4a4c14";

export default node;
