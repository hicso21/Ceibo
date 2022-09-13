const mongoose = require("mongoose");

const foundationSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2 },
  profile_picture: String,
  location: { type: String, required: true, minLength: 2 },
  password: { type: String, required: true, minLength: 2 },
  salt: String,
  email: { type: String, required: true, minLength: 5 },
  history: String,
  pets: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Pet" }],
});

module.exports = mongoose.model("Foundation", foundationSchema);
