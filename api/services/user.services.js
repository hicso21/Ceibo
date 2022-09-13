const Users = require("../models/Users");
const ObjectId = require("mongodb").ObjectId;

class UserService {
  static async createUser(body) {
    try {
      const user = new Users(body);
      return await user.save();
    } catch (error) {
      console.log(error);
    }
  }
  static async find(req) {
    const { email } = req.body;
    try {
      return await Users.findOne({ email: email, status: true });
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteUser(id) {
    try {
      return await Users.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }
  static async getUser(id) {
    try {
      return await Users.findOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }
  static async userUpdate(body) {
    try {
        return await Users.updateOne({ _id: body.id }, { $set: body.mod })
    } catch (error) {
        console.log(error)
    }
}

}

module.exports = UserService;
