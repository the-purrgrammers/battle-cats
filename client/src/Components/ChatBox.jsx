import { useState, useEffect } from "react";
import { initializeSocket } from "../socket";
const socket = initializeSocket();

const ChatBox = ({ playerId, curUser }) => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const room = sessionStorage.getItem("room");
    const playerMessage = {};
    playerMessage.player = playerId;
    if(curUser){
      playerMessage.player = curUser.username;
    }
    playerMessage.message = chatMessage;

    socket.emit('sendMessage', playerMessage, room);
    setChatMessage('');
  }


  useEffect(() => {
    socket.on("receivedMessage", (playerMessage) => {
      setChatLog([...chatLog, playerMessage]);
    });
    return () => {
      socket.off("receivedMessage");
    };
  }, [chatLog]);

  return (
    <>
      <div className="chat-box-and-header-container">
        <h2 className="map-h2s" id="chat-h2">
          chat
        </h2>
        <div className="chatComp">
          <ul className="chatWindow">
            {chatLog.map((message, idx) => {
              return (
                <li key={idx}>
                  {message.player}: {message.message}
                </li>
              );
            })}
          </ul>
          <form onSubmit={submitHandler}>
            <input
              id="chat-input"
              value={chatMessage}
              onChange={(e) => {
                setChatMessage(e.target.value);
              }}
            />
            <button id="send-messg-btn">send message</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
