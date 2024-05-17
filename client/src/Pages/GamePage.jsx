import io from 'socket.io-client'
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
const socket = io.connect(URL, { transports : ['websocket'] });
import { useEffect, useState } from "react"
import EndTurnButton from "../Components/EndTurnButton"
import OpponentShipMap from "../Components/OpponentShipMap"
import PlayerShipMap from "../Components/PlayerShipMap"


const GamePage = () => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [playerId, setPlayerId] = useState();
  const [oppId, setOppId] = useState();
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
  
  

  return (
    <>
      <h1>Game Page</h1>
      <OpponentShipMap oppId={oppId} selectedTile={selectedTile} setSelectedTile={setSelectedTile}/>
      <EndTurnButton oppId={oppId} playerId={playerId} selectedTile={selectedTile}/>
      <PlayerShipMap playerId={playerId}/>
    </>
  )

}

export default GamePage