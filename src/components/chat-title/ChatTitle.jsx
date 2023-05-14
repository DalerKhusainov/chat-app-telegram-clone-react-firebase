import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableChartIcon from "@mui/icons-material/TableChart";
import IconButton from "@mui/material/IconButton";
import "./chat-title.styles.scss";
import { ChatContext } from "../../context/ChatContext";

export const ChatTitle = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat-title">
      <div className="chat-title__info">
        <p className="name">{data.user?.displayName}</p>
      </div>
      <div className="chat-title__icons">
        <IconButton>
          <SearchIcon fontSize="large" />
        </IconButton>
        <IconButton>
          <TableChartIcon fontSize="large" />
        </IconButton>
        <IconButton>
          <MoreVertIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};
