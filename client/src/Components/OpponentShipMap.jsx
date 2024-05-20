import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/oppGame.css"
import EndTurnButton from "./EndTurnButton";


const OpponentShipMap = ({oppGameState, playerId, turn}) => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedGridItem, setSelectedGridItem] = useState(null)
 if (!oppGameState) {
    return <h2>LOADING...</h2>
  }
// changes selectedTile in useState onClick
  const handleClick = (e, gridItem) => {
    const divId = e.target.id;
    setSelectedTile(divId)
    setSelectedGridItem(gridItem);
  }

    //NOTE: SORT OUT KEY PROPS WHEN THERE ARE ID's COMING IN
  return (
    <>
    <div className="grid-container">
    <h1>OPPONENT CAT MAP</h1>
      {oppGameState.map((gameRow, rowId) => (
        <div key={rowId} className="grid-row">
          {gameRow.map((gridItem, itemId) => (
            <div 
             key={`${rowId}${itemId}`} 
             id={`${rowId}${itemId}`} 
             className={`${rowId}${itemId}` === selectedTile ? "selected-grid-item" : "grid-item"} 
             onClick={(e) =>{
              if (turn === playerId){
                handleClick(e, gridItem)
              }
              }}>?
            </div>
          ))}
        </div>
      ))}
    </div>
    <div>
      <EndTurnButton selectedGridItem={selectedGridItem} selectedTile={selectedTile} setSelectedTile={setSelectedTile} playerId={playerId}/>
    </div>
    </>
  )
}

export default OpponentShipMap