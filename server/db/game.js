const { prisma } = require("./index.js");

const getGame = async (id) => {
  try {
    const currentGame = await prisma.game.findFirst({
      where:{
        id
      }
    })
    return currentGame
  } catch (error) {
    console.error("error fetching game for db", error)
  }
};

module.exports = {getGame}
