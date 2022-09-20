const FoundationServices = require("../services/foundation.services");
const PetServices = require("../services/pet.services");
const UserServices = require("../services/user.services");
const bcrypt = require("bcrypt");
const { validateToken, generateToken } = require("../config/tokens");

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
    } else return res.sendStatus(401);
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
}

module.exports = FoundationController;
