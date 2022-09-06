const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: String,
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
});

module.exports = mongoose.model("Pets", petSchema);
