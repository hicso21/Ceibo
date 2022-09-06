const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/patitas-con-techo", ()=>{
    console.log("connected");
});
