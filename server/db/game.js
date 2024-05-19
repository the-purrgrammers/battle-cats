const { prisma } = require("./index.js");

const getGame = async (id) => {
  try {
    const currentGame = await prisma.game.findFirst({
      where: {
        id,
      },
    });
    return currentGame;
  } catch (error) {
    console.error("error fetching game for db", error);
  }
};

const updateGame = async (data) => {
  if (data.msg) {
    delete data.msg;
  }
  let msg;
  const currentState = data.gameState[data.gameState.length - 1];
  const currentPlayer = currentState.turn;
  const boardToChange =
    currentPlayer === "p1" ? currentState.p2 : currentState.p1;
  const opponent = currentPlayer === "p1" ? "p2" : "p1";
  const tile = currentState.selectedTile;

  const shipLength = {
    A: 5,
    B: 4,
    C: 3,
    D: 3,
    E: 2,
  };

  const updateShipsHitAndSunk = (shipType) => {
    const shipsHit =
      opponent === "p1" ? currentState.p1ShipsHit : currentState.p2ShipsHit;
    const shipsSunk =
      opponent === "p1" ? currentState.p1ShipsSunk : currentState.p2ShipsSunk;

    if (shipsHit[shipType]) {
      shipsHit[shipType]++;
    } else {
      shipsHit[shipType] = 1;
    }

    if (shipsHit[shipType] === shipLength[shipType]) {
      shipsSunk.push(shipType);
      if (currentPlayer === "p1") {
        msg = { p1: "You sunk a ship!", p2: "Your ship has sunk!" };
      } else {
        msg = { p2: "You sunk a ship!", p1: "Your ship has sunk!" };
      }
    }

    if (shipsSunk.length === 5){
      endGame();
    }
  };

  const endGame = () => {
    const winner = currentPlayer === "p1" ? 1 : 2;
    const loser = winner === 1 ? 2 : 1;
    data.winnerId = winner;
    data.loserId = loser;
    if (winner === "p1") {
      msg = { p1: "YOU WIN!", p2: "YOU LOST!" };
    } else {
      msg = { p2: "YOU WIN!", p1: "YOU LOST!" };
    }
  };

  const row = parseInt(tile[0]);
  const col = parseInt(tile[1]);
  const valueToChange = boardToChange[row][col];

  if (typeof valueToChange !== "number") {
    boardToChange[row][col] = valueToChange.toLowerCase();
    const shipType = valueToChange;
    updateShipsHitAndSunk(shipType);
  } else {
    boardToChange[row][col] = 1;
  }

  try {
    const updatedGame = prisma.game.update({
      where: {
        id: data.id,
      },
      data,
    });
    if (msg) {
      updatedGame.msg = msg;
    }
    return updatedGame;
    //alert the websocket that theres new state for opponent
  } catch (error) {
    console.error("error updating game in db", error);
  }
};

module.exports = { getGame, updateGame };
