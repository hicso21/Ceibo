const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  last_name: String,
  profile_picture: String,
  age: String,
  favorites: [String],
  adopted: [String],
  location: String,
  password: String,
  salt: String,
  email: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
