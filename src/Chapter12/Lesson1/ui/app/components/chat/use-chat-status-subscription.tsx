import { useMemo } from "react";
import { graphql, useSubscription } from "react-relay";

export function useChatStatusSubscription(chatId: string) {
  const config = useMemo(() => {
    return {
      subscription: graphql`
        subscription useChatStatusSubscription($chatId: ID!) {
          onChatStatusChanged(chatId: $chatId) {
            chat {
              status
            }
          }
        }
      `,
      variables: { chatId },
    };
  }, [chatId]);

  useSubscription(config);
}
