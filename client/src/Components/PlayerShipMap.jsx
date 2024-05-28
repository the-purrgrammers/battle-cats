import { useState, useEffect } from "react";

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
    return <h2>loading...</h2>;
  }
  return (
    <>
      <div className="grid-container">
        <h2 className="map-h2s">your rug</h2>
        <div id="my-rug">
          {myGameState.map((gameRow, rowId) => (
            <div key={rowId} className="grid-row">
              {gameRow.map((gridItem, itemId) => (
                <div
                  key={`${rowId}${itemId}`}
                  className={`${tileClasses[gridItem]} grid-item`}
                >
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlayerShipMap;
