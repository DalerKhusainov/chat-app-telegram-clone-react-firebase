import React, { useState, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";

import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

import "./add-contact.styles.scss";

export const AddContact = ({
  moveContactField,
  onClickAddContact,
  setMoveContactField,
  setMenuCloseValue,
}) => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [textInfoValue, setTextInfoValue] = useState(
    "Find your friend to start chat!"
  );

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    console.log(q);

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        setTextInfoValue("Find your friend to start chat!");
      });
    } catch (err) {
      setErr(true);
      setTextInfoValue("The user was not found");
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      } else console.log("OOOps");
    } catch (err) {
      setErr(true);
    }

    setUser(null);
    setUserName("");
    setTextInfoValue("Find your friend to start chat!");
    setTimeout(() => {
      setMoveContactField("27.9");
      setMenuCloseValue("100");
    }, 1000);
  };

  if (user !== null) {
    if (user.displayName === currentUser.displayName) {
      setTextInfoValue("The user was not found");
      setUser(null);
    }
  }
  // console.log("Found user is", user);
  // console.log("Current user is", currentUser.displayName);

  return (
    <div className="addContact" style={{ right: `${moveContactField}rem` }}>
      <div className="closeIcon" onClick={onClickAddContact}>
        <CloseIcon fontSize="large" color="inherit" />
      </div>
      <div className="formSearchUser">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKey}
          value={userName}
        />
        <button onClick={handleSearch}>Find</button>
      </div>
      <div className="addContact__field">
        <p className="textInfo">{textInfoValue}</p>
        {err && <span>User not found!</span>}
        {user && (
          <div className="contact">
            <img
              className="contactImage"
              alt={user.displayName}
              src={user.photoURL}
            />
            <div className="contactName">{user.displayName}</div>
            <button onClick={handleSelect} className="bnt-start">
              Start chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
