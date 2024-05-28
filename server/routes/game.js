const router = require("express").Router();
const { getGame, updateGame, createGame, endGameEarly } = require("../db/game");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const auth = req.headers.authorization;
  const gameToken = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  let gameId;
  let player;
  if (gameToken) {
    const decoded = jwt.verify(gameToken, process.env.GAME_JWT);
    gameId = decoded.id;
    player = decoded.player;
  }
  try {
    const gameAndPlayer = await getGame(gameId, player);
    gameAndPlayer.currentGame.gameState = JSON.parse(
      gameAndPlayer.currentGame.gameState
    );
    res.status(200).send(gameAndPlayer);
  } catch (error) {
    throw error;
  }
});

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

router.put("/endgame", async (req, res) => {
  console.log("got to endpoint")
  try {
    const winner = req.body.winner;
    console.log("winner", winner)
    const id = parseInt(req.body.gameId)
    console.log("id", id)
    await endGameEarly(winner, id);
    res.status(200);
  } catch (error) {
    console.error("error on PUT /endgame route", error);
  }
});

module.exports = router;
