import React from "react";
import "./sidebar.styles.scss";
import { SearchContacts } from "../search-contacts/SearchContacts";
import { ContactsList } from "../contacts-list/ContactsList";

export const Sidebar = ({ handleMenuClose }) => {
  return (
    <div className="sidebar">
      <SearchContacts handleMenuClose={handleMenuClose} />
      <ContactsList />
    </div>
  );
};
