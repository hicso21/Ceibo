const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const FoundationSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2 },
  profile_picture: String,
  location: { type: String, required: true, minLength: 2 },
  password: { type: String, required: true, minLength: 2 },
  salt: String,
  email: { type: String, required: true, minLength: 5 },
  history: String,
  pets: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Pet" }],
  message:[{type: String}],
  comments:[{type: String}],
});

FoundationSchema.pre('save', async function () {
  this.salt = bcrypt.genSaltSync()
  return (this.password = await bcrypt.hash(this.password, this.salt))
})



const Foundation = mongoose.model("Foundation", FoundationSchema);

module.exports = Foundation;
