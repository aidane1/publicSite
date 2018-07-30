let express = require("express");

let mongoose = require("mongoose");

let fs = require("fs");

let bodyParser = require("body-parser");

// let User = require("../models/userchar");

// let Course = require("../models/coursechar");

let session = require("express-session");

// let Events = require("../models/eventschar");

let socket = require("socket.io")

let cookieParser = require("cookie-parser");

// let Texts = require("../models/textchar.js");

// let Resources = require("../models/resourcechar.js");

let nodemailer = require("nodemailer");


mongoose.connect("mongodb://127.0.0.1/users");

mongoose.connection.once("open", function() {
  console.log("connection has been made");
}).on("error", function(error) {
  console.log("connection error: " + error);
});



let app = express();

app.listen(4000, function() {
  console.log("listening for requests");
});

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html");
});
