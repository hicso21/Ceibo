const Users = require("../models/Users");
const Pets = require("../models/Pets");
const ObjectId = require("mongodb").ObjectId;

class UserService {
  static async getAllUsers() {
    try {
      return await Users.find({});
    } catch (error) {
      console.log(error.message);
    }
  }

  static async createUser(body) {
    try {
      const user = new Users(body);
      return await user.save();
    } catch (error) {
      console.log(error.message);
    }
  }

  static async googleUser(body){
    try {
      const googleUser = await Users.findOne({email: body.email})
      console.log(googleUser)
      if(!googleUser.email) {
        const newGoogleUser = new Users(body);
        return await newGoogleUser
      }else return googleUser
    }catch (error) {
      console.log(error.message);
    }
  }

  static async find(req) {
    const { email } = req.body;
    try {
      return await Users.findOne({ email: email, status: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async deleteUser(id) {
    try {
      return await Users.deleteOne({ _id: id });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getUser(id) {
    try {
      return await Users.findOne({ _id: id }).populate("favorites");
    } catch (error) {
      console.log(error.message);
    }
  }

  /* static async userUpdate(body,id) {
    try {
      return await Users.updateOne({ _id: id }, { $set: body })
  } catch (error) {
      console.log(error)
  }} */

  static async addFavorite(id, fav) {
    try {
      return await Users.findByIdAndUpdate(
        id,
        {
          $addToSet: { favorites: fav },
        },
        { new: true, runValidators: true }
      ).populate("favorites");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async removeFavorite(id, petId) {
    try {
      return await Users.findByIdAndUpdate(
        id,
        {
          $pull: { favorites: petId },
        },
        { new: true, runValidators: true }
      ).populate("favorites");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async adoptPet(id, petId) {
    try {
      return await Users.findByIdAndUpdate(
        id,
        {
          $addToSet: { adopted: petId },
        },
        { new: true, runValidators: true }
      ).populate("adopted");
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = UserService;
