import { useState, useEffect } from "react";
import "../styles/oppGame.css";

const tileClasses = {
  A: "carrier",
  a: "carrier hit",
  B: "battleship",
  b: "battleship hit",
  C: "cruiser",
  c: "cruiser hit",
  D: "sub",
  d: "sub hit",
  E: "destroyer",
  e: "destroyer hit",
  0: "ocean",
  1: "miss",
};

const PlayerShipMap = ({ myGameState }) => {
  if (!myGameState) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <div className="grid-container">
        <h1>PLAYER CAT MAP</h1>
        {myGameState.map((gameRow, rowId) => (
          <div key={rowId} className="grid-row">
            {gameRow.map((gridItem, itemId) => (
              <div
                key={`${rowId}${itemId}`}
                className={`${tileClasses[gridItem]} grid-item`}
              >
                {}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayerShipMap;
