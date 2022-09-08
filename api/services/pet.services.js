const Pets = require("../models/Pets");
const ObjectId = require("mongodb").ObjectId;

class PetService {
  static async getAllPets() {
    try {
      return await Pets.find({});
    } catch (error) {
      console.log(error.message);
    }
  }
  static async createPet(body) {
    try {
      return await Pets.create(body);
    } catch (error) {
      console.log(error.message);
    }
  }
  static async getOnePet(id) {
    try {
      return await Pets.findById(id);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = PetService;
