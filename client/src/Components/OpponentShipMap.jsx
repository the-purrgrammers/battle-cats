import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/oppGame.css"


const OpponentShipMap = ({oppGameState}) => {
  const [selectedTile, setSelectedTile] = useState(null);
 if (!oppGameState) {
    return <h2>LOADING...</h2>
  }
// changes selectedTile in useState onClick
  const handleClick = (e) => {
    const divId = e.target.id;
    setSelectedTile(divId)
  }

    //NOTE: SORT OUT KEY PROPS WHEN THERE ARE ID's COMING IN
  return (
    <>
    <div className="grid-container">
    <h1>OPPONENT CAT MAP</h1>
      {oppGameState.map((gameRow, rowId) => (
        <div key={rowId} className="grid-row">
          {gameRow.map((gridItem, itemId) => (
            <div key={`${rowId}${itemId}`} id={`${rowId}${itemId}`} className={`${rowId}${itemId}` === selectedTile ? "selected-grid-item" : "grid-item"} onClick={handleClick}>?</div>
          ))}
        </div>
      ))}
    </div>
    </>
  )
}

export default OpponentShipMap