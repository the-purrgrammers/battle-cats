import { useState, useEffect } from "react"
import "../styles/oppGame.css"


const PlayerShipMap = ({myGameState}) => {
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