const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String },
  photos: [String],
  specie: String,
  gender: String,
  age: String,
  size: String,
  location: String,
  personality: String,
  history: String,
  vaccinated: Boolean,
  foundation: { type: mongoose.SchemaTypes.ObjectId, ref: "Foundations" },
  neutered: Boolean,
});

const Pets = mongoose.model("Pet", petSchema);

module.exports = Pets;
