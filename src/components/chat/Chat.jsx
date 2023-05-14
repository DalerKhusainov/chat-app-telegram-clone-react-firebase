import React from "react";
import { ChatTitle } from "../chat-title/ChatTitle";
import { MessagesList } from "../messages-list/MessagesList";
import { InputMessage } from "../input-message/InputMessage";
import "./chat.styles.scss";

export const Chat = () => {
  return (
    <div className="chat">
      <ChatTitle />
      <MessagesList />
      <InputMessage />
    </div>
  );
};
