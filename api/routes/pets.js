const express = require("express");
const router = express.Router();
const PetsController = require("../controllers/pet.controllers")

router.get("/all", PetsController.getAllPets);

/* router.post("/", async (req, res) => {
  console.log("ESTAMOS EN EL POST");
  const newPet = new Pets({ ...req.body });
  const insertedPet = await newPet.save();
  console.log(insertedPet);
  return res.send(insertedPet);
}); */

module.exports = router;
