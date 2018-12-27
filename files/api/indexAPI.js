let express = require("express");

let mongoose = require("mongoose");

let bodyParser = require("body-parser");

let fs = require("fs");

let School = require(__dirname + "/models/schoolchar.js");
let User = require(__dirname + "/models/userchar.js");
let Course = require(__dirname + "/models/coursechar.js");
let Event = require(__dirname + "/models/eventschar.js");
let Assignments = require(__dirname + "/models/assignmentchar.js");
let Notes = require(__dirname + "/models/notechar.js");


mongoose.connect("mongodb://127.0.0.1:27017/users", {useNewUrlParser: true});

mongoose.connection.once("open", function() {
  console.log("connection has been made");
}).on("error", function(error) {
  console.log("connection error: " + error);
});

let urlencodedParser = bodyParser.urlencoded({extended: false});

let app = express();

let server = app.listen(15651, function() {
    console.log("listening for requests");
});
app.post("/retrieveAssignments", urlencodedParser, async function(req, res) {
  try {
    if (req.query.courseID) {
      if (req.body.retrievedIDs) {
        let newIds = JSON.parse(req.body.retrievedIDs);
        let newAssignments = await Assignments.find({$and: [{forCourse: req.query.courseID}, {_id : {$not: {$in: newIds}}}]});
        res.send(newAssignments);
      } else {
        res.send([]);
      }
    } else {
      res.send([]);
    }
  } catch(e) {
    console.log(e);
    res.send([]);
  }
});

app.post("/retrieveNotes", urlencodedParser, async function(req, res) {
  try {
    if (req.query.courseID) {
      if (req.body.retrievedIDs) {
        console.log(req.body.retrievedIDs);
        let newIds = JSON.parse(req.body.retrievedIDs);
        // console.log(newIds);
        // console.log(req.query.courseID);
        // let noteTest = await Notes.find({forCourse: req.query.courseID});
        // console.log("test: ", noteTest);
        let newNotes = await Notes.find({$and: [{forCourse: req.query.courseID}, {_id : {$not: {$in: newIds}}}]});
        console.log(newNotes);
        res.send(newNotes);
      } else {
        res.send([]);
      }
    } else {
      res.send([]);
    }
  } catch(e) {
    console.log(e);
    res.send([]);
  }
});

app.get("/getNotes", async function(req, res) {
  console.log(req.query.courseID);
  if (req.query.courseID) {
    try {
      let courseNotes = await Notes.find({forCourse : req.query.courseID});
      console.log(courseNotes);
      res.send(courseNotes);
    } catch(e) {
      res.send([]);
    }
  }
});
app.get("/getAssignments", async function(req,res) {
  if (req.query.courseID) {
    try {
      let courseAssignments = await Assignments.find({forCourse: req.query.courseID});
      res.send(courseAssignments);
    } catch(e) {
      console.log(e);
      res.send([]);
    }
  } else {
    res.send([]);
  }
})

app.get("/validateUser", async function(req, res) {
  let response = await User.authenticate(req.query.username, req.query.password);
});
app.get("/schoolList", async function(req, res) {
  let schools = await School.find({});
  let schoolList = [];
  for (var i = 0; i < schools.length; i++) {
    schoolList.push({name: schools[i].name, id: schools[i]._id, district: schools[i].schoolDistrict});
  }
  console.log(schoolList);
  res.send(JSON.stringify(schoolList));
});
app.get("/UserInfo", async function(req, res) {
    
    let sendObject = {

    }
    if (req.query.schoolId) {
      let school = await School.findOne({_id : req.query.schoolId});
      console.log(school["constantBlockSchedule"]);
      console.log(school.constantBlockSchedule.schedule[0].day1);
      let courses = await Course.find({school : req.query.schoolId});
      let events = await Event.find({school : req.query.schoolId});
      sendObject.school = school;
      sendObject.courses = courses;
      sendObject.events = events;
    }
    if (req.query.username && req.query.password) {
      try {
        let response = await User.authenticate(req.query.username, req.query.password);
        sendObject.user = response;
      } catch(e) {
        console.log(e);
      }
    }
    // console.log(sendObject);
    res.send(JSON.stringify(sendObject));
});