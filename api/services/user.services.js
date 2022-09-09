const User = require("../models/Users");
const ObjectId = require("mongodb").ObjectId;

class UserService {
    static async createUser(body) {
        try {
            const user = new Users(body)
            sendEmail(user, 0)
            return await user.save()
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = UserService;
