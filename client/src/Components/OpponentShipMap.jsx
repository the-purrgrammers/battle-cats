import { useState } from "react"
import "../styles/oppGame.css"


const OpponentShipMap = () => {
  const [oppGameState, setOppGameState] = useState([
    ["A", "A", "A", "A", "A", 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, "D", "D", "D", 0, "E"],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, "E"],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, "C", 0, 0, 0, 0, 0, 0, 0],
    [0, 0, "C", 0, 0, 0, 0, 0, 0, 0],
    [0, 0, "C", 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, "B", "B", "B", "B"],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
  );

  if (!oppGameState) {
    return <h2>LOADING...</h2>
  }
    //NOTE: SORT OUT KEY PROPS WHEN THERE ARE ID's COMING IN
  return (
    <>
    <div className="grid-container">
    <h1>OPPONENT CAT MAP</h1>
      {oppGameState.map((gameRow, rowId) => (
        <div key={rowId} className="grid-row">
          {gameRow.map((gridItem, itemId) => (
            <div key={`${rowId}${itemId}`} className="grid-item">--?--</div>
          ))}
        </div>
      ))}
    </div>
    </>
  )
}

export default OpponentShipMap