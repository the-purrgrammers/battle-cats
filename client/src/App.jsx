import { useState, useEffect } from 'react'
import io from 'socket.io-client'
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

const socket = io.connect(URL)


function App() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setResponse(data)
    })
  }, [])

  const handleMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", message)
  }
  return (
    <>
      <form onSubmit={handleMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>send message</button>
      </form>
      {
        response &&
        <p>{response}</p>
        
      }
    </>
  )
}

export default App
