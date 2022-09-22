const express = require("express");
const router = express.Router();
const pets = require("./pets")
const foundation = require("./foundation")
const user = require("./user")
const message = require("./messages")

router.use("/pets", pets)
router.use("/foundation", foundation)
router.use("/user", user)
router.use("/messages", message)

module.exports = router