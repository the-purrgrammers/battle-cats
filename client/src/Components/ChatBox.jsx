import { useState } from "react";

const ChatBox = ({playerId}) => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    chatLog.push(chatMessage);
    setChatMessage('');
  }

  return (
    <>
      <div className='chatComp'>
        <ul className="chatWindow">
          {chatLog.map((message, idx)=>{
            return <li key={idx}>{playerId}: {message}</li>
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