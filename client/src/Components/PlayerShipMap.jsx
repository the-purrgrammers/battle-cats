import { useState, useEffect } from "react"
import "../styles/oppGame.css"


const PlayerShipMap = ({playerId}) => {
  const [myGameState, setMyGameState] = useState([]);
  
  useEffect(() => {
    const fetchInitGameState = async () => {
      try {
       
        //HAVE TO SORT OUT THIS LINK WITH PROXY 
        const response = await fetch(`http://localhost:3000/game`);
        const result = await response.json();
        const myBoard = result.gameState;
        console.log(myBoard[myBoard.length - 1][playerId])
        setMyGameState(myBoard[myBoard.length - 1][playerId])
      } catch (error) {
        console.error("CANT GET YOUR GAME:", error)
      }
    }
    fetchInitGameState();
  }, [playerId])

  if (!myGameState) {
    return <h2>LOADING...</h2>
  }
  return (
    <>
    <div className="grid-container">
    <h1>PLAYER CAT MAP</h1>
      {myGameState.map((gameRow, rowId) => (
        <div key={rowId} className="grid-row">
          {gameRow.map((gridItem, itemId) => (
            <div key={`${rowId}${itemId}`} className="grid-item">--{gridItem}--</div>
          ))}
        </div>
      ))}
    </div>
    </>
  )
}

export default PlayerShipMap