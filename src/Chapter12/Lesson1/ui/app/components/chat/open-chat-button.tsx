import { Suspense, useCallback, useState } from "react";
import { Chat } from "./chat";

import "./open-chat-button.css";
import { graphql } from "relay-runtime";
import { useMutation } from "react-relay";
import { openChatButtonMutation } from "./__generated__/openChatButtonMutation.graphql";

export function OpenChatButton() {
  const [commit, isInFlight] = useMutation<openChatButtonMutation>(graphql`
    mutation openChatButtonMutation {
      createChat {
        chat {
          id
        }
        errors {
          ... on Error {
            message
          }
        }
      }
    }
  `);

  const [chatId, setChatId] = useState<string | null>(null);

  const openChat = useCallback(async () => {
    commit({
      variables: {},
      onCompleted: (r) => {
        if (r.createChat.chat?.id) {
          setChatId(r.createChat.chat.id);
        } else {
          if (r.createChat.errors) {
            console.error(r.createChat.errors);
          }
        }
      },
    });
  }, [commit, setChatId]);
  return (
    <Suspense>
      <button
        className="show-chatbot"
        onClick={openChat}
        title="Show chatbot"
        disabled={isInFlight}
      />
      {chatId && <Chat chatId={chatId} onChatClose={() => setChatId(null)} />}
    </Suspense>
  );
}
