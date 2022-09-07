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
}

module.exports = PetService;
