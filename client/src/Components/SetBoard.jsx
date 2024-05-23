import { initializeSocket } from "../socket"
const socket = initializeSocket()
import { useState, useEffect } from "react"
import Ship from "./Ship"

const SetBoard = ({ playerId, setCompletedBoards, completedBoards, fetchInitGameState }) => {
  const [board, setBoard] = useState(Array(10).fill(Array(10).fill(0)))
  const [direction, setDirection] = useState("horizontal")
  const [shipsToPlace, setShipsToPlace] = useState(["A", "B", "C", "D", "E"])
  const [waitingMessage, setWaitingMessage] = useState('')


  const shipDetails = {
    A: { length: 5, color: "rgb(252, 189, 0)" },
    B: { length: 4, color: "rgb(98, 158, 38)" },
    C: { length: 3, color: "rgba(9, 46, 230, 0.927)" },
    D: { length: 3, color: "rgb(172, 53, 150)" },
    E: { length: 2, color: "rgb(239, 239, 16)" }
  }


  const handleFlip = () => {
    const newDirection = direction === "horizontal" ? "vertical" : "horizontal"
    setDirection(newDirection)
  }


  const handleDrop = (e, droppedRow, droppedColumn) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('text/plain');
    const { length } = shipDetails[type];

    if (direction === "horizontal" && droppedColumn + length > 10) return;
    if (direction === "vertical" && droppedRow + length > 10) return;

    for (let i = 0; i < length; i++) {
      if (direction === "horizontal" && board[droppedRow][droppedColumn + i] !== 0) return;
      if (direction === "vertical" && board[droppedRow + i][droppedColumn] !== 0) return;
    }

    const newBoard = board.map((row, rowIdx) =>
      row.map((gridItem, gridIdx) => {
        if (direction === "horizontal") {
          if (rowIdx === droppedRow && gridIdx >= droppedColumn && gridIdx < droppedColumn + length) {
            return type;
          }
        } else {
          if (gridIdx === droppedColumn && rowIdx >= droppedRow && rowIdx < droppedRow + length) {
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
    board.map(row => {
      return row.map(gridCell => {
        if (shipsToPlace.includes(gridCell)) {
          const remainingShips = shipsToPlace.filter(ship => ship !== gridCell)
          setShipsToPlace(remainingShips)
        }
      })
    })
  }, [board])

  const handleReset = () => {
    setBoard(Array(10).fill(Array(10).fill(0)))
    setShipsToPlace(["A", "B", "C", "D", "E"])
  }

  const handleSubmit = () => {
    const room = sessionStorage.getItem("room")
    if (shipsToPlace.length === 0) {
      setWaitingMessage("Waiting on your opponent to set their board")
     let initialBoard
      if (playerId === "p1") {
         initialBoard =  { p1: board }
      } else {
         initialBoard =  { p2: board }
      }
        fetchInitGameState(initialBoard);
    } else {
      alert("You must place all ships before submitting")
    }
  }

  return (
    <div>
      <h1>Set Your Board!</h1>
      {
        waitingMessage &&
        <p className="waiting-message">{waitingMessage}</p>
      }
      {
        board.map((gameRow, rowId) => {
          return (
            <div key={rowId} className="grid-row">
              {
                gameRow.map((gridItem, itemId) => {
                  return (
                    <div
                      key={`${rowId}${itemId}`}
                      id={`${rowId}${itemId}`}
                      className="grid-item"
                      onDrop={(e) => handleDrop(e, rowId, itemId)}
                      onDragOver={handleDragOver}
                      style={{
                        backgroundColor: gridItem !== 0 ?
                          `${shipDetails[gridItem].color}` :
                          'rgb(161, 212, 212)',
                      }}
                    />
                  )
                })
              }
            </div>
          )
        })
      }

      {
        !waitingMessage &&
        <>
          <button onClick={handleFlip}> Flip Cats</button>
          <button onClick={handleReset}>Reset Board</button>
          <button onClick={handleSubmit}>Submit Your Board</button>
        </>
      }

      <div className="ship-container">

        {
          shipsToPlace.map((ship, idx) => (
            <Ship
              key={idx}
              type={shipsToPlace[idx]}
              direction={direction}
              shipDetails={shipDetails} />
          )

          )
        }


      </div>

    </div>
  )
}

export default SetBoard
