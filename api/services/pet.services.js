const Pets = require("../models/Pets");
const ObjectId = require("mongodb").ObjectId;

class PetService {
  static async getAllPets() {
    try {
      return await Pets.find({}).populate("foundation");
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
      return await Pets.findById(id).populate("foundation");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async findByGender(gender) {
    try {
      return await Pets.find({
        gender: { $regex: gender, $options: "i" },
      })
        .populate("foundation")
        .exec();
    } catch (error) {
      console.log(error.message);
    }
  }

  static async findBySize(size) {
    try {
      return await Pets.find({ size: { $regex: size, $options: "i" } })
        .populate("foundation")
        .exec();
    } catch (error) {
      console.log(error.message);
    }
  }

  static async findBySpecie(specie) {
    try {
      return await Pets.find({
        specie: { $regex: specie, $options: "i" },
      })
        .populate("foundation")
        .exec();
    } catch (error) {
      console.log(error.message);
    }
  }

  static async findByQuery(name) {
    try {
      return await Pets.find({
        $or: [
          { specie: { $regex: name, $options: "i" } },
          { size: { $regex: name, $options: "i" } },
          { gender: { $regex: name, $options: "i" } },
          { location: { $regex: name, $options: "i" } },
          { personality: { $regex: name, $options: "i" } },
          { name: { $regex: name, $options: "i" } },
          { age: { $regex: name, $options: "i" } },
        ],
      })
        .populate("foundation")
        .exec();
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getSomePets() {
    try {
      return await Pets.find({}).limit(3).skip(3).populate("foundation");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async modifyPet(body, id) {
    try {
      return await Pets.updateOne({ _id: id }, { $set: body });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = PetService;
