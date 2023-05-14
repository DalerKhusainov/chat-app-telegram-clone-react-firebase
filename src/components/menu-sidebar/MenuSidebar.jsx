import React, { useState, useContext } from "react";

// Component
import { AddContact } from "../add-contact/AddContact";

// Material UI Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupIcon from "@mui/icons-material/Group";
import CampaignIcon from "@mui/icons-material/Campaign";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LogoutIcon from "@mui/icons-material/Logout";
import Switch from "@mui/material/Switch";

// CSS Styles
import "./menu-sidebar.styles.scss";

// Firebase
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

// Context API
import { AuthContext } from "../../context/AuthContext";

export const MenuSidebar = ({
  menuCloseValue,
  handleMenuClose,
  setMenuCloseValue,
}) => {
  const [hiddenValue, setHiddenValue] = useState("130");
  const [rotateValue, setRotateValue] = useState("0");
  const [moveContactField, setMoveContactField] = useState("27.9");
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const { currentUser } = useContext(AuthContext);

  const onClickExpandMoreIconHandler = () => {
    if (hiddenValue === "0") {
      setHiddenValue("130");
      setRotateValue("180");
      setMoveContactField("27.9");
    } else {
      setHiddenValue("0");
      setRotateValue("0");
    }
  };

  const onClickAddContact = () => {
    if (moveContactField === "-30.1") setMoveContactField("27.9");
    else setMoveContactField("-30.1");
  };

  return (
    <>
      <div className="menu-sidebar" style={{ left: `-${menuCloseValue}rem` }}>
        <div className="menu">
          <div className="menu-current-account">
            <AddContact
              moveContactField={moveContactField}
              onClickAddContact={onClickAddContact}
              setMoveContactField={setMoveContactField}
              setMenuCloseValue={setMenuCloseValue}
            />
            <img
              className="menu-account-img"
              src={currentUser.photoURL}
              alt={currentUser.displayName}
            />
            <div className="menu-account-name-field">
              <div className="menu-account-name-emoji-fieid">
                <p className="menu-account-name">{currentUser.displayName}</p>
                <p className="menu-emoji-status">Set Emoji Status</p>
              </div>
              <div
                className="menu-account-name-field-icon"
                style={{ transform: `rotate(${rotateValue}deg)` }}
                onClick={onClickExpandMoreIconHandler}
              >
                <ExpandMoreIcon fontSize="large" color="inherit" />
              </div>
            </div>
          </div>
          <div
            className="menu-buttons"
            style={{ transform: `translateY(-${hiddenValue}px)` }}
          >
            <div className="menu-btn-add-contact-and-logout-field">
              <div className="add-contact-field" onClick={onClickAddContact}>
                <div className="btn-add-contact">+</div>
                <p className="btn-add-contact-text">Add contact</p>
              </div>
              <div className="logout-field" onClick={() => signOut(auth)}>
                <div className="logout-icon">
                  <LogoutIcon />
                </div>
                <p className="logout-text">Log out</p>
              </div>
            </div>
            <div className="menu-button">
              <div className="btn-icon clr-blue">
                <GroupIcon color="inherit" fontSize="large" />
              </div>
              <p className="btn-name">New Group</p>
            </div>
            <div className="menu-button">
              <div className="btn-icon clr-yellow">
                <CampaignIcon color="inherit" fontSize="large" />
              </div>
              <p className="btn-name">New Channel</p>
            </div>
            <div className="menu-button">
              <div className="btn-icon clr-red">
                <PersonIcon color="inherit" fontSize="large" />
              </div>
              <p className="btn-name">Contacts</p>
            </div>
            <div className="menu-button">
              <div className="btn-icon clr-green">
                <LocalPhoneIcon color="inherit" fontSize="large" />
              </div>
              <p className="btn-name">Calls</p>
            </div>
            <div className="menu-button">
              <div className="btn-icon clr-blue">
                <BookmarkIcon color="inherit" fontSize="large" />
              </div>
              <p className="btn-name">Saved Messages</p>
            </div>
            <div className="menu-button">
              <div className="btn-icon clr-violet">
                <SettingsIcon color="inherit" fontSize="large" />
              </div>
              <p className="btn-name">Settings</p>
            </div>
            <div className="menu-button">
              <div className="btn-icon clr-indigo">
                <BedtimeIcon color="inherit" fontSize="large" />
              </div>
              <div className="btn-night-mode-field">
                <p className="btn-name">Night Mode</p>
                <Switch {...label} />
              </div>
            </div>
          </div>
          <div className="app-version-field">
            <p className="app-version-name">Telegram Clone</p>
            <p className="app-version-number">Made by Khusainov Daler</p>
          </div>
        </div>
        <div className="empty-menu" onClick={handleMenuClose}></div>
      </div>
    </>
  );
};
