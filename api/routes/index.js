const express = require("express");
const router = express.Router();
const pets = require("./pets")
const foundation = require("./foundation")
const user = require("./user")

router.use("/pets", pets)
router.use("/foundation", foundation)
router.use("/user", user)

module.exports = router