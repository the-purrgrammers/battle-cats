import io from 'socket.io-client'
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
const socket = io.connect(URL);
import { useEffect, useState } from "react"
import EndTurnButton from "../Components/EndTurnButton"
import OpponentShipMap from "../Components/OpponentShipMap"
import PlayerShipMap from "../Components/PlayerShipMap"



const GamePage = () => {
  const [playerId, setPlayerId] = useState();
  const [oppId, setOppId] = useState();
  const [oppGameState, setOppGameState] = useState([]);
  const [myGameState, setMyGameState] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", "gameRoom")
    socket.on("assignPlayer", (data) => {
      if (data.player === "p1") {
        setPlayerId('p1')
        setOppId('p2')
      } else {
        setPlayerId('p2')
        setOppId('p1')
      }
    })
  }, [])


  useEffect(() => {
    const fetchInitGameState = async () => {
      try {
        //HAVE TO SORT OUT THIS LINK WITH PROXY 
        const response = await fetch(`http://localhost:3000/game`);
        const result = await response.json();
        console.log(result)
        const board = result.gameState;
        setOppGameState(board[board.length - 1][oppId])
        setMyGameState(board[board.length - 1][playerId])
      } catch (error) {
        console.error("CANT GET YOUR GAME:", error)
      }
    }
    fetchInitGameState();
  }, [oppId])

  return (
    <>
      <h1>Game Page</h1>
      <OpponentShipMap oppGameState={oppGameState} />
      <EndTurnButton />
      <PlayerShipMap myGameState={myGameState} />
    </>
  )

}

export default GamePage