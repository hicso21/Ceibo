const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controllers");
const { validateAuth } = require('../middlewares/auth')
const { validateToken, generateToken } = require("../config/tokens")


router.post('/register', UserController.createUser)

router.post('/login', UserController.logIn)

router.get('/me', validateAuth, (req, res) => res.send(req.user))

router.post('/logout', UserController.logOut)

router.delete('/delete/:id', UserController.deleteUser)


module.exports = router;
