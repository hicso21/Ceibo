const PetServices = require("../services/pet.services");

class PetController {
  static async getAllPets(req, res) {
    try {
      const pets = await PetServices.getAllPets();
      if (!pets) return res.status(404).send("no data found");
      res.status(200).send(pets);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = PetController;
