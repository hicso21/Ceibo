const Foundation = require("../models/Foundations");
const ObjectId = require("mongodb").ObjectId;

class FoundationService {
  static async getAllFoundation() {
    try {
      return await Foundation.find({});
    } catch (error) {
      console.log(error.message);
    }
  }

  static async createFoundation(body) {
    try {
      const foundation = new Foundation(body);
      return await foundation.save();
    } catch (error) {
      console.log(error);
    }
  }
  static async findById(id) {
    try {
      return await Foundation.findById(id);
    } catch (error) {
      console.log(error);
    }
  }
  static async getSomeFoundations() {
    try {
      return await Foundation.find({}).limit(3).skip(2);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = FoundationService;
