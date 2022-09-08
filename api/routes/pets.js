const express = require("express");
const router = express.Router();
const PetsController = require("../controllers/pet.controllers");

router.get("/all", PetsController.getAllPets);

router.post("/insert", PetsController.createPet);

router.get("/:id", PetsController.findPet);

module.exports = router;
