const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const routes = require("./routes");

//----------------------socket-----------------
//const server = require('http').createServer(app);
//const io = require('socket.io')(server);

const { Server } = require("socket.io");
const http = require("http");
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:8080"],
    credentials: true, //access-control-allow-credentials:true
  },
});

const Message = require("../api/models/Message");

//----------------------------------------------

require("dotenv").config();
require("./config/db");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:8080"],
  credentials: true, //access-control-allow-credentials:true
}));

app.use("/api", routes);

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("user connected");
});

httpServer.listen(process.env.PORT || 3001, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});

//-----------------------socket------------------------
/* const usersArray = [];
io.listen(3001);
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("user-connect", async (userData) => {
    userData.socketId = socket.id;
    usersArray.push(userData);
    io.sockets.emit("users-connected", usersArray);

    console.log("Users online: " + usersArray.length);

    try {
      const messages = await Message.find();
      io.sockets.emit("old-messages", messages);
    } catch (err) {
      io.sockets.emit("error", err);
    }
  });

  socket.on("send-message", async (messageData) => {
    try {
      const newMessage = await Message.create(messageData);
      console.log("> " + messageData.username + ":" + messageData.message);
      io.sockets.emit("new-message", newMessage);
    } catch (err) {
      console.log(err);
      io.sockets.emit("error", err);
    }
  });

  socket.on("disconnect", () => {
    usersArray.map((user, index) => {
      if (usersArray[index].socketId === socket.id)
        return usersArray.splice(index, 1);
    });

    console.log("Users online: " + usersArray.length);

    io.sockets.emit("users-connected", usersArray);
  });
}); */
