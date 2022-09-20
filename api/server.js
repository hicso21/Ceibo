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


httpServer.listen(process.env.PORT || 3001, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});

//-----------------------socket------------------------

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("message", async ({message,user}) => {
    try {
      io.sockets.emit("message", {message:message,
      user:user.name});
    } catch (err) {
      io.sockets.emit("error", err);
    }
  });
}); 
