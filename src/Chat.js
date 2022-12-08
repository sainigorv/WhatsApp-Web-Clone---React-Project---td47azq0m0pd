import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import "./css/chat.css";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import MicIcon from "@mui/icons-material/Mic";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
function Chat() {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });
      db.collection("rooms")
        .doc(roomId)
        .collection("message")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (input === "") {
      return alert("Please enter your message");
    }
    db.collection("rooms").doc(roomId).collection("message").add({
      name: user.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  const toggleChatClick = () => {
    alert("Few Functions are still in progress");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <IconButton>
          <Avatar src={user.photoURL} />
        </IconButton>
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last Seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="header__right">
          <IconButton>
            <SearchIcon onClick={toggleChatClick} />
          </IconButton>
          <IconButton>
            <AttachFileIcon onClick={toggleChatClick} />
          </IconButton>
          <IconButton>
            <MoreVertIcon onClick={toggleChatClick} />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              user.displayName === message.name && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__time">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <EmojiEmotionsOutlinedIcon onClick={toggleChatClick} />
        <AttachFileIcon onClick={toggleChatClick} />

        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            placeholder="Type your Message"
            onChange={(e) => setInput(e.target.value)}
          />
          <input type="submit" />
        </form>
        <IconButton>
          <MicIcon onClick={toggleChatClick} />
        </IconButton>
        <IconButton>
          <SendIcon className="send" onClick={toggleChatClick} />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
