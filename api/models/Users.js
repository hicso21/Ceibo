const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  name: String,
  last_name: String,
  profile_picture: String,
  age: String,
  favorites: [String],
  adopted: [String],
  location: String,
  password: {type: String,required: true},
  salt: String,
  email: { type: String, required: true },
  isAdmin: {type: Boolean, default: false}
});

UserSchema.pre('save', async function () {
  this.salt = bcrypt.genSaltSync()
  return (this.password = await bcrypt.hash(this.password, this.salt))
})


const Users = mongoose.model("User", UserSchema);

module.exports = Users;