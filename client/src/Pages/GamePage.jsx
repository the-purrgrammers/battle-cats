import "../styles/index.css";
import { initializeSocket } from "../socket";
const socket = initializeSocket()

import { useEffect, useState } from "react"
import EndTurnButton from "../Components/EndTurnButton"
import OpponentShipMap from "../Components/OpponentShipMap"
import PlayerShipMap from "../Components/PlayerShipMap"
import WinLoseScreen from "../Components/WinLoseScreen";
import SetBoard from "../Components/SetBoard";

const GamePage = () => {
  const [playerId, setPlayerId] = useState("");
  const [turn, setTurn] = useState("");
  const [oppId, setOppId] = useState();
  const [oppGameState, setOppGameState] = useState([]);
  const [myGameState, setMyGameState] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [msg, setMsg] = useState('');
  const [winnerId, setWinnerId] = useState(null);
  // const [gameCreated, setGameCreated] = useState(false)
  const [gameId, setGameId] = useState('')
  console.log("playerId", playerId)
  console.log("gameId", gameId)
  console.log("oppboard", oppGameState)
  console.log("myboard", myGameState)
  console.log("turn", turn)


  socket.on("receiveBoardAndTurn", (board, turn) => {
    setOppGameState(board[board.length - 1][oppId]);
    setTurn(turn)
  })

  socket.on("updatedTurn", (data) => {
    setMsg("");
    if (data.winnerId) {
      setWinnerId(data.winnerId);
    }
    const currentIndex = data.gameState.length - 1;
    const newGame = data.gameState[currentIndex];
    const newTurn = newGame.turn;
    console.log("inthe update", newTurn)
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
      const room = sessionStorage.getItem("room")
      socket.emit("joinRoom", room)
      const opponent = isPlayingAs === "p1" ? "p2" : "p1";
      setOppId(opponent);
    }
    const id = sessionStorage.getItem("gameId")
    if (id) {
      setGameId(id)
    }
  }, []);


  const fetchInitGameState = async (initialBoard) => {
    const room = sessionStorage.getItem("room")
    try {
      //HAVE TO SORT OUT THIS LINK WITH PROXY
      const response = await fetch(`api/game/createGame`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          initialBoard,
          room
        })
      });

      const result = await response.json();
      const board = JSON.parse(result.gameState)
      const currentTurn = board[board.length - 1].turn;
      const myBoard = board[board.length - 1][playerId]
      setTurn(currentTurn);
      setMyGameState(myBoard);
      setGameId(result.id)
      sessionStorage.setItem("gameId", result.id)
      socket.emit("shareBoardAndTurn", board, currentTurn, room)
    } catch (error) {
      console.error("CANT GET YOUR GAME:", error);
    }
  }




  return (
    <>
      {gameId ? (
        winnerId === null ? (
          <>
            {turn !== playerId ? (
              <span className="waiting-message">Waiting on your opponent...</span>
            ) : (
              <span className="waiting-message">Your Turn!</span>
            )}
            {!msg ? (
              ""
            ) : msg && playerId === "p1" ? (
              <span className="sunk-ship-message">{msg.p1}</span>
            ) : (
              <span className="sunk-ship-message">{msg.p2}</span>
            )}
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
              gameId={gameId}
              setTurn={setTurn}
              setMyGameState={setMyGameState}
            />
            <PlayerShipMap myGameState={myGameState} />
          </>
        ) : (
          <WinLoseScreen playerId={playerId} winnerId={winnerId} />
        )
      ) : (
        <SetBoard playerId={playerId}
          fetchInitGameState={fetchInitGameState}
        />
      )}
    </>
  );
}

export default GamePage;
