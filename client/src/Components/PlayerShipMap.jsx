import { useState } from "react"
import "../styles/oppGame.css"


const PlayerShipMap = () => {
  const [oppGameState, setOppGameState] = useState([]);

  if (!oppGameState) {
    return <h2>LOADING...</h2>
  }
    //NOTE: SORT OUT KEY PROPS WHEN THERE ARE ID's COMING IN
  return (
    <>
    <div className="grid-container">
    <h1>PLAYER CAT MAP</h1>
      {oppGameState.map(gameRow => (
        <div className="grid-row">
          {gameRow.map(gridItem => (
            <div className="grid-item">--{gridItem}--</div>
          ))}
        </div>
      ))}
    </div>
    </>
  )
}

export default PlayerShipMap