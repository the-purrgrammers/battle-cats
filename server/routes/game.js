const router = require("express").Router();
const { getGame, updateGame, createGame, getListOfUserGames } = require("../db/game");

router.get("/", async (req, res) => {
  try {
    const currentGame = await getGame(1);
    currentGame.gameState = JSON.parse(currentGame.gameState);
    res.status(200).send(currentGame);
  } catch (error) {}
});

router.get("/:userId", async (req, res) => {
  const curUserId = parseInt(req.params);
  try {
    const listOfUserGames = await getListOfUserGames(curUserId)
    res.send(listOfUserGames);
    
  } catch (error) {
    console.log(error)
    
  }
})


router.get("/:id", async (req, res) => {
  try {
    const inputId = parseInt(req.params.id);
    const gameById = await getGame(inputId);
    res.send(gameById);
  } catch (error) {
    console.log(error);
  }
});

router.post("/createGame", async (req, res) => {
  try {
    const newGame = await createGame(req.body.initialBoard, req.body.room);
    res.status(201).send(newGame);
  } catch (error) {
    console.error("error on POST /createGame route", error);
  }
});

router.put("/endturn", async (req, res) => {
  const selectedTile = req.body.selectedTile;
  const gameId = parseInt(req.body.gameId);
  try {
    const updatedGame = await updateGame(selectedTile, gameId);
    res.status(200).send(updatedGame);
  } catch (error) {
    console.error("error on PUT endturn route", error);
  }
});

module.exports = router;
