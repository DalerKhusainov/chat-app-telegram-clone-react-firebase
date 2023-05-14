import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import "./message.styles.scss";

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div
        ref={ref}
        className={`message ${message.senderId === currentUser.uid && "owner"}`}
      >
        <div className="messageInfo">
          <img
            alt=""
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
          />
        </div>
        <div className="messageContent">
          <p>{message.text}</p>
          {message.img && <img alt="" src={message.img} />}
          <span className="message-date">{message.date}</span>
        </div>
      </div>
    </>
  );
};
