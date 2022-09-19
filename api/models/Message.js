const mongoose = require("mongoose");


const MessageSchema = new mongoose.Schema({
  username: String,
  avatarLink: String,
  message: String
});


const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
