const mongoose = require("mongoose");

const foundationSchema = new mongoose.Schema({
  name: String,
  profile_picture: String,
  pets: [String],
  location: String,
  password: String,
  salt: String,
  email: String,
  history: String,
});

module.exports = mongoose.model("Foundation", foundationSchema);
