const router = require("express").Router();

//token checkpoint here eventually


router.use("/auth", require("./auth"));
router.use("/game", require("./api"));

module.exports = router;