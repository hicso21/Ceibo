const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  name: String,
  last_name: String,
  profile_picture: String,
  google: String,
  age: String,
  favorites: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Pet" }],
  adopted: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Pet" }],
  location: String,
  numberPhone: Number,
  age: Number,
  civilStatus: String,
  availableSpace: String,
  kids : String,
  otherPets : String,
  message: String,
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

 








