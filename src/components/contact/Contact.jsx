import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import "./contact.styles.scss";

export const Contacts = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="contact"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <div className="contact__img">
              <img
                alt={chat[1].userInfo.displayName}
                src={chat[1].userInfo.photoURL}
              />
            </div>
            <div className="contact__info">
              <p className="name">{chat[1].userInfo.displayName}</p>
              <p className="last-message">{chat[1].lastMessage?.text}</p>
            </div>
            {/* <div className="contact__date-and-message-amount">
              <p className="date">Message Date</p>
            </div> */}
          </div>
        ))}
    </>
  );
};
