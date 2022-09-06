const express = require("express");
const db = require("./config/db");
const routes = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

var app = express();
require("./models");

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api", routes);

/* app.get("/", (req, res) => {
  res.send("Hello Express");
}); */

//app.listen(process.env.PORT || 3001)

//const port = process.env.PORT

/* db.sync({ force: false }).then(() => {
  app.listen(port, () => console.log(`server listening on port ${port}`));
}); */

