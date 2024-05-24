import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeSocket } from "../socket";
const socket = initializeSocket();


const HomeBody = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState([]);
  

  useEffect(() => {
    // Event listener to handle shared rooms
    socket.on("shareRoom", (room) => {
      setRooms((prevRooms) => {
        if (!prevRooms.includes(room)) {
          return [...prevRooms, room];
        }
        return prevRooms;
      });
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off("shareRoom");
    };
  }, [socket]);

  //use the sockets to share your newly created room with others 
  const handleCreate = (e) => {
    e.preventDefault();
    if (!rooms.includes(roomName)) {
      setRooms([...rooms, roomName]);
      socket.emit("addRoom", roomName);
      setRoomName('');
    }
  };

  return (
    <section className="homeMainSection">
      <h1>Battle Cats!</h1>
      <h3>join a room:</h3>
      {/* map out the room array displaying a button for each room that will join you to that room 
      and nav you to the gamepage */}
      {
        rooms.map((room, idx) => (
          <button
            key={idx}
            onClick={() => {
              socket.emit("joinRoom", room);
              sessionStorage.setItem("room", room)
              navigate("/game");
            }}>
            {room}
          </button>
        ))
      }
      <h3>create a room:</h3>
      <form onSubmit={handleCreate}>
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="room name" />
        <button type="submit">create</button>
      </form>
    </section>
  );
};

export default HomeBody;