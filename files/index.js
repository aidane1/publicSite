let express = require("express");

let mongoose = require("mongoose");

let fs = require("fs");

let bodyParser = require("body-parser");

let User = require("../models/userchar");

let Course = require("../models/coursechar");

let session = require("express-session");

let Events = require("../models/eventschar");

let socket = require("socket.io")

let cookieParser = require("cookie-parser");

let Texts = require("../models/textchar.js");

let Resources = require("../models/resourcechar.js");

let nodemailer = require("nodemailer");


mongoose.connect("mongodb://127.0.0.1/users");

mongoose.connection.once("open", function() {
  console.log("connection has been made");
}).on("error", function(error) {
  console.log("connection error: " + error);
});

let urlencodedParser = bodyParser.urlencoded({extended: false});

let app = express();

app.set("view engine", "ejs");

app.use(session({
  secret: 'a1q2T5-8#1+59',
  resave: true,
  saveUninitialized: false
}));

app.use(express.static('public'));

app.use(cookieParser());


let server = app.listen(4000, function() {
  console.log("listening for requests");
});


app.get("/", function(req, res) {

  let currentDate = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (!user) {
        res.redirect("/login");
      } else {
        var courseCodes = [];
        user.courses.forEach(function(theCourse) {
          courseCodes.push(theCourse._id);
        });
        Course.find({_id : courseCodes}, function(err, foundCourse) {
          var homeworkList = [];
          foundCourse.forEach(function(homeworkCourse) {
            homeworkList.push([homeworkCourse.course, homeworkCourse.homework]);
          });
          // var todaysBlocks = blockToTime((currentDate).getDay() -1);
          var todaysBlocks = blockToTime(0);
          var todaysOrderedClasses = [];

          for (var i = 0; i < todaysBlocks.length; i++) {
            var foundBlock = false;
            for (var j = 0; j < user.courses.length; j++) {
              if (user.courses[j].block === todaysBlocks[i]) {

                todaysOrderedClasses.push(user.courses[j].course);
                foundBlock = true;
              }
            }
            if (!foundBlock) {
              todaysOrderedClasses.push("LC's");
            }
          }

          Events.find({month : (currentDate).getMonth(), year : (currentDate).getFullYear()}, function(err, monthEvent) {
            let daysArray = [];
            let dayEvents = [];
            for (var i = 0; i < getDays(currentDate.getMonth()); i++) {
              let todayArray = [];
              let eventToday = false;
              dayEvents = [];
              for (var j = 0; j < monthEvent.length; j++) {
                if (monthEvent[j].day === i) {
                  eventToday = true;
                  dayEvents.push(monthEvent[j].time + ": " + monthEvent[j].info);
                }
              }
              if (!eventToday) {
                todayArray.push([]);
              } else {
                todayArray.push(dayEvents);
              }

              todayArray.push(i);
              todayArray.push(((new Date(months[currentDate.getMonth()] + "1" + currentDate.getFullYear())).getDay()+i)%7);
              daysArray.push(todayArray);

            }
            var courseCodes = [];
            for (var i = 0; i < user.courses.length; i++) {
              courseCodes.push(user.courses[i].code);
            }
            Resources.find({class : courseCodes}, function(err, resource) {
              // res.render("index",  {courses : user.courses, homework : homeworkList, todaysCourses : blockToTime((currentDate).getDay() -1)});

              user.courses.forEach(function(userCourse) {
                userCourse.resource = [];
                for (var i = 0; i < resource.length; i++) {
                  if (userCourse.code === resource[i].class) {

                    userCourse.resource.push(resource[i]);
                  }
                }

              });

              res.render("index",  {courses : user.courses, homework : homeworkList, todaysCourses : blockToTime(3), blockOrder : todaysOrderedClasses, calendar : daysArray, month: months[currentDate.getMonth()], lcSchedule : lcSchedule(3)});
            });

          });
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});




app.get("/login", function(req, res) {
  res.render("login", {error: ""})
})
app.post("/login", urlencodedParser, async (req, res, next) => {
  try {
    let response = await User.authenticate(req.body.logname, req.body.logword);
    req.session.userId = response._id;
    res.cookie("sessionID", response._id);
    res.redirect('/');
  } catch(e) {
    console.log(e);
    res.render("login", {error : "Username or Password incorrect. Please try again."});
  }
});




app.get("/signup", function(req, res) {
  res.render("signup", {error : "", data : ["", "", "", ""]});
});
app.post("/signup", urlencodedParser, function(req, res) {
  if (req.body.password != req.body.passwordConf) {
    res.render("signup", {error : "Error : passwords do not match", data : [req.body.email, req.body.firstName, req.body.lastName]});
  } else if (req.body.username && req.body.firstName && req.body.lastName && req.body.password && (req.body.password === req.body.passwordConf)) {
    var userData = {
      firstName: req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1),
      lastName: req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1),
      username: req.body.username,
      password: req.body.password,
      email: req.body.username
    }
    try {
      User.create(userData,function(error, user) {
        if (error) {
          console.log(error);
          res.render("signup", {error : "Username is already being used. Please try again.", data : ["", req.body.firstName, req.body.lastName]});
        } else {
          req.session.userId = user._id;
          res.cookie("sessionID", req.session.userId);
          return res.redirect("/courses");
        }
      });
    } catch(e) {
      console.log(e);
    }


  } else {
    res.redirect("/signup");
  }
});




app.get("/courses", function(req, res) {
    if (req.session.userId) {
      res.render("addCourses");
    } else {
      res.redirect("/login");
    }
});
app.post("/courses", urlencodedParser, function(req, res) {
  if (req.session.userId) {
    Course.find({ code: req.body.coursesCode, block: req.body.coursesBlock }, (err, theCourse) => {

      let badCourses = [];
      let goodCourses = [];
      if (typeof req.body.coursesCode === "string") {
        goodCourses.push(theCourse);
      } else {
        for (var i = 0; i < req.body.coursesBlock.length; i++) {
          var currentCheck = req.body;
          theCourse.forEach(function(course) {
            if (course.code === currentCheck.coursesCode[i] && course.block === currentCheck.coursesBlock[i]) {
              goodCourses.push(course);
            }
          });
        }
      }
      theCourse = goodCourses;



      if (typeof req.body.coursesCode === "string") {
        if (theCourse === undefined || theCourse.length == 0) {
          badCourses.push(req.body.coursesCode);
        }
      } else {

        if (req.body.coursesCode.length != theCourse.length) {
          for (var i = 0; i < req.body.coursesCode.length; i++) {
            var found = false;
            for (var j = 0; j < theCourse.length; j++) {
              if (theCourse[j].code === req.body.coursesCode[i]) {
                found = true;
              }
            }
            if (!found) {
              badCourses.push(req.body.coursesCode[i]);
            }
          }
        } else {

        }
      }

      User.findOneAndUpdate({_id : req.session.userId}, {courses : theCourse}).then(function() {

      });
    });


    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});
