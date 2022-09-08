const express = require("express");
const router = express.Router();
const pets = require("./pets")
const foundation = require("./foundation")

router.use("/pets", pets)
router.use("/foundation", foundation)

module.exports = router