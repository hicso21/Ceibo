const UserService = require("../services/user.services");
const { validateToken, generateToken } = require("../config/tokens");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");

class UserController {
  static async createUser(req, res) {
    const user = await UserService.createUser(req.body);
    if (user) {
      const token = generateToken({
        _id: user._id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
      });
      const payload = validateToken(token);
      req.user = payload;
      res.cookie("token", token, { maxAge: 9000000 });
      res.status(201).send(user);
    } else res.sendStatus(400);
  }

  static async logIn(req, res) {
    const user = await UserService.find(req);
    if (!user) return res.sendStatus(401);
    const passwordHashed = bcrypt.hashSync(req.body.password, user.salt);
    if (passwordHashed === user.password) {
      const token = generateToken({
        _id: user._id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
      });
      const payload = validateToken(token);
      req.user = payload;
      res.cookie("token", token, { maxAge: 9000000 });
      res.status(201).send(req.user);
    } else return res.sendStatus(401);
  }

  static async logOut(req, res) {
    res.clearCookie("token");
    res.sendStatus(204);
  }

  static async deleteUser(req, res) {
    try {
      const user = await UserService.deleteUser(req.params.id);
      return res.status(204).send(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async getUser(req, res) {
    try {
      const user = await UserService.getUser(req.params.id);
      if (!user) return res.status(404).send("Usuario no encontrado");
      return res.status(200).send(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async userUpdate(req, res) {
    try {
        const user = await UserService.userUpdate(req.body)
        return res.status(204).send(user)
    } catch (error) {
        console.log(error)
    }
}
}
module.exports = UserController;
