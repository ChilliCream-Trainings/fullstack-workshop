import { useCallback } from "react";
import { graphql, useMutation } from "react-relay";

export function useCloseChatMutation(chatId: string, onChatClose: () => void) {
  const [commit, isInFlight] = useMutation(graphql`
    mutation useCloseChatMutation($input: CloseChatInput!) {
      closeChat(input: $input) {
        chat {
          id
          status
        }
      }
    }
  `);

  return useCallback(() => {
    commit({
      variables: { input: { chatId } },
      onCompleted: () => {
        onChatClose();
      },
    });
  }, [commit, onChatClose, chatId]);
}
