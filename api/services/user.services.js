const Users = require("../models/Users");
const ObjectId = require("mongodb").ObjectId;

class UserService {
  static async createUser(body) {
    try {
      const user = new Users(body);
      return await user.save();
    } catch (error) {
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

  static async userUpdate(update, _id) {
    try{ await Users.findByIdAndUpdate(_id, update, (err, bodyUpdated) => {
      if(err) return{message: `Error al actualizar la nota: ${err}`}
  
      if(!bodyUpdated) return{message: 'No retornó objeto actualizado'}
  
      return{ nota: bodyUpdated }
    })}
    catch (error) {
      console.log(error)
  }
}

/* static async userUpdate(body,id) {
  try {
    return await Users.updateOne({ _id: id }, { $set: body })
} catch (error) {
    console.log(error)
}
} */

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
}

module.exports = UserService;
