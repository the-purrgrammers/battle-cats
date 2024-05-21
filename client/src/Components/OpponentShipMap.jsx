import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/oppGame.css"
import EndTurnButton from "./EndTurnButton";

const OpponentShipMap = ({ oppGameState, setSelectedTile, selectedTile, turn, playerId }) => {

const hitShips = ["a","b","c","d","e"]
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
              <div key={`${rowId}${itemId}`}
               id={`${rowId}${itemId}`} 
               className={`${rowId}${itemId}` === selectedTile ? "selected-grid-item" : (hitShips.includes(gridItem)) ? "grid-item hit" : (gridItem === 1) ? "grid-item miss" :  "grid-item" }
                onClick={(e) => {
               if(turn === playerId){
                setSelectedTile(e.target.id)}
               }
              }></div>
            ))}
          </div>
        ))}
      </div>

    </>
  )
}

export default OpponentShipMap