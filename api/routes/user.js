const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controllers");
const { validateAuth } = require("../middlewares/authUser");

router.get("/all", UserController.getAllUsers);

router.post("/register", UserController.createUser);

router.post("/login", UserController.logIn);

router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

router.get("/:id", UserController.getUser);

router.get("/:email", UserController.getUserEmail);

router.post("/logout", UserController.logOut);

router.put("/resetPassword/:id", UserController.resetPassword);

router.delete("/delete/:id", UserController.deleteUser);

router.put("/update/:id", UserController.userUpdate);

router.put("/favorites/add/:id", UserController.addFavorite);

router.put("/favorites/remove/:id", UserController.removeFavorite);

router.get("/favorites/:id", UserController.getFavorites);

router.get("/adopted/:id", UserController.getAdopted);

router.put("/form/:id", UserController.userForm);

module.exports = router;
