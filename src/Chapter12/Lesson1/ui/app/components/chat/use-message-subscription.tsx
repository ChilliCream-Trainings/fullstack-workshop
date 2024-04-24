import { useMemo } from "react";
import { useSubscription } from "react-relay";
import { ConnectionHandler, graphql } from "relay-runtime";

export function useMessageSubscription(chatId: string) {
  const config = useMemo(() => {
    const connectionId = ConnectionHandler.getConnectionID(
      chatId,
      "chat_chatMessages_messages"
    );
    return {
      subscription: graphql`
        subscription useMessageSubscription($chatId: ID!, $connectionId: ID!) {
          onChatMessagesUpdated(chatId: $chatId) {
            ... on ChatMessageCreated {
              message
                @appendNode(
                  connections: [$connectionId]
                  edgeTypeName: "MessageEdge"
                ) {
                ...chat_message
              }
            }
            ... on ChatMessageUpdated {
              message {
                ...chat_message
              }
            }
          }
        }
      `,
      variables: { chatId, connectionId },
    };
  }, [chatId]);

  useSubscription(config);
}
