import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EndTurnButton from "./EndTurnButton";

const OpponentShipMap = ({
  oppGameState,
  setSelectedTile,
  selectedTile,
  turn,
  playerId,
}) => {
  const hitShips = ["a", "b", "c", "d", "e"];
  if (!oppGameState) {
    return <h2>LOADING...</h2>;
  }

  //NOTE: SORT OUT KEY PROPS WHEN THERE ARE ID's COMING IN
  return (
    <>
      <div className="grid-container">
        <h2 class="map-h2s">your friend's rug</h2>
        <div id="opp-rug">
          {oppGameState.map((gameRow, rowId) => (
            <div key={rowId} className="grid-row">
              {gameRow.map((gridItem, itemId) => (
                <div
                  key={`${rowId}${itemId}`}
                  id={`${rowId}${itemId}`}
                  className={
                    `${rowId}${itemId}` === selectedTile
                      ? "selected-grid-item"
                      : hitShips.includes(gridItem)
                      ? "grid-item hit"
                      : gridItem === 1
                      ? "grid-item miss"
                      : "grid-item"
                  }
                  onClick={(e) => {
                    if (turn === playerId) {
                      setSelectedTile(e.target.id);
                    }
                  }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OpponentShipMap;
