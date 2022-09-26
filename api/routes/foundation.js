const express = require("express");
const router = express.Router();
const { validateAuth } = require("../middlewares/authFoundation");
const FoundationController = require("../controllers/foundation.controllers");

router.get("/", FoundationController.getAllFoundation);

router.post("/register", FoundationController.createFoundation);

router.post("/login", FoundationController.logIn);

router.get("/me", validateAuth, (req, res) => res.send(req.foundation));

router.get("/some", FoundationController.getSomeFoundations);

router.get("/:id", FoundationController.findById);

router.get("/:id/pets", FoundationController.getAllPets);

router.post("/:id/add", FoundationController.addPet);

router.put("/comments/add/:id", FoundationController.addComment);

router.get("/comments/get/:id", FoundationController.getAllComments);

router.post("/logout", FoundationController.logOut);

router.put("/adopt/:userId/:petId", FoundationController.adoptPet);

module.exports = router;
