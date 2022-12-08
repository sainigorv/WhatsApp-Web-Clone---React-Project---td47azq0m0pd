import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import "./css/sidebar.css";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const toggleChatClick = () => {
    alert("Few Function are still in progress");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <IconButton>
          <Avatar src={user.photoURL} />
        </IconButton>

        <div className="sidebar__headerRight">
          <IconButton>
            <LogoutIcon onClick={(e) => firebase.auth().signOut()} />
          </IconButton>

          <IconButton>
            <ChatIcon onClick={toggleChatClick} />
          </IconButton>

          <IconButton>
            <MoreVertIcon onClick={toggleChatClick} />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input type="text" placeholder="Search or Start a new Chat" />
        </div>
      </div>
      <div className="sidebar__chatList">
        <SidebarChat addnewchat />
        {rooms.map((room) => {
          return (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
