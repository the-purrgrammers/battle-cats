import { useState, useEffect } from "react";
import Ship from "./Ship";
import "../styles/setBoard.css";


const SetBoard = ({ playerId, fetchInitGameState }) => {
  const [board, setBoard] = useState(Array(10).fill(Array(10).fill(0)));
  const [direction, setDirection] = useState("horizontal");
  const [shipsToPlace, setShipsToPlace] = useState(["A", "B", "C", "D", "E"]);
  const [waitingMessage, setWaitingMessage] = useState("");

  const shipDetails = {
    A: { length: 5, color: "rgb(252, 189, 0)" },
    B: { length: 4, color: "rgb(98, 158, 38)" },
    C: { length: 3, color: "rgba(9, 46, 230, 0.927)" },
    D: { length: 3, color: "rgb(172, 53, 150)" },
    E: { length: 2, color: "rgb(239, 239, 16)" },
  };

  const handleFlip = () => {
    const newDirection = direction === "horizontal" ? "vertical" : "horizontal";
    setDirection(newDirection);
  };

  const handleDrop = (e, droppedRow, droppedColumn) => {
    e.preventDefault();
    //dataTransfer is how we store the shipType ("A") in the dragged object
    const type = e.dataTransfer.getData("text/plain");
    const { length } = shipDetails[type];

    //prevent a piece from hanging over the board
    if (direction === "horizontal" && droppedColumn + length > 10) return;
    if (direction === "vertical" && droppedRow + length > 10) return;

    //prevent overlapping pieces
    for (let i = 0; i < length; i++) {
      if (
        direction === "horizontal" &&
        board[droppedRow][droppedColumn + i] !== 0
      )
        return;
      if (
        direction === "vertical" &&
        board[droppedRow + i][droppedColumn] !== 0
      )
        return;
    }

    //once you drop a ship, map over board state and change the values in the appropriate cells.
    //changing starts from the cell the mouse was over, and goes horizontal/vertical based on direction
    //it goes for the length of the ship, provided by the shipDetails
    const newBoard = board.map((row, rowIdx) =>
      row.map((gridItem, gridIdx) => {
        if (direction === "horizontal") {
          if (
            rowIdx === droppedRow &&
            gridIdx >= droppedColumn &&
            gridIdx < droppedColumn + length
          ) {
            return type;
          }
        } else {
          if (
            gridIdx === droppedColumn &&
            rowIdx >= droppedRow &&
            rowIdx < droppedRow + length
          ) {
            return type;
          }
        }
        return gridItem;
      })
    );
    setBoard(newBoard);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    board.map((row) => {
      return row.map((gridCell) => {
        if (shipsToPlace.includes(gridCell)) {
          const remainingShips = shipsToPlace.filter(
            (ship) => ship !== gridCell
          );
          setShipsToPlace(remainingShips);
        }
      });
    });
  }, [board]);

  const handleReset = () => {
    setBoard(Array(10).fill(Array(10).fill(0)));
    setShipsToPlace(["A", "B", "C", "D", "E"]);
  };

  //place the board state in and object under the property that is your identity,
  //and create a game/ add your board to the existing game
  const handleSubmit = () => {
    const room = sessionStorage.getItem("room");
    if (shipsToPlace.length === 0) {
      setWaitingMessage("Waiting on your opponent to set their board");
      let initialBoard;
      if (playerId === "p1") {
        initialBoard = { p1: board };
      } else {
        initialBoard = { p2: board };
      }
      fetchInitGameState(initialBoard);
    } else {
      alert("You must place all ships before submitting");
    }
  };

  return (
    <div id="grid-and-h2-cont">
      <h2>place your cats</h2>
      <div id="grid-cont">
        {waitingMessage && <p className="waiting-message">{waitingMessage}</p>}
        {board.map((gameRow, rowId) => {
          return (
            <div key={rowId} className="grid-row">
              {gameRow.map((gridItem, itemId) => {
                return (
                  <div
                    key={`${rowId}${itemId}`}
                    id={`${rowId}${itemId}`}
                    className="grid-item"
                    onDrop={(e) => handleDrop(e, rowId, itemId)}
                    onDragOver={handleDragOver}
                    style={{
                      backgroundColor:
                        gridItem !== 0
                          ? `${shipDetails[gridItem].color}`
                          : "rgb(251, 238, 224)",
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      {!waitingMessage && (
        <div id="set-board-btn-cont">
          <button className="set-board-btn" onClick={handleFlip}>flip cats</button>
          <button className="set-board-btn" onClick={handleReset}>reset rug</button>
          <button className="set-board-btn" onClick={handleSubmit}>submit your rug</button>
        </div>
      )}
      <div className="ship-container">
        {shipsToPlace.map((ship, idx) => (
          <Ship
            key={idx}
            type={shipsToPlace[idx]}
            direction={direction}
            shipDetails={shipDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default SetBoard;
