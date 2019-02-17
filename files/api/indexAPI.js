let express = require("express");

let mongoose = require("mongoose");

let bodyParser = require("body-parser");

let fs = require("fs");

let School = require(__dirname + "/../../models/schoolchar.js");
let User = require(__dirname + "/../../models/userchar.js");
let Course = require(__dirname + "/../../models/coursechar.js");
let Events = require(__dirname + "/../../models/eventschar.js");
let Assignments = require(__dirname + "/../../models/assignmentchar.js");
let Notes = require(__dirname + "/../../models/notechar.js");
let Semesters = require(__dirname + "/../../models/semesterchar.js");
let Teachers = require(__dirname + "/../../models/teacherchar.js");
let Categories = require(__dirname + "/../../models/categorychar.js");
let moment = require("moment");


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
        let newIds = JSON.parse(req.body.retrievedIDs);
        let newNotes = await Notes.find({$and: [{forCourse: req.query.courseID}, {_id : {$not: {$in: newIds}}}]});
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
async function makeDayMap(schoolID)  {
  try {
    let startDate = moment([2018, 8, 3]);
    let endDate = moment([2019, 5, 30]);
    let yearLength = endDate.diff(startDate, "days");
    let school = await School.findOne({_id : schoolID});
    let eventsObject = {};
    if (school) {
      let weekCount = school.constantBlocks ? school.constantBlockSchedule.schedule.length : school.blockOrder.length;
      let events = await Events.find({school: school}).sort({date: "ascending"});
      let offSetEvents = await Events.find({$and: [{school : school}, {dayRolled: true}]}).sort({date: "ascending"});
      let schoolSkipped = await Events.find({$and: [{school : school}, {schoolSkipped : true}]}).sort({date: "ascending"});
      {
        let currentDayDay = 0;
        let currentDayWeek = 0;
        let currentIndex = 0;
        let currentSkippedIndex = 0;
        let currentEventIndex = 0;
        let currentReminderIndex = 0;
        let currentDate = startDate.clone();
        for (var i = 0; i < yearLength; i++) {
          //what the current 'day' is, if the 'day' value is displayed,,if there is an event on that day, and all the reminders for that day
          let currentDayArray = [[0,0], true, false, [], []];
          currentDate.add(1, "days");
          if (currentDate.day() == 0 || currentDate.day() == 6) {
            currentDayArray[1] = false;
            currentDayArray[2] = false;
          }
          while(currentEventIndex < events.length && moment([events[currentEventIndex].date.getFullYear(), events[currentEventIndex].date.getMonth(), events[currentEventIndex].date.getDate()]).valueOf() <= currentDate.valueOf()) {
            if (events[currentEventIndex].date.getFullYear() == currentDate.year() && events[currentEventIndex].date.getMonth() == currentDate.month() && events[currentEventIndex].date.getDate() == currentDate.date() && events[currentEventIndex].displayedEvent) {
              currentDayArray[3].push(events[currentEventIndex]);
              currentDayArray[2] = true;
            }
            currentEventIndex++;
          }
          while(currentSkippedIndex < schoolSkipped.length && moment([schoolSkipped[currentSkippedIndex].date.getFullYear(), schoolSkipped[currentSkippedIndex].date.getMonth(), schoolSkipped[currentSkippedIndex].date.getDate()]).valueOf() <= currentDate.valueOf()) {
            if (schoolSkipped[currentSkippedIndex].date.getFullYear() == currentDate.year() && schoolSkipped[currentSkippedIndex].date.getMonth() == currentDate.month() && schoolSkipped[currentSkippedIndex].date.getDate() == currentDate.date()) {
              currentDayArray[1] = false;
            }
            currentSkippedIndex++;
          }
          while(currentIndex < offSetEvents.length &&  moment([offSetEvents[currentIndex].date.getFullYear(), offSetEvents[currentIndex].date.getMonth(), offSetEvents[currentIndex].date.getDate()]).valueOf() <= currentDate.valueOf()) {
            if (offSetEvents[currentIndex].date.getFullYear() == currentDate.year() && offSetEvents[currentIndex].date.getMonth() == currentDate.month() && offSetEvents[currentIndex].date.getDate() == currentDate.date()) {
              currentDayArray[1] = false;
            }
            //rolls the day
            currentDayDay -= 1;
            while (currentDayDay < 0) {
              currentDayWeek -= 1;
              currentDayDay += 5;
            }
            while (currentDayDay > 4) {
              currentDayWeek += 1;
              currentDayDay -= 5;
            }
            while (currentDayWeek < 0) {
              currentDayWeek += weekCount;
            }
            while (currentDayWeek > weekCount-1) {
              currentDayWeek-= weekCount;
            }
            //makes sure it isnt negative
            
            //takes it mod 5 to be a day of the week
            currentIndex++;
          }
          currentDayArray[0] = [currentDayWeek, currentDayDay];

          eventsObject[`${currentDate.year()}_${currentDate.month()}_${currentDate.date()}`] = currentDayArray;
          if (currentDate.day() != 0 && currentDate.day() != 6) {
            currentDayDay += 1;
            while (currentDayDay < 0) {
              currentDayWeek -= 1;
              currentDayDay += 5;
            }
            while (currentDayDay > 4) {
              currentDayWeek += 1;
              currentDayDay -= 5;
            }
            while (currentDayWeek < 0) {
              currentDayWeek += weekCount;
            }
            while (currentDayWeek > weekCount-1) {
              currentDayWeek-= weekCount;
            }
          } else {
            currentDayArray[1] = false;
          }
        }
      }
    }
    
    return eventsObject;
  } catch(e) {
    console.log(e);
    return {};
  }
}
app.get("/dayMap", async function(req, res) {
  if (req.query.schoolId) {
    let map = await makeDayMap(req.query.schoolId);
    res.send(map);
  } else {
    res.send({});
  }
});
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
  try {
    let sendObject = {

    }
    if (req.query.schoolId) {
      console.log(req.query);
      let map = await makeDayMap(req.query.schoolId);
      sendObject["dayMap"] = map;
      let school = await School.findOne({_id : req.query.schoolId}).populate("semesters");
      let semesters = school.semesters;
      sendObject.semesters = semesters;
      let courses = await Course.find({school : req.query.schoolId}).populate("teacher").populate("category");
      courses = JSON.parse(JSON.stringify(courses));
      for (var i = 0; i < courses.length; i++) {
        courses[i].teacher = courses[i].teacher.prefix + courses[i].teacher.lastName;
        courses[i].category = courses[i].category.category;
      }
      // let categories = await Categories.find({school: school._id});
      let events = await Events.find({school : req.query.schoolId});
      sendObject.school = school;
      sendObject.courses = courses;
      sendObject.events = events;
      if (req.query.username && req.query.password) {
        let response = await User.authenticate(req.query.username, req.query.password, school._id);
        sendObject.user = response;
      }
    }
    console.log(sendObject);
    res.send(JSON.stringify(sendObject));
  } catch(e) {
    console.log(e);
    res.send({});
  }
    
});