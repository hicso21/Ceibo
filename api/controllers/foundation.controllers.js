const FoundationServices = require("../services/foundation.services");
const PetServices = require("../services/pet.services");
const UserServices = require("../services/user.services");
const bcrypt = require("bcrypt");
const { validateToken, generateToken } = require("../config/tokens");
const Foundation = require("../models/Foundations");

class FoundationController {
  static async getAllFoundation(req, res) {
    try {
      const foundation = await FoundationServices.getAllFoundation();
      if (!foundation) return res.status(404).send("no data found");
      res.status(200).send(foundation);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async createFoundation(req, res) {
    const foundation = await FoundationServices.createFoundation(req.body);
    if (foundation) {
      const token = generateToken({
        _id: foundation._id,
        name: foundation.name,
        email: foundation.email,
        pets: foundation.pets,
        profile_picture: foundation.profile_picture,
        location: foundation.location,
      });
      const payload = validateToken(token);
      req.foundation = payload;
      res.cookie("token", token, { maxAge: 9000000 });
      res.status(201).send(foundation);
    } else res.sendStatus(400);
  }

  static async logIn(req, res) {
    try{
      if(req.body.google === true){
        const googleUser = await FoundationServices.googleUser(req.body) 
        //console.log(googleUser)
        const token = generateToken({
          _id: googleUser._id,
          name: googleUser.name,
          email: googleUser.email,
          pets: googleUser.pets,
          profile_picture: googleUser.profile_picture,
          location: googleUser.location,
        });
        const payload = validateToken(token);
        payload.google = true
        req.user = payload;
        res.cookie("token", token)
        res.status(201).send(req.user);

      }else{
      const foundation = await FoundationServices.find(req);
      if (!foundation) return res.sendStatus(401);
      const passwordHashed = bcrypt.hashSync(req.body.password, foundation.salt);
      if (passwordHashed === foundation.password) {
        const token = generateToken({
          _id: foundation._id,
          name: foundation.name,
          email: foundation.email,
          pets: foundation.pets,
          profile_picture: foundation.profile_picture,
          location: foundation.location,
        });
        const payload = validateToken(token);
        req.foundation = payload;
        res.cookie("token", token, { maxAge: 9000000 });
        res.status(201).send(req.foundation);
      } else return res.sendStatus(401)
    }} catch (error) {
      console.log(error.message);
    }
  }

  static async findById(req, res) {
    try {
      const foundation = await FoundationServices.findById(req.params.id);
      return res.status(200).send(foundation);
    } catch (error) {
      console.log(error);
    }
  }

  static async getSomeFoundations(req, res) {
    try {
      const foundations = await FoundationServices.getSomeFoundations();
      return foundations
        ? res.status(200).send(foundations)
        : res.status(404).send("no data found");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getAllPets(req, res) {
    try {
      const foundation = await FoundationServices.getAllPets(req.params.id);
      console.log(foundation)
      return foundation.pets
        ? res.status(200).send(foundation.pets)
        : res.status(404).send("no data found");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async addPet(req, res) {
    try {
      const pet = await PetServices.createPet({
        ...req.body,
        foundation: req.params.id,
      });
      const addedPet = await FoundationServices.addPet(pet._id, req.params.id);
      return res.status(204).send(addedPet);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async adoptPet(req, res) {
    try {
      const pet = await PetServices.adoptPet(req.params.petId);
      const user = await UserServices.adoptPet(
        req.params.userId,
        req.params.petId
      );
      return res.status(204).send(user, pet);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async logOut(req, res) {
    res.clearCookie("token");
    res.sendStatus(204);
  }

  static async addComment(req, res) {
    try {
      const comentario = await FoundationServices.addComment(req.params.id,req.body.comments);
      
      return res.status(204).send(comentario);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getAllComments(req, res) {
    try {
      const foundation = await FoundationServices.getAllComments(req.params.id);
      return foundation.comments
        ? res.status(200).send(foundation.comments)
        : res.status(404).send("no data found");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async foundationUpdate(req, res) {
    let _id = req.params.id;
    let update = req.body;
    console.log(update);

    Foundation.findByIdAndUpdate(_id, update, (err, bodyUpdated) => {
      if(err) return res.status(500).send({message: `Error al actualizar la nota: ${err}`})
  
      if(!bodyUpdated) return res.status(500).send({message: 'No retornó objeto actualizado'})
      
      const objectToReturn = {
        email: update.email,
        name: update.name,
        _id : bodyUpdated._id,
        location: update.location,
        favorites: bodyUpdated.favorites,
        adopted: bodyUpdated.adopted,
        profile_picture: update.profile_picture,
      }

      console.log(objectToReturn)

      res.status(200).send(objectToReturn)
    })
  }

}

module.exports = FoundationController;
