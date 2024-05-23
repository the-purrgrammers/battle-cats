require("dotenv").config()
const router = require("express").Router();

//token checkpoint here eventually

router.use("/auth", require("./auth"));
router.use("/api/game", require("./game"));

module.exports = router;
