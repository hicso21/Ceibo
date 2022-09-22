const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/messages.contoller");

router.get("/", MessageController.findAll);

router.get("/user/:id", MessageController.findByUser);

router.get("/foundation/:id", MessageController.findByFoundation);

router.get("/:fId/:uId", MessageController.findByIds);

module.exports = router;
