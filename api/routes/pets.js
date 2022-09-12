const express = require("express");
const router = express.Router();
const PetsController = require("../controllers/pet.controllers");

router.get("/all", PetsController.getAllPets);

router.get("/some", PetsController.getSomePets)

router.post("/create", PetsController.createPet);

router.get("/:id", PetsController.findPet);

router.get('/search/avanzada/:query', PetsController.findByQuery)

router.get('/search/genero/:gender', PetsController.findByGender)

router.get('/search/size/:size', PetsController.findBySize)

router.get('/search/specie/:specie', PetsController.findBySpecie)



module.exports = router;
