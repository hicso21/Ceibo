const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  uId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  fId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Foundation",
  },
  message: { type: String, required: true },
  user: String,
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
