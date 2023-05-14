import React, { useState } from "react";
import { MenuSidebar } from "../../components/menu-sidebar/MenuSidebar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Chat } from "../../components/chat/Chat";
import "./home.style.scss";

export const Home = () => {
  const [menuCloseValue, setMenuCloseValue] = useState("100");

  const handleMenuClose = () => {
    if (menuCloseValue === "0") setMenuCloseValue("100");
    else setMenuCloseValue("0");
  };

  return (
    <div className="home">
      <div className="container">
        <MenuSidebar
          menuCloseValue={menuCloseValue}
          handleMenuClose={handleMenuClose}
          setMenuCloseValue={setMenuCloseValue}
        />
        <Sidebar handleMenuClose={handleMenuClose} />
        <Chat />
      </div>
    </div>
  );
};
