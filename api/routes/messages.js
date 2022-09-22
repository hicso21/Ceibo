const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/messages.contoller");

router.get("/", MessageController.findAll);

router.get("/:fId/:uId", MessageController.findByIds);

router.get("/foundation/:id", MessageController.findByFoundation);

router.get("/user/:id", MessageController.findByUser);

module.exports = router;
