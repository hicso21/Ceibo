const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const routes = require("./routes");
require("dotenv").config();
require("./config/db");

app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:8080"],
  credentials: true, //access-control-allow-credentials:true
}))

app.use("/api", routes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello");
  console.log("hola");
});
