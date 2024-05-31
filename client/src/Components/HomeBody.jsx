import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeSocket } from "../socket";
import logoExplosion from "../assets/logo-explosion-rectangle.png";
const socket = initializeSocket();

const HomeBody = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [waitingMessage, setWaitingMessage] = useState("");

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

    socket.on("shareAllRooms", (allRooms) => {
      setRooms(allRooms);
    });

    socket.on("getRooms", (rooms) => {
      setRooms(rooms);
    });

    // Event listener to remove room when it is full
    socket.on("removeRoom", (room) => {
      setRooms((prevRooms) => prevRooms.filter((r) => r !== room));
    });

    socket.on("beginGame", (room) => {
      if (room) {
        setWaitingMessage("");
        navigate("/game");
      }
    });

    //event listener for assigning a player id
    socket.on("assignPlayer", (data) => {
      if (data.player === "p1") {
        sessionStorage.setItem("player", "p1");
      } else {
        sessionStorage.setItem("player", "p2");
      }
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off("shareRoom");
      socket.off("shareAllRooms");
      socket.off("removeRoom");
      socket.off("beginGame");
      socket.off("assignPlayer");
    };
  }, [socket]);

  //use the sockets to share your newly created room with others
  const handleCreate = (e) => {
    e.preventDefault();
    if (!roomName) {
      alert("Your room name cannot be empty");
      return;
    }
    if (rooms.includes(roomName)) {
      alert("This room already exists. please choose a new name");
      setRoomName("");
      return;
    }
    if (roomName.length > 20) {
      alert("Please create a room name that is shorter than 20 characters");
      setRoomName("");
      return;
    }
    setRooms([...rooms, roomName]);
    socket.emit("addRoom", roomName);
    setRoomName("");
  };

  const handleLeaveRoom = () => {
    const roomToLeave = sessionStorage.getItem("room");
    sessionStorage.removeItem("room");
    setWaitingMessage("");
    socket.emit("leaveRoom", roomToLeave);
  };

  return (
    <div>
      <section className="homeMainSection">
        <div id="logo-cont">
          <img id="logoExplosion" src={logoExplosion}></img>
        </div>
        {!waitingMessage && (
          <>
            <h3>join a room:</h3>
            {/* map out the room array displaying a button for each room that will join you to that room 
        and nav you to the gamepage */}
            <ul className="roomsListCont">
              {rooms.map((room, idx) => (
                <li key={idx}>
                  <button
                    className="createButton"
                    key={idx}
                    onClick={() => {
                      socket.emit("joinRoom", room);
                      sessionStorage.clear();
                      sessionStorage.setItem("room", room);
                      setWaitingMessage(
                        "waiting for a friend to join your room"
                      );
                    }}
                  >
                    {room}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
        {!waitingMessage && (
          <>
            <h3>create a room:</h3>
            <form onSubmit={handleCreate}>
              <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="room name"
              />
              <button className="createButton" type="submit">
                create
              </button>
            </form>
          </>
        )}
        {waitingMessage && (
          <div>
            <p className="waitingMsg">{waitingMessage}</p>
            <button className="leaveButton" onClick={handleLeaveRoom}>
              leave room
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomeBody;
