function getDays(month) {
  switch (month) {
    case 0:
      return 31;
      break;
    case 1:
      var currentYear = ((new Date())).getFullYear();
      if (currentYear % 4 === 0 && ((currentYear % 100 != 0) || (currentYear % 400 === 0))) {
        return 29;
      } else {
        return 28;
      }
      break;
    case 2:
      return 31;
      break;
    case 3:
      return 30;
      break;
    case 4:
      return 31;
      break;
    case 5:
      return 30;
      break;
    case 6:
      return 31;
      break;
    case 7:
      return 31;
      break;
    case 8:
      return 30;
      break;
    case 9:
      return 31;
      break;
    case 10:
      return 30;
      break;
    case 11:
      return 31;
      break;
  }
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function blockToTime(day) {
  // let schedule = [[["A", 2], ["B", 3], ["C",2], ["D", 3]],[["B", 2], ["C", 3], ["D", 2], ["E", 3]],[["C", 2], ["D", 3], ["E", 2], ["A", 3]],[["D", 2], ["E", 3], ["A", 2], ["B", 3]],[["E", 2], ["A",3], ["B",2], ["C",3]]];
  let schedule = [["A", "B", "C", "D", "E"], ["E", "D", "B", "C", "A"], ["D", "A", "C", "B", "E"], ["B", "C", "E", "A", "D"], ["D", "B", "A", "E", "C"]];

  if (day === -1 || day === 5) {
    return false;
  }
  return schedule[day];
}
function lcSchedule(day) {
  let schedule = [["Mr. Austin, room 31", "Mr. Fraser, room 28", "Open foods, room 17", "Mr. foxx, room 30", "Mme. Arthurson, room 41", "Open shop, room 50"], ["Mr. Austin, room 31", "Mr. Fraser, room 28", "Open foods, room 17", "Mr. foxx, room 30", "Mme. Arthurson, room 41", "Open shop, room 50"], ["Mr. Austin, room 31", "Mr. Fraser, room 28", "Open foods, room 17", "Mr. foxx, room 30", "Mme. Arthurson, room 41", "Open shop, room 50"], ["Mr. Austin, room 31", "Mr. Fraser, room 28", "Open foods, room 17", "Mr. foxx, room 30", "Mme. Arthurson, room 41", "Open shop, room 50"], ["Mr. Austin, room 31", "Mr. Fraser, room 28", "Open foods, room 17", "Mr. foxx, room 30", "Mme. Arthurson, room 41", "Open shop, room 50"]];
  if (day === -1 || day === 5) {
    return false;
  }
  return schedule[day];
}
function profanityFilter(string) {
  return string.replace(/c+\s*h+\s*o+\s*d+\s*e+|c+\s*o+\s*c+\s*k+|p+\s*u+\s*s+\s*s+\s*y+|d+\s*i+\s*c+\s*k+|f+\s*u+\s*c+\s*k+\s*i+\s*n+\s*g+|f+\s*a\s*g\s*g\s*o\s*t|j\s*i\s*v\s*e|n\s*i\s*g\s*g\s*e\s*r|n\s*i\s*g\s*g\s*a|c\s*o\s*o\s*n|j\s*a\s*p|f\s*u\s*c\s*k|s\s*h\s*i\s*t|b\s*i\s*t\s*c\s*h|c\s*u\s*n\s*t|w\s*h\s*o\s*r\s*e/gi, "****");
}
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


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

let Posts = require("../models/postchar.js");

let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pvsstudents@gmail.com",
    pass: "AidanEglin2002pvstudents"
  }
});


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
  saveUninitialized: false,
  cookie: {
    maxAge: 1000*86400*7
  }
}));

app.use(express.static(__dirname));

app.use(cookieParser());

app.enable('trust proxy');


app.use (function (req, res, next) {
  if (req.secure) {
    next();
  } else {
    res.redirect('https://' + req.headers.host + req.url);
  }
});


let server = app.listen(80, function() {
  console.log("listening for requests");
});


app.get("/periodic-table", function(req, res) {
  res.render("periodicTable");
});



app.get("/", function(req, res) {
  let currentDate = new Date();
  res.cookie("path", "/");
  if(req.session.userId) {
    let homeworkList = [];
    let todaysOrderedClasses = [];
    let courseCodes = [];
    let daysArray = [];
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (!user) {
        res.redirect("/login");
      } else {
        Course.find({_id : user.courses}, function(err, courses) {
          //pushes all the course codes onto an array for use in resources, and pushes all the course's homework onto an array to pass to the index.ejs file
          courses.forEach(function(course) {
            courseCodes.push(course.code);
            homeworkList.push([course.course, course.homework, course.block, course.teacher])
          });
          //gets the order of todays blocks from a function
          let todaysBlocks = blockToTime((currentDate).getDay() -1);
          //itterates through those blocks and find which course matches the block
          for (var i = 0; i < todaysBlocks.length; i++) {
            //finds matching courses using the array.find method and pushing the result to todaysOrderedClasses
            todaysOrderedClasses.push(courses.find(course => {
              return course.block === todaysBlocks[i];
            }));
          }
          //the find function returns the whole class, not just the block. aditionally, it may return undefined if you dont have a course during a block in which case it should return LC's
          //this line turns undefined into LC's and makes it just the course name
          todaysOrderedClasses = todaysOrderedClasses.map(todayCourse => todayCourse == undefined ? "LC's" : todayCourse.course);
          //gathers the events from the past month for the calendar
          Events.find({month : (currentDate).getMonth(), year : (currentDate).getFullYear()}, function(err, monthEvent) {
            //makes a for loop that itterates as many times as their are days in the current month
            for (var i = 0; i < getDays(currentDate.getMonth()); i++) {
              let todayArray = [];
              let dayEvents = [];
              for (var j = 0; j < monthEvent.length; j++) {
                if (monthEvent[j].day === i) {
                  //if one of the month's events happens on this day, add it to the array
                  dayEvents.push(monthEvent[j].time + ": " + monthEvent[j].info);
                }
              }
              //after we've gone through all the month's events, add them to a 'todayArray' along with the day of the month, and the day of the week.
              todayArray.push(dayEvents);
              todayArray.push(i);
              todayArray.push(((new Date(months[currentDate.getMonth()] + "1" + currentDate.getFullYear())).getDay()+i)%7);
              //push todays array onto the month array
              daysArray.push(todayArray);
            }
            //gathers the resources and assigns them to their induvidual classes
            Resources.find({class: courseCodes}, function(err, resource) {
              //itterates through all the courses
              courses.forEach(function(course) {
                //gives all the courses a property 'resources' that is blank
                course.resource = [];
                for (var i = 0; i < resource.length; i++) {
                  //if the resources class matches the courses code, add that resource as one of the resources for the class
                  if (course.code === resource[i].class) {
                    course.resource.push(resource[i]);
                  }
                }
              });
              res.render("index", {courses: courses, homework: homeworkList, todaysCourses: blockToTime((currentDate).getDay() -1), blockOrder: todaysOrderedClasses, calendar: daysArray, month: months[currentDate.getMonth()], lcSchedule: lcSchedule(((currentDate).getDay() -1)), permissions: user.permissions});
              // res.render("index",  {courses : user.courses, homework : homeworkList, todaysCourses : blockToTime(3), blockOrder : todaysOrderedClasses, calendar : daysArray, month: months[currentDate.getMonth()], lcSchedule : lcSchedule(3), permissions: user.permissions});
            });
          });
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});

// app.get("/", function(req, res) {
//   let currentDate = new Date();
//   res.cookie("path", "/");
//   if (req.session.userId) {
//     User.findOne({_id : req.session.userId}, function(err, user) {
//
//       if (!user) {
//         res.redirect("/login");
//       } else {
//         var courseCodes = [];
//         user.courses.forEach(function(theCourse) {
//           courseCodes.push(theCourse._id);
//         });
//         Course.find({_id : courseCodes}, function(err, foundCourse) {
//           var homeworkList = [];
//           foundCourse.forEach(function(homeworkCourse) {
//             homeworkList.push([homeworkCourse.course, homeworkCourse.homework, homeworkCourse.block]);
//           });
//           // var todaysBlocks = blockToTime((currentDate).getDay() -1);
//           var todaysBlocks = blockToTime(0);
//           var todaysOrderedClasses = [];
//
//           for (var i = 0; i < todaysBlocks.length; i++) {
//             var foundBlock = false;
//             for (var j = 0; j < user.courses.length; j++) {
//               if (user.courses[j].block === todaysBlocks[i]) {
//
//                 todaysOrderedClasses.push(user.courses[j].course);
//                 foundBlock = true;
//               }
//             }
//             if (!foundBlock) {
//               todaysOrderedClasses.push("LC's");
//             }
//           }
//
//           Events.find({month : (currentDate).getMonth(), year : (currentDate).getFullYear()}, function(err, monthEvent) {
//             let daysArray = [];
//             let dayEvents = [];
//             for (var i = 0; i < getDays(currentDate.getMonth()); i++) {
//               let todayArray = [];
//               let eventToday = false;
//               dayEvents = [];
//               for (var j = 0; j < monthEvent.length; j++) {
//                 if (monthEvent[j].day === i) {
//                   eventToday = true;
//                   dayEvents.push(monthEvent[j].time + ": " + monthEvent[j].info);
//                 }
//               }
//               if (!eventToday) {
//                 todayArray.push([]);
//               } else {
//                 todayArray.push(dayEvents);
//               }
//
//               todayArray.push(i);
//               todayArray.push(((new Date(months[currentDate.getMonth()] + "1" + currentDate.getFullYear())).getDay()+i)%7);
//               daysArray.push(todayArray);
//
//             }
//             var courseCodes = [];
//             for (var i = 0; i < user.courses.length; i++) {
//               courseCodes.push(user.courses[i].code);
//             }
//             Resources.find({class : courseCodes}, function(err, resource) {
//               // res.render("index",  {courses : user.courses, homework : homeworkList, todaysCourses : blockToTime((currentDate).getDay() -1)});
//
//               user.courses.forEach(function(userCourse) {
//                 userCourse.resource = [];
//                 for (var i = 0; i < resource.length; i++) {
//                   if (userCourse.code === resource[i].class) {
//
//                     userCourse.resource.push(resource[i]);
//                   }
//                 }
//
//               });
//
//               res.render("index",  {courses : user.courses, homework : homeworkList, todaysCourses : blockToTime(3), blockOrder : todaysOrderedClasses, calendar : daysArray, month: months[currentDate.getMonth()], lcSchedule : lcSchedule(3), permissions: user.permissions});
//             });
//
//           });
//         });
//       }
//     });
//   } else {
//     res.redirect("/login");
//   }
// });
app.post("/", urlencodedParser, function(req,res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err) {
        res.redirect('/login');
      } else {
        if (user.permissions === "admin") {
          let course = req.body.removedHomework.split("_").slice(0,2).join(" ");
          let block = req.body.removedHomework.split("_")[2];
          let index = parseInt(req.body.removedHomework.split("_")[4]);
          console.log(req.body.Homwork);
          let teacher = (req.body.removedHomework.split("_")[3]);
          console.log(teacher);
          Course.findOne({course: course, block: block, teacher: teacher}, function(err, theCourse) {
            if (err) {
              console.log("yeet");
              res.redirect("/login");
            } else {
              if(theCourse != null && theCourse != "" && theCourse.course) {
                let homework;
                if (theCourse.homework.length === 1) {
                  homework = [];
                } else {
                  theCourse.homework.splice(index, 1);
                }
                Course.findOneAndUpdate({_id : theCourse.id}, {homework : theCourse.homework}).then(function() {
                  res.redirect("/");
                });
              } else {
                res.redirect("/login");
              }
            }

          });
        } else {
          res.redirect("/login");
        }
      }
    })
  } else {
    res.redirect("/login");
  }
});



app.get("/login", function(req, res) {
  res.render("login", {error: ""});
})
app.post("/login", urlencodedParser, async (req, res, next) => {
  try {
    let response = await User.authenticate(req.body.logname, req.body.logword);
    req.session.userId = response._id;
    res.cookie("sessionID", response._id);
    res.redirect(req.cookies.path || "/");
  } catch(e) {
    console.log(e);
    res.render("login", {error : "Username or Password incorrect. Please try again."});
  }
});




app.get("/signup", function(req, res) {
  res.cookie("path", "/signup");
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
    res.cookie("path", "/courses");
    if (req.session.userId) {
      res.render("addCourses");
    } else {
      res.redirect("/login");
    }
});
app.post("/courses", urlencodedParser, function(req, res) {
  console.log(req.body);
  if (req.session.userId && req.body.coursesCode) {
    Course.find({ code: req.body.coursesCode, block: req.body.coursesBlock, teacher: req.body.coursesTeacher }, (err, theCourse) => {
      let badCourses = [];
      let goodCourses = [];
      if (typeof req.body.coursesCode === "string") {

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

      theCourse = theCourse.map(x => mongoose.Types.ObjectId(x._id));
      User.findOneAndUpdate({_id : req.session.userId}, {courses : theCourse}).then(function() {
        res.redirect("/");
      });
    });

  } else {
    res.redirect("/login");
  }
});




app.get("/add", function(req, res) {
  res.cookie("path", "/add");
  if (req.session.userId) {
      res.sendFile(__dirname + "/add.html");
  } else {
    res.redirect("/login");
  }

});
app.post("/add", urlencodedParser, function(req, res) {
  User.findOne({_id : req.session.userId}, function(err, user) {
    if (err) {
      res.redirect("/");
    } else {
      if (user != undefined && user.permissions === "admin") {
        if (req.body.teacher && req.body.course && req.body.block && req.body.code) {
          var courseData = {
            teacher : req.body.teacher,
            course : req.body.course.toLowerCase(),
            block : req.body.block.toUpperCase(),
            code : req.body.code.toUpperCase()
          }
          Course.create(courseData, function() {
            res.redirect("/add");
          });
        } else if (req.body.year) {
          if (req.body.year && req.body.month && req.body.day && req.body.time && req.body.info) {
            var eventData = {
              year: req.body.year,
              month: req.body.month-1,
              day: req.body.day-1,
              time: req.body.time,
              info: req.body.info
            }
            Events.create(eventData, function() {
              res.redirect("/add");
            })
          }
        } else if (req.body.url) {
          if (req.body.url && req.body.class && req.body.type && req.body.description) {
            var resourceData = {
              url: req.body.url,
              class: req.body.class,
              type: req.body.type,
              description: req.body.description
            }
            Resources.create(resourceData, function() {
              res.redirect("/add");
            });
          }
        }
      } else {
        res.redirect("/login");
      }
    }
  })
});



app.get("/calendar", function(req, res) {
  res.cookie("path", "/calendar");
  let currentDate = new Date();
  let monthsArray = [];
  let monthsNames = ["September", "October", "November", "December", "January", "February", "March", "April", "May", "June"];
  Events.find({}, function(err, yearEvent) {
    let theDay = new Date("september 1" + currentDate.getFullYear().toString()).getDay();
    let daysArray = [];
    let sumDays = 0;
    let foundEvent = false;
    for (var i = 0; i < 10; i++) {
      let currentMonth = [];
      for (var j = 0; j < getDays((i+8)%12); j++) {
        let dayEvents = [];
        foundEvent = false;
        for (var k = 0; k < yearEvent.length; k++) {
          if (yearEvent[k].month === (i+8)%12 && yearEvent[k].day === j) {
            foundEvent = true;
            dayEvents.push(yearEvent[k].time + ": " + yearEvent[k].info);
          }
        }
        currentMonth.push([dayEvents, j, (theDay%7)]);
        theDay++;
      }
      monthsArray.push(currentMonth);
    }


    res.render("calendar", {calendar : monthsArray, months : monthsNames});
  });

});



app.get("/submit", function(req, res) {
  res.cookie("path", "/submit");
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      Course.find({_id : user.courses}, function(err, courses) {
        res.render("submitWork", {user : user.username, courses : courses, error : ""});
      });
    });
  } else {
    res.redirect("/login");
  }
});
app.post("/submit", urlencodedParser, function(req, res) {
  var tampered = false;
  for (var key in req.body) {
    if (key != "courseID" && key != "page" && key != "questions" && key != "assignment" && key != "notes" && key != "submittedBy" && key != "confirmed") {
      tampered = true;

    }
  }
  if (req.session.userId && !tampered) {
      let homeworkObject = {
        submittedBy: req.body.submittedBy,
        confirmed: req.body.confirmed,
        page: req.body.page,
        assignment: profanityFilter(req.body.assignment),
        notes: profanityFilter(req.body.notes),
        questions: profanityFilter(req.body.questions),
        date: new Date()
      }

      Course.findOneAndUpdate({_id : mongoose.Types.ObjectId(req.body.courseID)}, {$push:{homework : homeworkObject}}).then(function() {
        res.redirect("/");
      });


  } else if (!req.session.userId) {
    res.redirect("/login");
  } else if (tampered) {
    //gonna add a ban function
    User.findOneAndUpdate({_id : req.session.userId}, {banned : true}).then(function() {
        res.redirect("/login?banned=true");
    });
  }
});



app.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/login");
});

app.get("/suggestions", function(req, res) {
  res.cookie("path", "/suggestions");
  if (req.session.userId) {
    res.render("suggestions");
  } else {
    res.redirect("/login");
  }
});
app.post("/suggestions", urlencodedParser, function(req, res) {

  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (((new Date()).getTime() - user.suggestions[user.suggestions.length-1][1].getTime())/1000 < 900) {




        res.redirect("/");
      } else {

        let mailOptions = {
          from: "pvsstudents@gmail.com",
          to: "aidaneglin@gmail.com",
          subject: "user suggestion",
          text: req.body.body + "\n\n\nsubmitted by: " + user.firstName + " " + user.lastName + " (" + user.username + ")"
        }
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
              console.log(error)
            res.redirect("/")
          } else {
            let suggestions = user.suggestions;
            suggestions.push([req.body.body, new Date()]);
            User.findOneAndUpdate({_id : req.session.userId}, {suggestions: suggestions}).then(function() {
              res.redirect("/");
            });
          }
        });
      }
    });



  } else {
    res.redirect("/login");
  }
});


app.get("/questions", function(req, res) {
  res.cookie("path", "/questions?page=" + req.query.page);
  if (req.session.userId) {
    if (req.query.page == undefined) {
      res.redirect("/questions?page=0");
    } else {
      Posts.Post.find({}).sort({"date": -1}).limit(parseInt(req.query.page)*20+20).exec(function(err, posts) {
        posts = posts.slice((parseInt(req.query.page))*20);
        User.findOne({_id : req.session.userId}, function(error, user) {
          Posts.Post.countDocuments({}, function(err, count) {
            res.render("questions", {posts: posts, user: user, page: parseInt(req.query.page), max: Math.ceil(count/20)});
          });
        })
      });
    }

  } else {
    res.redirect("/login");
  }

});
app.post("/questions", urlencodedParser, function(req, res) {
  if(req.session.userId) {
    if (req.body.deleteElement) {
       User.findOne({_id : req.session.userId}, function(err, user) {
         if (user.permissions === "admin") {
           Posts.Post.remove({_id : req.body.deleteElement}).then(() => {
              Posts.Comment.remove({parentPost : req.body.deleteElement}).then(() => {
                res.redirect("/questions?page=0");
              });
           });


         } else {
           res.redirect("/login");
         }
       });
    } else {
      let info = {
        body: req.body.body,
        title: req.body.title,
        submittedBy: req.body.anon,
        date: new Date()
      }
      Posts.Post.create(info, function(err, post) {
        res.redirect("/questions");
      });
    }
  } else {
    res.redirect("/login");
  }

});

app.get("/questions/:id", function(req, res) {
  res.cookie("path", "/questions/" + req.params.id);
  if (req.session.userId) {
    Posts.Post.findOne({_id : req.params.id}, function(err, post) {
      if (!post) {
        //do stuff if they search for a bad post
        res.redirect("/questions")
      } else {
        Posts.Comment.find({_id : post.comments}, function(error, comments) {
          res.render("comment", {post: post, comments: comments, id : req.params.id});
        });
      }
    });
  } else {
    res.redirect("/login");
  }

});
app.post("/questions/:id", urlencodedParser, function(req, res) {
  console.log(req.body);
  console.log(req.params);
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      let params = {
        parentPost: mongoose.Types.ObjectId(req.params.id),
        body: req.body.comment,
        submittedBy: user.username
      }
      Posts.Comment.create(params, function(err, comment) {
        console.log(comment);
        Posts.Post.findOne({_id : mongoose.Types.ObjectId(req.params.id)}, function(err, post) {
          console.log(post)
            Posts.Post.findOneAndUpdate({_id : post._id}, {$push:{comments : comment._id}}).then(function() {
              console.log(post);
              res.redirect("/questions/" + req.params.id);
            });
        });


      })
    });

  }
});


app.get("/chatroom", function(req,res) {
  res.cookie("path", "/chatroom");
  if (req.session.userId) {
    let currentDate = new Date();
    Texts.find({date: {$gt:new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), (currentDate.getHours()-1) < 0 ? 23 : currentDate.getHours()-1)}}, function(err, texts) {
      texts.sort(function(a, b) {
        return a.date>b.date ? 1 : a.date<b.date ? -1 : 0;
      });
      for (var i = 0; i < texts.length; i++) {
        texts[i].body = profanityFilter(texts[i].body);
      }
      User.findOne({_id : req.session.userId}, function(err, user) {
        res.render("roomchat", {texts: texts, permissions : user.permissions});
      });

    });

  } else {
    res.redirect("/login");
  }
});
app.post("/chatroom", urlencodedParser, function(req, res) {
  User.findOne({_id : req.session.userId}, function(err, user) {
    if (err) {
      res.redirect("/chatroom");
    }
     else {
       if (user.permissions === "admin") {
         User.findOne({username : req.body.mutedUser}, function(error, mute) {
           if (error) {
             res.redirect("/chatroom");
           } else {
             if (mute.permissions != "admin") {
               User.findOneAndUpdate({_id : mute._id}, {permissions: "muted"}).then(function() {
                   res.redirect("/chatroom");
               });
             } else {
               res.redirect("/chatroom");
             }
           }
         });
       } else {
         res.redirect("/chatroom");
       }
     }
  });
});


app.get("/schedule", function(req, res) {
  res.cookie("path", "/schedule");
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {

      let blockObject = {
        A: ["LC", ""],
        B: ["LC", ""],
        C: ["LC", ""],
        D: ["LC", ""],
        E: ["LC", ""]
      }
      user.courses.forEach(function(course) {
        blockObject[course.block] = [course.course, course.teacher];
      });


      res.render("schedule", {courses : blockObject});
    });

  } else {
    res.redirect("/login");
  }

});

app.get("/view-courses", function(req, res) {
  res.cookie("path", "/view-courses");
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      let blockObject = {
        A: ["LC", ""],
        B: ["LC", ""],
        C: ["LC", ""],
        D: ["LC", ""],
        E: ["LC", ""]
      }
      user.courses.forEach(function(course) {
        blockObject[course.block] = [course.course, course.teacher];
      });
      res.render("viewOther", {courses : blockObject});
    });
  } else {
    res.redirect("/login");
  }
});

let io = socket(server);
io.set('match origin protocol', true);
io.on("connection", function(socket) {
  console.log("connected!");


  socket.on("chat", function(data) {

    let id = mongoose.Types.ObjectId(data.id);
    User.findOne({_id : id}, function(err, user) {
      if (err) {

      } else {
        Texts.create({date : new Date(), body: data.message, submittedBy : user.username, firstName: user.firstName, lastName:user.lastName}, function(error, text) {
          if (error) {

          } else {

          }
        });
        data = {message : profanityFilter(data.message), username : user.username, firstName: user.firstName, lastName:user.lastName};
        console.log("first log");
        if (user.permissions != "muted") {
          console.log("got to here");
          io.emit("chat", data);
        }
      }
    });
  });
  socket.on("typing", function(data) {
    User.findOne({_id : data.id}, function(err, user) {
      if (err) {

      } else if (user.permissions != "muted"){
        socket.broadcast.emit("typing", {username: user.username, typing: data.typing});
      }
    });
  });


});
