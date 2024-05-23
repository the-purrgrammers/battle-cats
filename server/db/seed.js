const { prisma } = require("./index.js");

const createInitialPlayer = async (username) => {
  try {
    await prisma.user.create({
      data: {
        username,
      },
    });
  } catch (error) {
    console.error("error creating inital players", error);
  }
};
// resetting: setGameState([...gameState, newState])
//accessing: gameState[gameState.length-1].p1[1][3]
const initialBoard = [
  {
    turn: "p1",
    selectedTile: "",
    p1: [
      ["A", 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["A", 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["A", 0, 0, 0, 0, 0, "C", "C", "C", 0],
      ["A", 0, 0, 0, "B", 0, 0, 0, 0, 0],
      ["A", 0, 0, 0, "B", 0, 0, 0, 0, 0],
      [0, 0, "E", "E", "B", 0, 0, 0, 0, 0],
      [0, 0, 0, 0, "B", 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, "D", "D", "D", 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    p2: [
      ["A", "A", "A", "A", "A", 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, "D", "D", "D", 0, "E"],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, "E"],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, "C", 0, 0, 0, 0, 0, 0, 0],
      [0, 0, "C", 0, 0, 0, 0, 0, 0, 0],
      [0, 0, "C", 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, "B", "B", "B", "B"],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],

    p1ShipsHit: { A: 0, B: 0, C: 0, D: 0, E: 0 },
    p2ShipsHit: { A: 0, B: 0, C: 0, D: 0, E: 0 },

    p1ShipsSunk: [],
    p2ShipsSunk: [],
  },
];

const createInitialGame = async () => {
  await prisma.game.create({
    data: {
      playerOneId: 1,
      playerTwoId: 2,
      room: "generic",
      gameState: JSON.stringify(initialBoard),
    },
  });
};

const seed = async () => {
  console.log("starting seed");
  console.log("creating players");
  await createInitialPlayer("Player One");
  await createInitialPlayer("Player Two");
  console.log("players created, creating initial game");
  await createInitialGame();
  console.log("inital game created");
  console.log("seed complete");
};

seed();
