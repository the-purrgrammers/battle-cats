import { useState } from "react"
import "../styles/oppGame.css"


const PlayerShipMap = () => {
  const [oppGameState, setOppGameState] = useState([    
  ["A", "A", "A", "A", "A", 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, "C", "C", "C", 0],
  [0, 0, 0, 0, "B", 0, 0, 0, 0, 0],
  [0, 0, 0, 0, "B", 0, 0, 0, 0, 0],
  [0, 0, "E", "E", "B", 0, 0, 0, 0, 0],
  [0, 0, 0, 0, "B", 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, "D", "D", "D", 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
);

  if (!oppGameState) {
    return <h2>LOADING...</h2>
  }
  return (
    <>
    <div className="grid-container">
    <h1>PLAYER CAT MAP</h1>
      {oppGameState.map((gameRow, rowId) => (
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