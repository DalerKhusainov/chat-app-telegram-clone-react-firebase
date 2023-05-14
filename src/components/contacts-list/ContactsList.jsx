import React from "react";
import "./contacts-list.styles.scss";
import { Contacts } from "../contact/Contact";

export const ContactsList = () => {
  return (
    <div className="contacts-list">
      <Contacts />
    </div>
  );
};
