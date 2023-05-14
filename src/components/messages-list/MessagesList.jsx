import React, { useState, useContext, useEffect } from "react";
import { Message } from "../message/Message";
import "./messages-list.styles.scss";
import { ChatContext } from "../../context/ChatContext";

import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages-list">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};
