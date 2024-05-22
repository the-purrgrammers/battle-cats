import "../styles/index.css";
import io from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
const socket = io.connect(URL);

import { useEffect, useState } from "react"
import EndTurnButton from "../Components/EndTurnButton"
import OpponentShipMap from "../Components/OpponentShipMap"
import PlayerShipMap from "../Components/PlayerShipMap"
import WinLoseScreen from "../Components/WinLoseScreen";

const GamePage = () => {
  const [playerId, setPlayerId] = useState("");
  const [turn, setTurn] = useState("");
  const [oppId, setOppId] = useState();
  const [oppGameState, setOppGameState] = useState([]);
  const [myGameState, setMyGameState] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [msg, setMsg] = useState('');
  const [winnerId, setWinnerId] = useState(null);

  socket.on("updatedTurn", (data) => {
    setMsg("");
    console.log(`DATA WINNERID`, data.winnerId)
    console.log(data)
    if (data.winnerId) {
      setWinnerId(data.winnerId);
    }
    const currentIndex = data.gameState.length - 1;
    const newGame = data.gameState[currentIndex];
    const newTurn = newGame.turn;
    setTurn(newTurn);
    setOppGameState(newGame[oppId]);
    setMyGameState(newGame[playerId]);
    if (data.msg) {
      setMsg(data.msg);
    }
  });

  useEffect(() => {
    const isPlayingAs = sessionStorage.getItem("player");
    if (!isPlayingAs) {
      socket.emit("joinRoom", "gameRoom");
      socket.on("assignPlayer", (data) => {
        if (data.player === "p1") {
          sessionStorage.setItem("player", "p1");
          setPlayerId("p1");
          setOppId("p2");
        } else {
          sessionStorage.setItem("player", "p2");
          setPlayerId("p2");
          setOppId("p1");
        }
      });
    } else {
      setPlayerId(isPlayingAs);
      const opponent = isPlayingAs === "p1" ? "p2" : "p1";
      setOppId(opponent);
      socket.emit("joinRoom", "gameRoom");
    }
  }, []);

  useEffect(() => {
    const fetchInitGameState = async () => {
      try {

        //HAVE TO SORT OUT THIS LINK WITH PROXY 
        const response = await fetch(`api/game`);
        const result = await response.json();
        const board = result.gameState;
        const currentTurn = board[board.length - 1].turn;

        //TODO: get the turn
        setTurn(currentTurn);
        setOppGameState(board[board.length - 1][oppId]);
        setMyGameState(board[board.length - 1][playerId]);
      } catch (error) {
        console.error("CANT GET YOUR GAME:", error);
      }
    };
    fetchInitGameState();
  }, [oppId])

  return (
    <>
   
      {

        winnerId === null ? (
          <>
             {
        turn !== playerId ?
          <span className='waiting-message'>Waiting on your opponent...</span> :
          <span className='waiting-message'>Your Turn!</span>
      }
      {
        !msg ? "" :
          msg &&
            playerId === "p1" ?
            <span className="sunk-ship-message">{msg.p1}</span> :
            <span className="sunk-ship-message">{msg.p2}</span>
      }
            <div id="double-grid-container">
              <OpponentShipMap
                oppGameState={oppGameState}
                setSelectedTile={setSelectedTile}
                selectedTile={selectedTile}
                turn={turn}
                playerId={playerId}
              />
              <EndTurnButton
                selectedTile={selectedTile}
                setSelectedTile={setSelectedTile}
                setMsg={setMsg}
                setWinnerId={setWinnerId}
              />
              <PlayerShipMap myGameState={myGameState} /> 
            </div>
          </>

        ) : (
          <WinLoseScreen playerId={playerId} winnerId={winnerId}/>
        )
      }
    </>
  );
};

export default GamePage;
