const Messages = require("../models/Message");
const ObjectId = require("mongodb").ObjectId;

class MessageService {
  static async findAll() {
    try {
      return await Messages.find({});
    } catch (error) {
      console.log(error.message);
    }
  }

  static async findByIds(fId, uId) {
    try {
      return await Messages.find({ fId: ObjectId(fId), uId: ObjectId(uId) });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async findByFoundation(id) {
    try {
      return await Messages.find({ "fId": ObjectId(id) }).populate("uId");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async findByUser(id) {
    try {
      console.log("ID:", id);
      return await Messages.find({ "uId": ObjectId(id) }).populate("fId");
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = MessageService;
