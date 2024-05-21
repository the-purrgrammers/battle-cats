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

const updateGame = async (selectedTile, id) => {
  //get the game from the db
  const data = await prisma.game.findFirst({
    where: {
      id,
    },
  });
  //parse the game, grab the most recent object in gamestate
  const game = JSON.parse(data.gameState);
  const prevState = game[game.length - 1];
  //clone the most recent entry
  const currentState = structuredClone(prevState);

  const currentPlayer = currentState.turn;
  const boardToChange =
    currentPlayer === "p1" ? currentState.p2 : currentState.p1;
  const opponent = currentPlayer === "p1" ? "p2" : "p1";

  //for comparison
  const shipLength = {
    A: 5,
    B: 4,
    C: 3,
    D: 3,
    E: 2,
  };
  
  let msg;
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

    if (shipsSunk.length === 5) {
      endGame();
    }
  };

  let winnerId = null;
  let loserId = null;
  const endGame = () => {
    winnerId = currentPlayer === "p1" ? 1 : 2;
    loserId = winnerId === 1 ? 2 : 1;
    if (winnerId === 1) {
      msg = { p1: "YOU WIN!", p2: "YOU LOST!" };
    } else {
      msg = { p2: "YOU WIN!", p1: "YOU LOST!" };
    }
  };

  const row = parseInt(selectedTile[0]);
  const col = parseInt(selectedTile[1]);
  const valueToChange = boardToChange[row][col];

  if (typeof valueToChange !== "number") {
    boardToChange[row][col] = valueToChange.toLowerCase();
    const shipType = valueToChange;

    updateShipsHitAndSunk(shipType);
  } else {
    boardToChange[row][col] = 1;
  }
  //update the turn and tile properties of the current gamestate object
  currentState.turn = opponent;
  currentState.selectedTile = selectedTile;
  // push it to the gamestate array
  game.push(currentState);

  try {
    const updatedGame = await prisma.game.update({
      where: {
        id,
      },
      data: {
        gameState: JSON.stringify(game),
        winnerId,
        loserId
      },
    });
    if (msg) {
      updatedGame.msg = msg;
    }
    return updatedGame;
  } catch (error) {
    console.error("error updating game in db", error);
  }
};


module.exports = { getGame, updateGame };
