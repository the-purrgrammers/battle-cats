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


    // Event listener to handle all rooms on new connection
    socket.on("shareAllRooms", (allRooms) => {
      setRooms(allRooms);
    });


    // Event listener to remove room when it is full
    socket.on("removeRoom", (room) => {
      setRooms((prevRooms) => prevRooms.filter((r) => r !== room));
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off("shareRoom");
      socket.off("shareAllRooms");
      socket.off("removeRoom");
    };
  }, [socket]);

  //use the sockets to share your newly created room with others 
  const handleCreate = (e) => {
    e.preventDefault();
    if (!roomName) {
      alert("Your room name cannot be empty")
      return;
    }
    if (rooms.includes(roomName)) {
      alert("This room already exists. please choose a new name")
      setRoomName('');
      return;
    }
    if (roomName.length > 20) {
      alert("Please create a room name that is shorter than 20 characters")
      setRoomName('');
      return;
    }
    setRooms([...rooms, roomName]);
    socket.emit("addRoom", roomName);
    setRoomName('');

  };

  return (
    <section className="homeMainSection">
      <h1>Battle Cats!</h1>
      <h3>Join a room:</h3>
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
      <h3>Create a room:</h3>
      <form onSubmit={handleCreate}>
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Room name" />
        <button type="submit">Create</button>
      </form>
    </section>
  );
};

export default HomeBody;