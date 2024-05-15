import { useState, useEffect } from 'react'
//io import and socket connection
import io from 'socket.io-client'
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
const socket = io.connect(URL);
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import GamePage from './Pages/GamePage';

function App() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [room, setRoom] = useState('')
  const [displayRoomNumber, setDisplayRoomNumber] = useState('')

  // receives messages from the server
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setResponse(data)
    })
  }, [])

  //assign yourself a room
  const handleJoin = (e) => {
    e.preventDefault()
    socket.emit("joinRoom", room)
    //display the number of the room you've joined
    setDisplayRoomNumber(room)
  }

  //sends messages to the server
  const handleMessage = (e) => {
    e.preventDefault()
    //send an object containing both the message and your room number
    socket.emit("sendMessage", { message, room })
  }
  return (
    <>
      <form onSubmit={handleJoin}>
        <input type="number"
          placeholder='room number'
          onChange={(e) => setRoom(e.target.value)}
        />
        <button>Join</button>
      </form>
      <form onSubmit={handleMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>send message</button>
      </form>
      {
        displayRoomNumber &&
        <p>in room {room}</p>
      }
      {
        response &&
        <p> message: {response}</p>

      }

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/game" element={<GamePage />}></Route>
      </Routes>
    </>
  )
}

export default App
