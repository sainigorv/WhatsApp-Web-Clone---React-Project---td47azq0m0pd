import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./css/sidebar.css";
import db from "./firebase";

function SidebarChat({ id, name, addnewchat }) {
  const [seed, setSeed] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("message")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setLastMessage(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);
  const createChat = () => {
    const room = prompt("Please enter room name");
    if (room) {
      db.collection("rooms").add({
        name: room,
      });
    }
  };
  const deleteRoom = () => {
    db.collection("rooms").doc(id).delete();
  };

  const updateRoom = () => {
    db.collection("rooms")
      .doc(id)
      .update({ name: prompt("Edit Name of Room") });
  };

  return !addnewchat ? (
    <Link className="links" to={`/room/${id}`}>
      <div className="sidebar__chat">
        <div className="Avatar__chatinfo">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="sidebar__chatInfo">
            <h2>{name}</h2>
            <p>{lastMessage[0]?.message}</p>
          </div>
        </div>
        <div className="delete__message">
          <IconButton>
            <DeleteIcon onClick={deleteRoom} />
          </IconButton>
          <IconButton>
            <EditIcon onClick={updateRoom} />
          </IconButton>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebar__chat" onClick={createChat}>
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
