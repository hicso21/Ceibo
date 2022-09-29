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

  static async googleUser(body){
    try {
      console.log('ESTO ES BODY', body)
      const googleUser = await Foundation.findOne({email: body.email})
      console.log('GOOGLEUSER', googleUser)
      if(googleUser === null) {
        
        const newGoogleUser = new Foundation(body);
        return await newGoogleUser
      }else return googleUser
    }catch (error) {
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
      return await Foundation.find({}).limit(6).skip(2);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async addPet(petId, id) {
    try {
      return await Foundation.updateOne(
        { _id: id },
        { $push: { pets: petId } }
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getAllPets(id) {
    try {
      return await Foundation.findById(id).populate("pets");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async find(req) {
    const { email } = req.body;
    try {
      return await Foundation.findOne({ email: email, status: true });
    } catch (error) {
      console.log(error);
    }
  }

  static async addComment(id, comment) {
    try {
      return await Foundation.updateOne(
        { _id: id },
        {
          $push: { comments: comment },
        },
        );
    } catch (error) {
      console.log(error.message);
    }
  }
  
  static async getAllComments(id) {
    try {
      return await Foundation.findById(id);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = FoundationService;
