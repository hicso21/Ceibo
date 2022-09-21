const UserService = require("../services/user.services");
const { validateToken, generateToken } = require("../config/tokens");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../config/mailer");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      return users
        ? res.status(200).send(users)
        : res.status(404).send("no data found");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      if (user) {
        const token = generateToken({
          _id: user._id,
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          profile_picture: user.profile_picture,
          age: user.age,
          favorites: user.favorites,
          adopted: user.adopted,
          location: user.location,
          numberPhone: user.numberPhone,
          civilStatus: user.civilStatus,
          availableSpace: user.availableSpace,
          kids: user.kids,
          otherPets: user.otherPets,
          message: user.message,
        });
        const payload = validateToken(token);
        req.user = payload;
        res.cookie("token", token, { maxAge: 9000000 });
        res.status(201).send(user);
      } else res.sendStatus(400);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async logIn(req, res) {
    try {
      const user = await UserService.find(req);
      if (!user) return res.sendStatus(401);
      const passwordHashed = bcrypt.hashSync(req.body.password, user.salt);
      if (passwordHashed === user.password) {
        const token = generateToken({
          _id: user._id,
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          profile_picture: user.profile_picture,
          age: user.age,
          favorites: user.favorites,
          adopted: user.adopted,
          location: user.location,
          numberPhone: user.numberPhone,
          civilStatus: user.civilStatus,
          availableSpace: user.availableSpace,
          kids: user.kids,
          otherPets: user.otherPets,
          message: user.message,
        });
        const payload = validateToken(token);
        req.user = payload;
        res.cookie("token", token);
        res.status(201).send(req.user);
      } else return res.sendStatus(401);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async logOut(req, res) {
    try {
      console.log(req.cookies.token);
      res.clearCookie("token");
      res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await UserService.deleteUser(req.params.id);
      return res.status(204).send(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async resetPassword(req, res) {
    try {
      const { userId } = req.params.id;
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hashSync(req.body.password, salt);
      const userPassword = await Users.updateOne({_id: userId}, {password: password})
      return res.status(204).send(userPassword);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getUser(req, res) {
    try {
      const user = await UserService.getUser(req.params.id);
      if (!user) return res.status(404).send("Usuario no encontrado");
      return res.status(200).send(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  /*  static async userUpdate(req, res) {
    try {
      const user = await UserService.userUpdate(req.body, req.params.id);
      return res.status(204).send(user);
    } catch (error) {
      console.log(error);
    }
  } */

  static async userUpdate(req, res) {
    let _id = req.params.id;
    let update = req.body;
    console.log(update);

    Users.findByIdAndUpdate(_id, update, (err, bodyUpdated) => {
      if(err) return res.status(500).send({message: `Error al actualizar la nota: ${err}`})
  
      if(!bodyUpdated) return res.status(500).send({message: 'No retornó objeto actualizado'})
      
      const objectToReturn = {
        email: update.email,
        name: update.name,
        _id : bodyUpdated._id,
        last_name: update.last_name,
        favorites: bodyUpdated.favorites,
        adopted: bodyUpdated.adopted,
        profile_picture: update.profile_picture,
      }

      console.log(objectToReturn)

      res.status(200).send(objectToReturn)
    })
  }


  static async getFavorites(req, res) {
    try {
      const user = await UserService.getUser(req.params.id);
      return user
        ? res.send(user.favorites)
        : res.status(404).send("User not found");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getAdopted(req, res) {
    try {
      const user = await UserService.getUser(req.params.id);
      return user
        ? res.send(user.adopted)
        : res.status(404).send("User not found");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async addFavorite(req, res) {
    try {
      const user = await UserService.addFavorite(req.params.id, req.body);
      return user
        ? res.send(user)
        : res.status(404).send("User not found/favorite already added");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async removeFavorite(req, res) {
    try {
      const user = await UserService.removeFavorite(
        req.params.id,
        req.body._id
      );
      return user
        ? res.send(user)
        : res.status(404).send("User not found/favorite already removed");
    } catch (error) {
      console.log(error.message);
    }
  }


static async userForm(req, res) {
  let _id = req.params.id;
  let update = {
    name: req.body.name,
    last_name: req.body.last_name,
    numberPhone: req.body.numberPhone,
    age: req.body.age,
    civilStatus: req.body.civilStatus,
    location: req.body.location,
    availableSpace: req.body.availableSpace,
    kids: req.body.kids,
    otherPets: req.body.otherPets,
    message: req.body.message
    }
  console.log(update);
  let foundation = req.body.foundations
  let pets = req.body.pets
  let email = req.body.email
  Users.findByIdAndUpdate(_id, update, (err, bodyUpdated) => {
    if(err) return res.status(500).send({message: `Error al actualizar la nota: ${err}`})

    if(!bodyUpdated) return res.status(500).send({message: 'No retornó objeto actualizado'})
    
    const objectToReturn = {
      email: update.email,
      name: update.name,
      _id : bodyUpdated._id,
      last_name: update.last_name,
      favorites: bodyUpdated.favorites,
      adopted: bodyUpdated.adopted,
      profile_picture: update.profile_picture,
    }

    console.log(objectToReturn)
    sendEmail(foundation,pets,update,email)
    res.status(200).send(objectToReturn)
  })

}}
module.exports = UserController;
