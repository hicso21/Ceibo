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
  static async findByGender(gender) {
    try {
        return await Pets.find(     
                {gender:{ $regex: gender, $options: 'i' } }).exec()
    } catch (error) {
        console.log(error)
    }
}
static async findBySize(size) {
  try {
      return await Pets.find(     
              {size:{ $regex: size, $options: 'i' } }).exec()
  } catch (error) {
      console.log(error)
  }
}

static async findBySpecie(specie) {
  try {
      return await Pets.find(     
              {specie:{ $regex: specie, $options: 'i' } }).exec()
  } catch (error) {
      console.log(error)
  }
}

static async findByQuery(name) {
  try {
      return await Pets.find({
          $or: [
              { specie: { $regex: name, $options: 'i' } },
              { size: { $regex: name, $options: 'i' } },
              { gender: { $regex: name, $options: 'i' } },
              { location: { $regex: name, $options: 'i' } },
              { personality: { $regex: name, $options: 'i' } },
              { name: { $regex: name, $options: 'i' } },
              { age: { $regex: name, $options: 'i' } },
          ],
      }).exec()
  } catch (error) {
      console.log(error)
  }
}

}

module.exports = PetService;
