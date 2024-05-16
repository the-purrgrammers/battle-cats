const router = require("express").Router();
const { getGame } = require("../db/game");

router.get("/", async (req, res) => {
  try {
    const currentGame = await getGame(1);
    res.status(200).send(currentGame);
  } catch (error) {}
});

module.exports = router;
