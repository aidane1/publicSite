// Note for the future: i messed up the ISO date format. i assumed it did the same thing with days that it did
//with months. That is, subtract one from the actual day. it does not. please change in the future


//a function to offset the days based on proDdays
function dayOffset(date, all = false) {
  let offSetArray = [
    new Date(2018, 8, 3, 0, 0, 0, 0), new Date(2018, 8, 17, 0, 0, 0, 0), new Date(2018, 9, 5, 0, 0, 0, 0), new Date(2018, 9, 8, 0, 0, 0, 0),
    new Date(2018, 9, 19, 0, 0, 0, 0), new Date(2018, 10, 12, 0, 0, 0, 0), new Date(2018, 10, 13, 0, 0, 0, 0), new Date(2018, 11, 24, 0, 0, 0, 0),
    new Date(2018, 11, 25, 0, 0, 0, 0), new Date(2018, 11, 26, 0, 0, 0, 0), new Date(2019, 0, 28, 0, 0, 0, 0), new Date(2019, 1, 15, 0, 0, 0, 0), new Date(2019, 1, 18, 0, 0, 0, 0),
    new Date(2019, 3, 19, 0, 0, 0, 0), new Date(2019, 3, 22, 0, 0, 0, 0), new Date(2019, 3, 23, 0, 0, 0, 0), new Date(2019, 4, 17, 0, 0, 0, 0),
    new Date(2019, 4, 20, 0, 0, 0, 0)
  ];
  if (all) {
    return offSetArray;
  }
  let offSet = 0;
  for (var i = 0; i < offSetArray.length; i++) {
    if (date.getTime() > offSetArray[i].getTime()) {
      offSet += 1;
    }
  }
  return offSet;
}

//i use this to convert from UTC to local time
Date.prototype.addMinutes = function(h) {
   this.setTime(this.getTime() + (h*60*1000));
   return this;
}


//sets a date to local time
Date.prototype.local = function() {
    this.setTime(this.addMinutes(-420));
    return this;
}

function guessGrade(classes, schoolUser) {
  let schoolNum = "20" + (schoolUser.match(/\d+/));
  schoolNum = parseInt(schoolNum);
  let sumClassYears = 0;
  for (var i = 0; i < classes.length; i++) {
    sumClassYears += parseInt((classes[i].split(" ")[classes[i].split(" ").length-1]));
  }
  sumClassYears += (2001 - schoolNum + 12);
  return Math.round(sumClassYears/(classes.length + 1));
}

function holidayFont(font) {
  let date = new Date();
  if (date.getDate() == 31 && date.getMonth() == 9) {
    return "/public/fonts/HallowenInline.ttf";
    // return font;
  } else if (date.getDate() == 25 && date.getMonth() == 11) {
    return "/public/fonts/christmas.ttf";
  } else if (date.getDate() == 14 && date.getMonth() == 1) {
    return "/public/fonts/Filxgirl.TTF";
  }
  return font;
}

function getDays(month) {
  switch (month) {
    case 0:
      return 31;
      break;
    case 1:
      var currentYear = (((new Date()).local())).getFullYear();
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

function blockToTime(day, offSet, all = false) {
  // let schedule = [[["A", 2], ["B", 3], ["C",2], ["D", 3]],[["B", 2], ["C", 3], ["D", 2], ["E", 3]],[["C", 2], ["D", 3], ["E", 2], ["A", 3]],[["D", 2], ["E", 3], ["A", 2], ["B", 3]],[["E", 2], ["A",3], ["B",2], ["C",3]]];
  let schedule = [["A", "B", "C", "D", "E"], ["E", "D", "B", "C", "A"], ["D", "A", "C", "E", "B"], ["E", "C", "B", "A", "D"], ["D", "E", "A", "B", "C"]];
  if (all) {
    return schedule;
  }
  if (day === -1 || day === 5) {
    return false;
  }
  return schedule[(day-offSet%5+5)%5];
}

function lcSchedule(day, block, offset,  all = false) {
  let day1 = [["Mr.Bradshaw, room 20", "Ms.Staley, room 29", "Open Library"], ["Mr. Fraser, room 17", "Mr. Hughes, student center", "Open Foods", "Open Gym"], ["Ms. Seiler, Student Center", "Ms. Arthurson, room 30", "Open Library", "Open Dance"], ["Mr. Austin, Student Center", "Mr. Fox, room 26", "Open Library", "Open Shop"], ["Ms. Threatful, Student Center", "Ms. Staley, room 29"]];

  let day2 = [["Ms. Staley, room 29", "Open Library"], ["Mr. Fraser, Student Center", "Ms. Seiler, room 16", "Open Library"], ["Open Library", "Open Art", "Open Shop", "Open Foods"], ["Ms. Seiler, room 16", "Mr. Bradshaw, Student Center", "Ms. Arthurson, room 30", "Open Library"], ["Open Library", "Open Computer Lab, room 37"]];

  let day3 = [["Mr. Fraser, room 17", "Open Library", "Open Shop"], ["Mr. Bradshaw, room 20", "Open Gym", "Open Library", "Open Foods"], ["Mr. Seiler, room 16", "Ms. Arthurson, room 30", "Open Library", "Open Dance"], ["Ms. Staley, room 29", "Open Library"], ["Ms. Wood, room 10", "Open Art", "Open Shop"]];

  let day4 = [["Ms. Threatful, room 27", "Ms. Staley, Student Center", "Open Library"], ["Ms. Seiler, room 16", "Ms. Cowlin, Student Center", "Open Library", "Open Dance"], ["Mr. Fraser, room 17", "Mr. Hughes, Student Center", "Open Library", "Open Gym"], ["Mr. Bradshaw, room 20", "Open Library", "Open Gym", "Open Foods"], ["Mr. Austin, room 25", "Open Library", "Open Shop"]];

  let day5 = [["Mr. Fraser, room 17", "Mr. Fox, Student Center", "Open Library", "Open Shop"], ["Ms. Staley, room 29", "Open Library", "Open Shop"], ["Mr. Bradshaw, room 20", "Mr. Hughes, Student Center", "Open Foods", "Open Computer Lab, room 37"], ["Mr. Fraser, room 17", "Mr. Hughes, room 9", "Open Library", "Open Foods", "Open Gym"], ["Mr. Bradshaw, room 20", "Ms. Seiler, room 16", "Ms. Cowlin, Student Center", "Open Library"]];

  let schedule = {
    "0": day1,
    "1": day2,
    "2": day3,
    "3": day4,
    "4": day5
  }
  if (all) {
    return schedule;
  }
  if (day === -1 || day === 5) {
    return false;
  }
  if (block % 1 == 0) {
    return schedule[((day-offset%5+5)%5).toString()][block];
  } else {
    return ["None!"];
  }

}

function profanityFilter(string) {
  return string.replace(/c+\s*h+\s*o+\s*d+\s*e+\s*|c+\s*o+\s*c+\s*k+|p+\s*u+\s*s+\s*s+\s*y+|d+\s*i+\s*c+\s*k+\s*|f+\s*u+\s*c+\s*k+\s*i+\s*n+\s*g+|f+\s*a+\s*g+\s*g+\s*o+\s*t+\s*|j+\s*i+\s*v+\s*e+\s*|n+\s*i+\s*g+\s*g+\s*e+\s*r+\s*|n+\s*i+\s*g+\s*g+\s*a+\s*|c+\s*o+\s*o+\s*n+\s*|j+\s*a+\s*p+|f+\s*u+\s*c+\s*k+\s*|s+\s*h+\s*i+\s*t+\s*|b+\s*i+\s*t+\s*c+\s*h+\s*|c+\s*u+\s*n+\s*t+\s*|w+\s*h+\s*o+\s*r+\s*e+\s*/gi, "****");
}

function stringTest(string) {
  // return !(string.match(("^[A-z0-9]+$")) == null);
  return true;
}
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let express = require("express");

let mongoose = require("mongoose");

let fs = require("fs");

let http = require("http");

let querystring = require("querystring");

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

let Push = require("../models/pushchar.js");

let webpush = require("web-push");

let schedule = require("node-schedule");

let contents = fs.readFileSync("../eVariables/variables.json");
contents = JSON.parse(contents);

const PUBLIC_VAPID_KEY = contents.PUBLIC_VAPID_KEY;
const PRIVATE_VAPID_KEY = contents.PRIVATE_VAPID_KEY;
webpush.setVapidDetails('mailto:aidaneglin@gmail.com', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pvsstudents@gmail.com",
    pass: contents.emailPassword
  }
});

mongoose.connect("mongodb://127.0.0.1:27017/users", {useNewUrlParser: true});

mongoose.connection.once("open", function() {
  console.log("connection has been made");
}).on("error", function(error) {
  console.log("connection error: " + error);
});

let urlencodedParser = bodyParser.urlencoded({extended: false});

let app = express();

app.set("view engine", "ejs");

app.use(session({
  secret: contents.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000*86400*365
  }
}));

app.use(express.static(__dirname));

app.use(cookieParser());

app.enable('trust proxy');

function wwwHttpsRedirect(req, res, next) {
    if (req.secure) {
      if (req.headers.host.slice(0, 4) !== 'www.') {

        return res.redirect(301, req.protocol + '://www.' + req.headers.host + req.originalUrl);
      } else {
        next();
      }
    } else {
      if (req.headers.host.slice(0, 4) !== 'www.') {

        return res.redirect(301, 'https://www.' + req.headers.host + req.originalUrl);
      } else {
        next();
      }
    }
};
app.use(wwwHttpsRedirect);


let server = app.listen(80, function() {
  console.log("listening for requests");
});


function pushUsers(userList, data) {
  console.log(data);
  for (var i = 0; i < userList.length; i++) {
    let payload = JSON.stringify({ title: data.title, body: data.body });
    webpush.sendNotification(userList[i].code, payload).catch(error => {
      console.error(error);
    });
  }
}

// let j = schedule.scheduleJob('* * 7 * * *', function() {
//   let currentDate = (new Date()).local();
//   Events.find({$and: [{date: {$gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-1, 0, 0, 0, 0)}}, {date: {$lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0)}}]}, function(error, events) {
//     if (events.length == 0 || error) {
//
//     } else {
//
//       Push.find({}, function(err, pushes) {
//         if (err) {
//
//         } else {
//           let dataString = "Event today! " + (events[0].longForm ? events[0].longForm : events[0].info);
//           for (var i = 1; i < events.length; i++) {
//             dataString += ", ";
//             dataString += events[i].longForm ? events[i].longForm : events[i].info;
//           }
//           pushUsers(pushes, {title: dataString, data: events[0].date});
//         }
//       });
//     }
//   });
// });

app.post("/subscribe", urlencodedParser, function(req,res) {
  let subscription = JSON.parse(req.body.post);
  res.status(201).json({});
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(error, user) {
      if (error) {
        res.send("false");
      } else {
        Push.create({code: subscription, user: user.username}, function(err, push) {
          if (err) {
            res.send("false");
          } else {
            let payload = JSON.stringify({ title: 'Welcome!', body: "Notifications have been activated. We will remember the important events, so you don't have to!" });
            webpush.sendNotification(push.code, payload).catch(error => {
              console.error(error);
            });
          }
        });
      }
    })
  } else {
    res.send("false");
  }
});

app.get("/planner", function(req, res) {
  res.cookie("path", "/planner?day=" + req.query.day);
  if (req.session.userId) {
    if (req.query.day && req.query.day > 0) {
      User.findOne({_id : req.session.userId}, function(err, user) {
        let userPlans = [];
        for (var i = 0; i < user.planner.length; i++) {
          if (user.planner[i][0] == req.query.day) {
            userPlans.push(user.planner[i][1]);
          }
        }
        let colours = ["orange", "blue", "red", "green", "purple"];
        res.render("planner", {day : req.query.day, colourArray : colours, planner : userPlans, colours : user.colors, font : holidayFont(user.font)});
      });
    } else {
      res.redirect("/calendar");
    }

  } else {
    res.redirect("/login");
  }

});
app.post("/planner", urlencodedParser, function(req, res) {
  if (req.session.userId) {
    if (req.query.day && req.query.day > 0) {
      if (req.body.start && req.body.end && req.body.description) {
        let eventStartHour = parseInt(req.body.start.split(" : ")[0]);
        let eventStartMinute = parseInt(req.body.start.split(" ")[2]);
        let eventStartAmOrPm = req.body.start.split(" ")[3];
        let eventEndHour = parseInt(req.body.end.split(" : ")[0]);
        let eventEndMinute = parseInt(req.body.end.split(" ")[2]);
        let eventEndAmOrPm = req.body.end.split(" ")[3];
        eventStartHour =eventStartHour%12 +  (eventStartAmOrPm == "AM" ? 0 : 12);
        eventEndHour =eventEndHour%12 +  (eventEndAmOrPm == "AM" ? 0 : 12);
        User.findOneAndUpdate({_id : req.session.userId}, {$push: {planner: [[req.query.day, {startHour : eventStartHour, startMinute : eventStartMinute, endHour : eventEndHour, endMinute: eventEndMinute, description:req.body.description }]]}}).then(function() {
          res.redirect("/planner?day=" + req.query.day);
        })
      } else if (req.body.removedIndex) {
        let amountFoundIndex = 0;
        User.findOne({_id : req.session.userId}, function(err, user) {
          let planner = user.planner;
          for (var i = 0; i < planner.length; i++) {
            if (planner[i][0] == req.query.day) {
              if (req.body.removedIndex == amountFoundIndex) {
                planner.splice(i, 1);
                amountFoundIndex++;
              } else {
                amountFoundIndex++;
              }
            }
          }
          User.findOneAndUpdate({_id : req.session.userId}, {$set : {planner : planner}}).then(function() {
            res.redirect("/planner?day=" + req.query.day);
          });

        });
      } else {

      }

    } else {
      res.redirect("/calendar");
    }


  } else {
    res.redirect("/login");
  }

});

app.get("/periodic-table", function(req, res) {
  res.render("periodicTable");
});

app.get("/french-cards", function(req, res) {
  res.render("frenchcards");
});

app.get("/bradshaw", function(req, res) {
  res.render("bradshaw");
})

app.get("/home", function(req, res) {
  res.render("loading", {getURL : ""});
});

app.get("/", async (req, res, next) => {




  let currentDate = (new Date()).local();
  // let currentDate = new Date(2018, 8, 2, 23, 59, 0, 0);
  // console.log(currentDate.getHours());
  let dayOffSetToday = dayOffset(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
  res.cookie("path", "/");
  //makes sure the user has a session
  if (req.session.userId) {

    let user = await User.findOne({_id : req.session.userId});
    if (!user) {
      res.redirect("/login");
    } else {

      try {
        let courses = await Course.find({_id : user.courses});
        //gathers the events from the past month for the calendar
        let monthEvent = await Events.find({month : (currentDate).getMonth(), year : (currentDate).getFullYear()});
        let soonEvents = await Events.find({$and: [{date: {$gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-1, 0, 0, 0, 0)}}, {date: {$lte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 0, 0, 0, 0)}}]});
        soonEvents = soonEvents.reverse();



        //declares the top level variables that will be used
        let homeworkList = [];
        let todaysOrderedClasses = [];
        let courseCodes = [];
        let daysArray = [];
        //pushes all the course codes onto an array for use in resources, and pushes all the course's homework onto an array to pass to the index.ejs file
        courses.forEach(function(course) {
          courseCodes.push(course.code);
          homeworkList.push([course.course, course.homework, course.block, course.teacher])
        });
        //gets the order of todays blocks from a function
        //also accounts for time offsets due to pro-D days

        let todaysBlocks = blockToTime((currentDate).getDay() -1, dayOffSetToday);
        console.log((currentDate.getDay() +4 - dayOffSetToday%5)%5);
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
          for (var i = 0; i < soonEvents.length; i++) {
            soonEvents[i].dateDescription = new Date(soonEvents[i].date.getFullYear(), soonEvents[i].date.getMonth(), soonEvents[i].date.getDate()+1, 0, 0, 0, 0).toDateString();
          }


          let timeInMinutes = (currentDate.getHours())*60 + currentDate.getMinutes();
          timeInMinutes -= (9*60 + 10);
          let blockForTime = [];

          if (timeInMinutes < 0) {
            blockForTime = [[0.5, ""], [0, "9:10-10:12 : "]];
          } else if (timeInMinutes < 72) {
            blockForTime = [[0, "9:10-10:12 : "], [1, "10:15-11:17 : "]];
          } else if (timeInMinutes < 137) {
            blockForTime = [[1, "10:15-11:17 : "], [1.5, "11:19-11:29 : "]];
          } else if (timeInMinutes < 149) {
            blockForTime = [[1.5, "11:19-11:29 : "], [2, "11:29-12:31 : "]];
          } else if (timeInMinutes < 211) {
            blockForTime = [[2, "11:29-12:31 : "], [2.5, "12:32-1:15 : "]];
          } else if (timeInMinutes < 255) {
            blockForTime = [[2.5, "12:32-1:15 : "], [3, "1:16-2:18 : "]];
          } else if (timeInMinutes < 318) {
            blockForTime = [[3, "1:16-2:18 : "], [4, "2:21-3:23 : "]];
          } else if (timeInMinutes < 383) {
            blockForTime = [[4, "2:21-3:23 : "], [3.5, ""]];
          } else {
            blockForTime = [[3.5, ""], [3.5, ""]];
          }
          if (currentDate.getDay() == 0 || currentDate.getDay() == 6) {
            blockForTime = [[3.5, ""], [3.5, ""]];
          }



          res.render("index", {blockDay: ((currentDate.getDay() +4 - dayOffSetToday%5)%5)+1, currentBlock: blockForTime, font: holidayFont(user.font), order: user.order, colours: user.colors, username: user.username, courses: courses, homework: homeworkList, todaysCourses: blockToTime((currentDate).getDay() -1, dayOffSetToday), blockOrder: todaysOrderedClasses, calendar: daysArray, month: months[currentDate.getMonth()], lcSchedule: lcSchedule(((currentDate).getDay() -1), blockForTime[0][0], dayOffSetToday), permissions: user.permissions, soonEvents: soonEvents});
        });
      } catch(e) {
        console.log(e);
        res.redirect("/down");
      }

    }
  } else {
    res.redirect("/login");
  }
});

//the only purpose of this function as of right now is to delete user submitted homework
app.post("/", urlencodedParser, function(req,res) {
  //makes sure the user has a session
  if (req.session.userId && req.body.removedHomework) {

    //finds the corrosponding user
    User.findOne({_id : req.session.userId}, function(err, user) {
      //redirects to login if there is a database error... will change this later.
      if (err) {
        res.redirect('/login');
      } else {


        //the next four lines just parse the data that was sent in the form of a string seperated by underscores
        let course = req.body.removedHomework.split("_").slice(0,2).join(" ");
        let block = req.body.removedHomework.split("_")[2];
        let index = parseInt(req.body.removedHomework.split("_")[4]);
        let teacher = (req.body.removedHomework.split("_")[3]);

        //finds the corrosponding course
        Course.findOne({course: course, block: block, teacher: teacher}, function(err, theCourse) {
          if (err) {
            //if an error occurs at this point, redirect to home
            res.redirect("/");
          } else {
            //makes sure the course exists, and isn't empty
            if(theCourse != null && theCourse != "" && theCourse.course) {
              //declares homework variable for later use
              let homework;

              //if the homework was submitted by the person who clicked remove, or the person who clicked remove is an admin,
              //continue with the delete process
              if (theCourse.homework[index].submittedBy == user.username || user.permissions === "admin") {
                //homework is stored as an array of objects in the string. If that array length is one, then there's only one course that could be being removed
                //therefore, we just set the homework array to empty.
                if (theCourse.homework.length === 1) {
                  theCourse.homework = [];
                } else {
                  //if the array isn't empty, we splice it at the index of the homework that is being removed. we remove one item at that index, which is the removed homework.
                  theCourse.homework.splice(index, 1);
                }
                //finds and updates the courses homework, and then redirects to home
                Course.findOneAndUpdate({_id : theCourse.id}, {$set: {homework : theCourse.homework}}).then(function() {
                  res.redirect("/");
                });
              } else {
                res.redirect("/");
              }

            } else {
              //if the course doesn't exist, which could only happen if some tampered with it client side, just redirect to home.
              res.redirect("/");
            }
          }
        });
      }
    })
  } else {
    //if the user doesn't have a session, redirect to home.
    res.redirect("/");
  }
});

app.get("/login", function(req, res) {
  res.render("login", {error: ""});
})

app.post("/login", urlencodedParser, async (req, res, next) => {

  //the stringTest function is a function that confirms the string is only character a-z A-Z 0-9
  if (req.body.logname && req.body.logword && stringTest(req.body.logname) && stringTest(req.body.logword)) {
    //try to find the user in the database. if that doesn't work, tell them their information was incorrect.
    try {
      // asyncronous function. returns the user if the info was correct, throws an error if it wasn't.
      let response = await User.authenticate(req.body.logname, req.body.logword);
      //sets the session and cookie to the current user ID
      req.session.userId = response._id;
      res.cookie("sessionID", response._id);
      //redirects to the cookie path, or to home if the user doesn't have path cookies
      res.redirect(req.cookies.path || "/");
    } catch(e) {
      console.log(e);
      // tells the user their info was incorrect
      res.render("login", {error : "Username or Password incorrect. Please try again."});
    }
  } else {
    //asks the user not to enter special characters.
    res.render("login", {error: "Please don't enter special characters"});
  }
});

app.get("/signup", function(req, res) {
  res.cookie("path", "/");
  res.render("signup", {error : "", data : [ "", "", ""]});
});

app.post("/signup", urlencodedParser, function(req, res) {

  //makes sure the two entered passwords match.
  if (req.body.password != req.body.passwordConf) {
    //if they don't, tell the user
    res.render("signup", {error : "Error : passwords do not match", data : [req.body.username, req.body.firstName, req.body.lastName]});
  //makes sure all fields were entered
  } else if (req.body.username && req.body.firstName && req.body.lastName && req.body.password && (req.body.password === req.body.passwordConf)) {
    //makes sure they didn't use special characters.
    if (stringTest(req.body.username) && stringTest(req.body.firstName) && stringTest(req.body.lastName) && stringTest(req.body.password)) {
      //makes sure they're all under 40 characters long
      if (req.body.username.length < 40 && req.body.password.length < 40 && req.body.firstName.length < 40 && req.body.lastName.length < 40) {
        //sets up the user data
        var userData = {
          firstName: req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1),
          lastName: req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1),
          username: req.body.username,
          password: req.body.password,
          colors: {
            bgColor: "rgb(79, 49, 48)",
            textColor: "rgb(216, 215, 143)",
            infoColor: "rgb(117, 55, 66)",
            buttonColor: "rgb(170, 80, 66)",
            borderColor:"rgb(216, 189, 138)"
          },
          font: "/public/fonts/Evogria.otf",
          email: req.body.username
        }
        //tries to make the user character. if someone shares their username or the server is down, it will throw an error.
        try {
          User.create(userData,function(error, user) {
            if (error) {
              console.log(error);
              res.render("signup", {error : "Username is already being used. Please try again.", data : ["", req.body.firstName, req.body.lastName]});
            } else {
              //sets the session and cookie to current user ID
              let mailOptions = {
                from: "pvsstudents@gmail.com",
                to: "aidaneglin@gmail.com",
                subject: "user signup",
                text: "User " + user.username + " has signed up! (" + user.firstName + " " + user.lastName + ")"
              }
              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error)
                  res.redirect("/")
                } else {

                }
              });
              req.session.userId = user._id;

              res.cookie("sessionID", req.session.userId);
              return res.redirect("/tutorial");
            }
          });
        } catch(e) {
          console.log(e);
        }
      } else {
        res.render("signup", {error: "Please limit input fields length to 40 characters.", data : ["", "", ""]});
      }
    } else {
      res.render("signup", {error: "Please do not use special characters in your signup information.", data : ["", "", "", ""]});
    }
  } else {
    res.redirect("/signup", {error: "please fill in all the requested fields.", data : ["", "", "", ""]});
  }
});

app.get("/courses", function(req, res) {
    res.cookie("path", "/courses");
    if (req.session.userId) {
      User.findOne({_id : req.session.userId}, function(err, user) {
        res.render("addCourses", {colours: user.colors, font: holidayFont(user.font)});
      });
    } else {
      res.redirect("/login");
    }
});

app.post("/courses", urlencodedParser, function(req, res) {

  //makes sure they have a session ID and that the body object is a course.
  if (req.session.userId && req.body.coursesCode && req.body.coursesBlock && req.body.coursesTeacher) {
    Course.find({ code: req.body.coursesCode, block: req.body.coursesBlock, teacher: req.body.coursesTeacher }, (err, theCourse) => {
      let badCourses = [];
      let goodCourses = [];

      //due to how mongoDB works and how the user submitted input works, sometimes the Course.find may return a course that matches all the
      //credentials but wasn't selected. To avoid passing the user the wrong info, we must confirm everything first.


      //only returns true if there was only one selected course
      if (typeof req.body.coursesCode === "string") {

      } else {

        //goes through every course that was returned by courses.find, and makes sure it matches one of the credentials list
        for (var i = 0; i < req.body.coursesBlock.length; i++) {
          var currentCheck = req.body;
          theCourse.forEach(function(course) {
            if (course.code === currentCheck.coursesCode[i] && course.block === currentCheck.coursesBlock[i] && course.teacher === currentCheck.coursesTeacher[i]) {
              goodCourses.push(course);
            }
          });
        }
      }


      theCourse = goodCourses;

      //this block of code may seem reduntant, but It felt neater to to make it two if statements than to stuff them both in to one.
      //this finds all the courses, if any, that the user selected that don't exist. would only occur if the user tampered with ID's client side.
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

      //makes theCourse variable a list of all the ID's of the good courses
      theCourse = theCourse.map(x => mongoose.Types.ObjectId(x._id));

      //adds that list to the User's courses property
      User.findOneAndUpdate({_id : req.session.userId}, {courses : theCourse}).then(function() {
        res.redirect("/");
      });
    });

  } else {
    res.redirect("/");
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

  //there are three types of adds supported right now. event, course, and resource.


  //makes sure the user has a session
  User.findOne({_id : req.session.userId}, function(err, user) {
    if (err) {
      res.redirect("/");
    } else {
      //makes sure the user is an admin
      if (user != undefined && user.permissions === "admin") {
        //makes courses
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
        //makes events
        } else if (req.body.year) {
          if (req.body.year && req.body.month && req.body.day && req.body.time && req.body.info) {
            var eventData = {};
            if (req.body.longInfo) {
              eventData = {
                year: req.body.year,
                month: req.body.month-1,
                day: req.body.day-1,
                time: req.body.time,
                info: req.body.info,
                longForm: req.body.longInfo,
                date: new Date(parseInt(req.body.year), req.body.month-1, req.body.day-1, 0, 0, 0, 0)
              }
            } else {
              eventData = {
                year: req.body.year,
                month: req.body.month-1,
                day: req.body.day-1,
                time: req.body.time,
                info: req.body.info,
                date: new Date(parseInt(req.body.year), req.body.month-1, req.body.day-1, 0, 0, 0, 0)
              }
            }
            Events.create(eventData, function() {
              res.redirect("/add");
            })
          }
        //makes resources
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
        } else if (req.body.alert) {
          if (req.body.alert) {
            User.update({}, {$push:{alerts: [[req.body.alert]]}}, {"multi": true}).then(function() {
              Push.find({}, function(err, pushes) {
                pushUsers(pushes, {title: req.body.alert, data: ""});
              });
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

app.get("/calendar-view", function(req, res) {
  res.render("loading", {getURL : "calendar"});
});

app.get("/calendar", async (req, res, next) => {
  res.cookie("path", "/calendar");

  //user doesn't need a session to visit calendar, because there is no user specific data

  //declares a currentDate, monthArray, and monthName for later use
  let currentDate = (new Date()).local();
  let monthsArray = [];
  let monthsNames = ["September", "October", "November", "December", "January", "February", "March", "April", "May", "June"];
  let offSetDays = dayOffset(false, true);
  //finds ALL events. will fix later.
  //fix with something like: Events.find({$and: [{date: {$gt: september (currentYear)}}, {date: {$lt: june (nextYear)}}]}, function(err, yearEvent))
  let yearEvent = await Events.find({$and: [{date: {$gte: new Date(2018, 8, 0, 0, 0, 0, 0)}}, {date: {$lte: new Date(2019, 5, 29, 0, 0, 0, 0)}}]});
  // starts the first day of the calendar on september first of that year
  let theDay = new Date(2018, 8, 1, 0, 0, 0, 0).getDay();
  // declares an array that will be filled with the info for every day of the year
  let daysArray = [];
  let foundEvent = false;
  //cycles through the 10 school months
  for (var i = 0; i < 10; i++) {
    //declares a currentMonth variable for later use
    let currentMonth = [];
    //get the amount of days in that month using the getDays function i defined.
    for (var j = 0; j < getDays((i+8)%12); j++) {
      //the days event array
      let dayEvents = [];
      foundEvent = false;

      //i know this is terribly ineffiecient (O(n^2)) but for a low n it isn't too bad. cycles through every event called by events.find and checks if it lies on the current day
      for (var k = 0; k < yearEvent.length; k++) {
        //if there is an event today, add it to the array and confirm an event was found
        if (yearEvent[k].month === (i+8)%12 && yearEvent[k].day === j) {
          foundEvent = true;
          dayEvents.push(yearEvent[k].time + ": " + yearEvent[k].info);
        }
      }
      //pushes today on to the currentMonth array
      currentMonth.push([dayEvents, j, (theDay%7)]);
      //adds one to the day of the week
      theDay++;
    }
    //pushes this month to the array
    monthsArray.push(currentMonth);
  }
  if (req.session.userId) {
    let user = await User.findOne({_id : req.session.userId});
    res.render("calendar", {offSetDays: offSetDays, calendar : monthsArray, months : monthsNames, colours: user.colors, font: holidayFont(user.font)});
  } else {
    res.render("calendar", {offSetDays: offSetDays, calendar: monthsArray, months: monthsNames, colours: {bgColor: "#FC7753", textColor: "#F2EFEA", infoColor: '#403D58', buttonColor: "#66D7D1", borderColor: "#000000"}, font: "/public/files/Evogria.otf"});
  }



});

app.get("/submit-view", function(req,res) {
  res.render("loading", {getURL : "submit"});
});

app.get("/submit", function(req, res) {
  res.cookie("path", "/submit");

  //renders the page with the user's courses
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      Course.find({_id : user.courses}, function(err, courses) {
        res.render("submitWork", {user : user.username, courses : courses, error : "", colours: user.colors, font: holidayFont(user.font)});
      });
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/submit", urlencodedParser, function(req, res) {
  var tampered = false;
  //idk why i did this but i felt like it sooooo the user gets banned if they tamper with input names
  for (var key in req.body) {
    if (key != "courseID" && key != "page" && key != "questions" && key != "assignment" && key != "notes" && key != "submittedBy" && key != "confirmed" && key != "due") {
      tampered = true;

    }
  }

  //makes sure all fields exist, and are of the proper length
  if (req.session.userId && !tampered && (req.body.questions || req.body.assignment) && req.body.due.length < 60 && req.body.submittedBy.length < 40 && req.body.assignment.length < 512 && req.body.notes.length < 256 && req.body.questions.length < 40) {

      User.findOne({username : req.body.submittedBy}, function(err, user) {

        //makes a homework object
        let homeworkObject = {
          submittedBy: req.body.submittedBy,
          confirmed: "F",
          page: req.body.page,
          assignment: profanityFilter(req.body.assignment),
          notes: profanityFilter(req.body.notes),
          questions: profanityFilter(req.body.questions),
          due: profanityFilter(req.body.due),
          date: (new Date()).local()
        }
        //if the user is a teacher or an admin, let them submit it as confirmed.
        if (err || !user) {

        } else if (user.permissions == "teacher" || user.permissions == "admin") {
          homeworkObject.confirmed = "T";
        }
        //adds the homework to the course
        Course.findOneAndUpdate({_id : mongoose.Types.ObjectId(req.body.courseID)}, {$push:{homework : homeworkObject}}).then(function() {
          res.redirect("/");
        });
      })




  } else if (!req.session.userId) {
    res.redirect("/login");
  } else if (tampered) {
    //gonna add a ban function
    User.findOneAndUpdate({_id : req.session.userId}, {$set:{banned : true}}).then(function() {
        res.redirect("/login?banned=true");
    });
  } else {
    res.redirect("/");
  }
});
//self explanitory. logs the user out.
app.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/login");
});

app.get("/suggestions", async (req, res, next) => {
  res.cookie("path", "/suggestions");
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      res.render("suggestions", {colours: user.colors, font: holidayFont(user.font)});

    } catch(e) {
      console.log(e);
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
});
//sends the suggestions to me.
app.post("/suggestions", urlencodedParser, function(req, res) {

  if (req.session.userId && req.body.body) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      //makes sure they aren't spamming me
      if ((((new Date()).local()).getTime() - user.suggestions[user.suggestions.length-1][1].getTime())/1000 < 900) {
        res.redirect("/");
      } else {
        //sends the email
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
            suggestions.push([req.body.body, (new Date()).local()]);
            //adds it to their list of sent suggestiona
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

app.get("/questions", async (req, res) => {
  res.cookie("path", "/questions?page=" + req.query.page);
  if (req.session.userId) {
    if (req.query.page == undefined) {
      res.redirect("/questions?page=0");
    } else {
      let posts = Posts.Post.find({}).sort({"date": -1}).limit(parseInt(req.query.page)*20+20);
      let user = User.findOne({_id : req.session.userId});
      let count = Posts.Post.countDocuments({});
      let final = await Promise.all([posts, user, count]);
      posts = final[0], user = final[1], count = final[2];
      posts = posts.slice((parseInt(req.query.page))*20);
      res.render("questions", {posts: posts, user: user, colours: user.colors, font: holidayFont(user.font), page: parseInt(req.query.page), max: Math.ceil(count/20)});
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
      User.findOne({_id : req.session.userId}, function(err, user) {
        let info = {
          body: req.body.body,
          title: req.body.title,
          submittedBy: user.username,
          anonymous: req.body.anon==="true",
          date: (new Date()).local()
        }
        Posts.Post.create(info, function(err, post) {
          res.redirect("/questions");
        });
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
          User.findOne({_id :req.session.userId}, function(err_or, user) {
            res.render("comment", {post: post, comments: comments, id : req.params.id, user: user, colours: user.colors, font: holidayFont(user.font)});
          });
        });
      }
    });
  } else {
    res.redirect("/login");
  }

});

app.post("/questions/:id", urlencodedParser, function(req, res) {
  if (req.session.userId) {
    if (req.body.deleteComment) {

      User.findOne({_id : req.session.userId}, function(err, user) {
        if (user.permissions == "admin") {
          Posts.Post.findOneAndUpdate({_id : mongoose.Types.ObjectId(req.params.id)}, {$pull: {comments: req.body.deleteComment}}).then(() => {
            Posts.Comment.remove({_id : mongoose.Types.ObjectId(req.body.deleteComment)}).then(() => {
              res.redirect("/questions/" + req.params.id);
            });
          });
        } else {

        }
      });

    } else {
      User.findOne({_id : req.session.userId}, function(err, user) {
        let params = {
          parentPost: mongoose.Types.ObjectId(req.params.id),
          body: req.body.comment,
          submittedBy: user.username
        }
        Posts.Comment.create(params, function(err, comment) {
          Posts.Post.findOne({_id : mongoose.Types.ObjectId(req.params.id)}, function(err, post) {
            User.findOneAndUpdate({username: post.submittedBy}, {$push:{alerts: [["postComment", "Someone commented on your post!", "https://www.pvstudents.ca" + req.url]]}}).then(function(err, user) {
              Posts.Post.findOneAndUpdate({_id : post._id}, {$push:{comments : comment._id}}).then(function() {
                res.redirect("/questions/" + req.params.id);
              });
            })
          });
        })
      });
    }
  }
});

app.get("/chatroom", function(req,res) {
  res.cookie("path", "/chatroom?chatroom=" + req.query.chatroom);
  if (req.session.userId) {
    if (req.query.chatroom) {
      let currentDate = (new Date()).local();
      Texts.find({$and: [{date: {$gt: new Date(currentDate.getTime()-1000*60*720)}}, {chatroom: req.query.chatroom}]}, function(err, texts) {
        texts.sort(function(a, b) {
          return a.date>b.date ? 1 : a.date<b.date ? -1 : 0;
        });
        for (var i = 0; i < texts.length; i++) {
          texts[i].body = profanityFilter(texts[i].body);
        }
        User.findOne({_id : req.session.userId}, function(err, user) {
          res.cookie("sessionID", user._id);
          if (req.query.chatroom == "all" || user.grade == parseInt(req.query.chatroom.match(/\d+/))) {
            res.render("roomchat", {room: req.query.chatroom, texts: texts, permissions : user.permissions, colours: user.colors, font: holidayFont(user.font), grade: user.grade, confirmed: !(user.grade === undefined)});
          } else {
            res.redirect("/chatroom?chatroom=all");
          }
        });
      });
    } else {
      res.redirect("/chatroom?chatroom=all");
    }
  } else {
    res.redirect("/login");
  }
});

app.post("/chatroom", urlencodedParser, function(req, res) {
  if (req.session.userId) {
    if (req.body.mutedUser) {
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
    } else if (req.body.userSchoolTag) {
      User.findOne({_id : req.session.userId}, function(err, user) {
        if (err) {
          res.redirect("/login");
        } else {
          Course.find({_id : user.courses}, function(err, courses) {
            User.findOneAndUpdate({_id : req.session.userId}, {$set: {schoolUsername: req.body.userSchoolTag.toLowerCase(), grade: guessGrade(courses.map(x => x.course), req.body.userSchoolTag)}}).then(function() {
              res.redirect("/chatroom?chatroom=all");
            });
          });
        }
      })
    }
  } else {
    res.redirect("/login");
  }

});

app.get("/tutorial", function(req, res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err) {
        res.render("tutorial", {font: "/public/fonts/LANENAR_.ttf"});
      } else {
        res.render("tutorial", {font: holidayFont(user.font)})
      }
    })
  } else {
    res.render("tutorial", {font: "/public/fonts/LANENAR_.ttf"});
  }
});

app.get("/schedule", function(req, res) {
  res.cookie("path", "/schedule");
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err) {
        res.redirect("/");
      } else {
        let blockObject = {
          A: ["LC", ""],
          B: ["LC", ""],
          C: ["LC", ""],
          D: ["LC", ""],
          E: ["LC", ""]
        }
        Course.find({_id : user.courses}, function(err, courses) {
          courses.forEach(function(course) {

            blockObject[course.block] = [course.course, course.teacher];
          });

          res.render("schedule", {courses : blockObject, colours: user.colors, font: holidayFont(user.font)});
        });
      }
    });
  } else {
    res.redirect("/login");
  }

});

app.get("/view-LC", function(req, res) {
  res.render("viewOther", {schedule: lcSchedule(false, false, false, true)});
});

app.get("/alerts", function(req, res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      let alert = user.alerts[user.alerts.length-1];
      res.send(alert);
    });
  } else {
    res.send([]);
  }
});

app.post("/alerts", urlencodedParser, function(req, res) {
  if (req.session.userId && req.body.delete === "true") {
    User.findOneAndUpdate({_id : req.session.userId}, {$pop: {alerts: 1}}).then(function() {
      res.send("removed alert successfully!");
    });
  } else {
    res.send("failed to remove alert.");
  }
});

app.get("/users", function(req, res) {
  res.redirect("/");
});

app.get("/users/:user", function(req, res) {
  res.cookie("path", "/users/" + req.params.user);
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (!user) {
        res.redirect("/users");
      } else {
        if (user.username != req.params.user) {
          res.redirect("/users/" + user.username);
        } else {
          res.render("account", {username: user.username, colours: user.colors, font: holidayFont(user.font)});
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/users/:user/posts", function(req, res) {
  res.cookie("path", "/users/" + req.params.user + "/posts");
  if (req.session.userId) {
    Posts.Post.find({submittedBy: req.params.user}, function(err, posts) {
      User.findOne({_id : req.session.userId}, function(err, user) {
        if (user.username != req.params.user) {
          res.redirect("/users/" + user.username + "/posts");
        } else {
          res.render("posts", {posts: posts, user: req.params.user, colours: user.colors, font: holidayFont(user.font)});
        }
      });
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/users/:user/comments", function(req, res) {
  res.cookie("path", "/users/" + req.params.user + "/comments");
  if (req.session.userId) {
    Posts.Comment.find({submittedBy: req.params.user}, function(err, comments) {
      User.findOne({_id : req.session.userId}, function(err, user) {
        if (user.username != req.params.user) {
          res.redirect("/users/" + user.username + "/comments");
        } else {
          res.render("userComments", {comments: comments, user: req.params.user, colours: user.colors, font: holidayFont(user.font)});
        }
      });
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/users/:user/colours", function(req, res) {
  res.cookie("path", "/users/" + req.params.user + "/colours");
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (user.username != req.params.user) {
        res.redirect("/users/" + user.username + "/colours");
      } else {
        let colours = fs.readFileSync("../pallets.json");
        colours = JSON.parse(colours);
        res.render("colours", {user: req.params.user, colour: colours, colours: user.colors, font: holidayFont(user.font)});
      }
    });

  } else {
    res.redirect("/login");
  }
});

app.post("/users/:user/colours", urlencodedParser, function(req, res) {
  if (req.session.userId) {
    let newObject = {
      bgColor: req.body.colour1,
      textColor: req.body.colour5,
      infoColor: req.body.colour2,
      buttonColor: req.body.colour3,
      borderColor: req.body.colour4
    }
    User.findOneAndUpdate({_id : req.session.userId}, {$set: {colors: newObject}}).then(function() {
      res.send(true);
    });
  } else {
    res.send(true);
  }
});

app.get("/users/:user/fonts", function(req, res) {
  res.cookie("path", "/users/" + req.params.user + "/fonts");
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (user.username != req.params.user) {
        res.redirect("/users/" + user.username + "/fonts");
      } else {
        res.render("font", {user: req.params.user, colours: user.colors});
      }
    });

  } else {
    res.redirect("/login");
  }

});

app.post("/users/:user/fonts", urlencodedParser, function(req, res) {
  if (req.session.userId) {
    let fontUrl = req.body.font.split("/");

    if (req.body.font && fontUrl[1] == "public" && fontUrl[2] == "fonts" && fontUrl.length == 4) {
      User.findOneAndUpdate({_id : req.session.userId}, {$set: {font: req.body.font}}).then(function(err, user) {
        res.send(true);
      });
    } else {
      res.redirect("/login");
    }
  } else {
    res.send(true);
  }
});

app.get("/users/:user/order", function(req, res) {
  res.cookie("path", "/users/" + req.params.user + "/order");
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (user.username != req.params.user) {
        res.redirect("/users/" + user.username + "/order");
      } else {
        res.render("courseOrder", {user: user.username, courseOrder: user.order, colours: user.colors, font: (holidayFont(user.font))});
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/users/:user/order", urlencodedParser, function(req, res) {
  if (req.session.userId) {

    User.findOneAndUpdate({_id : req.session.userId}, {$set: {order: req.body}}).then(function() {
      res.send(true);
    });
  } else {
    res.send(true);
  }

});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/offLineInfo", function(req, res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err || !user) {
        res.send("");
      } else {
        Course.find({_id : user.courses}, function(err, courses) {
          if (err || !courses) {
            res.send("");
          } else {
            //object
            let userLCSchedule = lcSchedule("", "", true);
            //array
            let timeOffSet = dayOffset("", true);
            //array
            let blockSchedule = blockToTime("", "", true);
            res.send([user, courses, userLCSchedule, {timeOffset: timeOffSet}, {blockSchedule : blockSchedule}]);
          }
        });

      }
    })
  } else {
    res.send("");
  }
});

let io = socket(server);
io.set('match origin protocol', true);
io.on("connection", function(socket) {
  socket.on("chat", function(data) {
    let id = mongoose.Types.ObjectId(data.id);
    User.findOne({_id : id}, function(err, user) {
      if (err) {

      } else {
        Texts.create({date : (new Date()).local(), body: data.message, submittedBy : user.username, firstName: user.firstName, lastName:user.lastName, chatroom: data.chatroom}, function(error, text) {
          if (error) {

          } else {

          }
        });
        data = {message : profanityFilter(data.message), username : user.username, firstName: user.firstName, lastName:user.lastName, chatroom: data.chatroom};
        if (user.permissions != "muted" && data.message.length < 256) {
          io.emit("chat" + "_" + data.chatroom, data);
        }
      }
    });
  });
  socket.on("typing", function(data) {
    User.findOne({_id : data.id}, function(err, user) {
      if (err) {

      } else if (user.permissions != "muted"){
        socket.broadcast.emit("typing" + "_" + data.chatroom, {username: user.username, typing: data.typing});
      }
    });
  });


});

app.get("/down", function(req, res) {
  res.render(__dirname + "/errors/serverError.html");
});

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/errors/aStar.html");
});
