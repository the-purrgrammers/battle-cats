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
  //look at the selected tile in thes state
  //match to a place in the array
  //if its zero, turn to 1
  //if its a letter, lowercase it
  //add it to ships hit
  //determine whether it sunk 
  //check if game is won
  
  try {
    const updatedGame = prisma.game.update({
      where: {
        id: data.id,
      },
      data: {},
    });
    return updatedGame;
    //alert the websocket that theres new state for opponent
  } catch (error) {
    console.error("error updating game in db", error);
  }
};

module.exports = { getGame, updateGame };
