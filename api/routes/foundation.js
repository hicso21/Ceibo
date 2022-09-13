const express = require("express");
const router = express.Router();
const FoundationController = require("../controllers/foundation.controllers");

router.get("/", FoundationController.getAllFoundation);

router.post("/create", FoundationController.createFoundation);

router.get("/some", FoundationController.getSomeFoundations);

router.get("/:id", FoundationController.findById);

router.get("/:id/pets", FoundationController.getAllPets);

router.post("/:id/add", FoundationController.addPet);

module.exports = router;
