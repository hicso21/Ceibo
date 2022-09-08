const express = require("express");
const router = express.Router();
const FoundationController = require("../controllers/foundation.controllers")

router.get("/", FoundationController.getAllFoundation);


router.post('/create', FoundationController.createFoundation)

/* router.post("/", async (req, res) => {
  console.log("ESTAMOS EN EL POST");
  const newPet = new Pets({ ...req.body });
  const insertedPet = await newPet.save();
  console.log(insertedPet);
  return res.send(insertedPet);
}); */

module.exports = router;
