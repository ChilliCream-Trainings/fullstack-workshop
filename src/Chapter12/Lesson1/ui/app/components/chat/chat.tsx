import {
  ConnectionHandler,
  graphql,
  useFragment,
  useLazyLoadQuery,
  useMutation,
  usePaginationFragment,
} from "react-relay";
import { chat_message$key } from "./__generated__/chat_message.graphql";
import { chat_chatMessages$key } from "./__generated__/chat_chatMessages.graphql";
import { useLoadMore } from "@/app/shared/utils/use-load-more";
import { chatQuery } from "./__generated__/chatQuery.graphql";
import { useCallback, useState } from "react";
import { chatSendMessageMutation } from "./__generated__/chatSendMessageMutation.graphql";
import { useMessageSubscription } from "./use-message-subscription";
import "./chat.css";
import { useCloseChatMutation } from "./use-close-chat-mutation";
import { chat_chat$key } from "./__generated__/chat_chat.graphql";
import { chat_sendMessageForm$key } from "./__generated__/chat_sendMessageForm.graphql";
import { useChatStatusSubscription } from "./use-chat-status-subscription";

interface ChatProps {
  onChatClose: () => void;
  chatId: string;
}

export function Chat({ onChatClose, chatId }: ChatProps) {
  const data = useLazyLoadQuery<chatQuery>(
    graphql`
      query chatQuery($chatId: ID!) {
        chatById(id: $chatId) {
          ...chat_chatMessages
          ...chat_sendMessageForm
        }
      }
    `,
    { chatId }
  );

  const handleChatClose = useCloseChatMutation(chatId, onChatClose);

  if (!data.chatById) {
    return null;
  }

  return (
    <div className="floating-pane">
      <div
        onClick={handleChatClose}
        className="hide-chatbot"
        title="Close .NET Concierge"
      >
        <span>✖</span>
      </div>

      <ChatMessages $ref={data.chatById} chatId={chatId} />
      <SendMessageFrom $ref={data.chatById} />
    </div>
  );
}

interface SendMessageFromProps {
  $ref: chat_sendMessageForm$key;
}

function SendMessageFrom({ $ref }: SendMessageFromProps) {
  const data = useFragment(
    graphql`
      fragment chat_sendMessageForm on Chat {
        id
        status
      }
    `,
    $ref
  );

  const [commit, isInFlight] = useMutation<chatSendMessageMutation>(graphql`
    mutation chatSendMessageMutation(
      $input: SendMessageInput!
      $connectionId: ID!
    ) {
      sendMessage(input: $input) {
        message
          @appendNode(
            connections: [$connectionId]
            edgeTypeName: "MessageEdge"
          ) {
          id
          ...chat_message
        }
      }
    }
  `);

  const [message, setMessage] = useState("");

  const sendMessage = useCallback(() => {
    const connectionId = ConnectionHandler.getConnectionID(
      data.id,
      "chat_chatMessages_messages"
    );
    commit({
      variables: {
        input: {
          chatId: data.id,
          content: message,
        },
        connectionId,
      },
      onCompleted: () => {
        setMessage("");
      },
    });
  }, [commit, data.id, message]);

  const isInProcess = isInFlight || data.status !== "READY";
  return (
    <form className="chatbot-input">
      <textarea
        placeholder={isInProcess ? "Thinking..." : "Start chatting..."}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isInProcess}
      />
      <button
        type="submit"
        title="Send"
        onClick={sendMessage}
        disabled={!message || isInProcess}
      >
        Send
      </button>
    </form>
  );
}

interface ChatMessagesProps {
  $ref: chat_chatMessages$key;
  chatId: string;
}

function ChatMessages({ $ref, chatId }: ChatMessagesProps) {
  // TODO where should we put these
  useMessageSubscription(chatId);
  useChatStatusSubscription(chatId);

  const { data, loadPrevious, hasPrevious } = usePaginationFragment(
    graphql`
      fragment chat_chatMessages on Chat
      @refetchable(queryName: "chatChatMessagesQuery")
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 10 }
      ) {
        status
        messages(last: $count, before: $cursor)
          @connection(key: "chat_chatMessages_messages") {
          edges {
            node {
              id
              ...chat_message
            }
          }
        }
      }
    `,
    $ref
  );

  const { element } = useLoadMore(loadPrevious, hasPrevious);
  const messages = data.messages?.edges?.map((edge) => (
    <ChatMessage key={edge.node.id} $ref={edge.node} />
  ));

  return (
    <div className="chatbot-chat">
      {element}
      {messages}
      {data.status === "PROCESSING" && <p className="thinking">Thinking...</p>}
      {data.status === "CLOSED" && (
        <p className="message message-assistant">
          <strong>This chat is closed!</strong>
        </p>
      )}
    </div>
  );
}

interface ChatMessageProps {
  $ref: chat_message$key;
}

function ChatMessage({ $ref }: ChatMessageProps) {
  const data = useFragment(
    graphql`
      fragment chat_message on Message {
        id
        role
        sentAt
        __typename
        ... on ChatMessage {
          content
        }
      }
    `,
    $ref
  );

  const messageClass =
    data.role === "USER" ? "message-user" : "message-assistant";

  return <p className={"message " + messageClass}>{data.content}</p>;
}
