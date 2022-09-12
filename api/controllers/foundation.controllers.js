const FoundationServices = require("../services/foundation.services");
const PetServices = require("../services/pet.services");

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
    try {
      const foundation = await FoundationServices.createFoundation(req.body);
      return res.status(201).send(foundation);
    } catch (error) {
      console.log(error);
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
      //esta bien con dos await? preguntar
      const addedPet = await FoundationServices.addPet(pet._id, req.params.id);
      return res.status(204).send(addedPet);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = FoundationController;
