const express = require("express");
const router = express.Router();
const Pets = require("../models/Pets");

router.get("/",(req, res) => {
  const pets = Pets.find();
  console.log(pets);
});

//router.post();

module.exports = router;
