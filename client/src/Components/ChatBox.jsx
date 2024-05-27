import { useState, useEffect } from "react";
import { initializeSocket } from "../socket";
const socket = initializeSocket();

const ChatBox = ({playerId}) => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const room = sessionStorage.getItem("room");
    const playerMessage = {};
    playerMessage.player = playerId;
    playerMessage.message = chatMessage;
    socket.emit('sendMessage', playerMessage, room);
    setChatMessage('');
  }

  useEffect(()=>{
    socket.on('receivedMessage', (playerMessage)=> {
      setChatLog([...chatLog, playerMessage]);
    });
    return ()=>{socket.off('receivedMessage')}
  }, [chatLog]);
  

  return (
    <>
      <div className='chatComp'>
        <ul className="chatWindow">
          {chatLog.map((message, idx)=>{
            return <li key={idx}>{message.player}: {message.message}</li>
          })}
        </ul>
        <form onSubmit={submitHandler}>
          <input
            value={chatMessage}
            onChange={(e) => {
              setChatMessage(e.target.value);
            }}
          />
          <button>Send Message</button>
        </form>
      </div>
    </>
  );
};

export default ChatBox;
