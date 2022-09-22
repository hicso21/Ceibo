const Message = require("../api/models/Message");

const socket = (io) => {
  io.on("connection", (socket) => {
    //console.log("user connected");
    const findMessages = async () => {
      const messages = await Message.find();
      //console.log(messages);
      io.emit("load-messages", messages);
    };
    findMessages();

    socket.on("send-message", async (data) => {
      //console.log(data);
      try {
        const newMessage = new Message({
          uId: data.uId,
          fId: data.fId,
          message: data.message,
          user: data.username,
        });
        const savedMessage = await newMessage.save();
        //console.log("MENSAJE GUARDADO", savedMessage);
        io.sockets.emit("new-message", {
          message: savedMessage.message,
          user: savedMessage.user,
        });
      } catch (error) {
        console.log(error.message);
      }
    });
  });
  io.engine.on("connection_error", (err) => {
    console.log(err);
  });
};

module.exports = socket;
