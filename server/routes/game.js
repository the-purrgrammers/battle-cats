const router = require("express").Router();
const { getGame } = require("../db/game");

router.get("/", async (req, res) => {
  try {
    const currentGame = await getGame(1);
    currentGame.gameState = JSON.parse(currentGame.gameState)
    res.status(200).send(currentGame);
  } catch (error) {}
});

router.get("/:id", async (req, res) => {
  try {
    const inputId = parseInt(req.params.id);
    const gameById = await getGame(inputId)
    res.send(gameById);
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
