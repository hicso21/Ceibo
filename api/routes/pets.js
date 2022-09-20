const express = require("express");
const router = express.Router();
const PetsController = require("../controllers/pet.controllers");

router.get("/all", PetsController.getAllPets);

router.get("/some", PetsController.getSomePets);

router.get("/:id", PetsController.findPet);

router.put("/update/:id", PetsController.modifyPet);

router.get("/search/avanzada", PetsController.findByQuery);

router.get("/search/genero/:gender", PetsController.findByGender);

router.get("/search/size/:size", PetsController.findBySize);

router.get("/search/specie/:specie", PetsController.findBySpecie);

router.delete("/delete/:id", PetsController.deletePet);

module.exports = router;
