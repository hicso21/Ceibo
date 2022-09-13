const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controllers");
const { validateAuth } = require('../middlewares/authUser')



router.post('/register', UserController.createUser)

router.post('/login', UserController.logIn)

router.get('/me', validateAuth, (req, res) => res.send(req.user))

router.get('/:id', UserController.getUser)

router.post('/logout', UserController.logOut)

router.delete('/delete/:id', UserController.deleteUser)

router.put('/update/', UserController.userUpdate)




module.exports = router;
