const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const sockets = require("./sockets");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const routes = require("./routes");
require("dotenv").config();
require("./config/db");

//----------------------- Middlewares -----------------------
app.use(morgan("dev"));
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));
app.use(express.json({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    credentials: true, //access-control-allow-credentials:true
  })
);
app.use("/api", routes);

//----------------- server y socket -----------------

const server = http.createServer(app);
const httpServer = server.listen(process.env.PORT || 3001, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:8080"],
    methods: ["GET", "POST"],
    transports: ["websocket"],
    credentials: true, //access-control-allow-credentials:true
  },
  allowEIO4: true,
});

sockets(io);
