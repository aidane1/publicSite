// Note for the future: i messed up the ISO date format. i assumed it did the same thing with days that it did
//with months. That is, subtract one from the actual day. it does not. please change in the future


//a function to offset the days based on proDdays
function dayOffset(events, date, all = false) {
  if (all) {
    return events.map(x => x.date);
  }
  let offSet = 0;
  for (var i = 0; i < events.length; i++) {
    if (date.getTime() > events[i].date.getTime()) {
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
    this.setTime(this.addMinutes(-480));
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

function blockToTime(day, offSet, all = false, schedule) {
  if (all) {
    return schedule;
  }
  if (day === -1 || day === 5) {
    return false;
  }
  return schedule["day" + ((day-offSet%5+5)%5+1).toString()];
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

var https = require("https");

let cheerio = require("cheerio");

let request = require("request");

let url = require("url");

let querystring = require("querystring");

let bodyParser = require("body-parser");

let User = require("../models/userchar");

let Course = require("../models/coursechar.js");

let Song = require("../models/songchar.js");

let session = require("express-session");

var cookieSession = require('cookie-session');

let MongoStore = require('connect-mongo')(session);

let Events = require("../models/eventschar");

let socket = require("socket.io")

let cookieParser = require("cookie-parser");

let Texts = require("../models/textchar.js");

let Resources = require("../models/resourcechar.js");

let Posts = require("../models/postchar.js");

let Push = require("../models/pushchar.js");

let School = require("../models/schoolchar.js");

let Code = require("../models/createcodeschar.js");

let Notes = require("../models/notechar.js");

let Assignments = require("../models/assignmentchar.js");

let Teachers = require("../models/teacherchar.js");

let TeacherUser = require("../models/teacherUserchar.js");

let Categories = require("../models/categorychar.js");

let Semesters = require("../models/semesterchar.js");

let Log = require("../models/logchar.js");

let webpush = require("web-push");

let schedule = require("node-schedule");

let sharp = require("sharp");

let toIco = require("to-ico");

let moment = require("moment");

let multer  = require('multer');

let path = require("path");

let serverCourse = require("../models/servercourseschar.js");

// let tesseract = require("node-tesseract");

let fileUpload = require("express-fileupload");


let storage = multer.diskStorage({
  destination: __dirname + "/public/schoolLogos/",
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
})

let notesStorage = multer.diskStorage({
  destination: __dirname + "/public/notesImages/",
  filename: function(rew, file, cb) {
    console.log("got this far");
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

let upload = multer({storage : storage}).single("faviconFile");
let notesUpload = multer({storage: notesStorage});


let contents = fs.readFileSync("../eVariables/variables.json");
contents = JSON.parse(contents);

const PUBLIC_VAPID_KEY = contents.PUBLIC_VAPID_KEY;
const PRIVATE_VAPID_KEY = contents.PRIVATE_VAPID_KEY;
webpush.setVapidDetails('mailto:aidaneglin@gmail.com', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "apexschoolr@gmail.com",
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


app.use(fileUpload());

app.use(session({
  secret: contents.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000*86400*365
  },
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(express.static(__dirname));

app.use(cookieParser());


async function logSchool(school, info) {
  if (school && info.dateString && info.info && info.user) {
    let log = await Log.create({school: school, dateString: info.dateString, info: info.info, user: info.user});
    return log;
  } else {
    return {};
  }
  
  // fs.readFile(__dirname + "/public/logins/" + school.toString() + ".json", function(err, data) {
  //   if (err) {
  //     let data = [info];
  //     data = JSON.stringify(data);
  //     fs.writeFile(__dirname + "/public/logins/" + school.toString() + ".json", data, function(err) {
  //       if (err) {
  //         console.log(err);
  //       }
  //     })
  //   } else {
  //     let json = JSON.parse(data);
  //     json.push(info);
  //     fs.writeFile(__dirname + "/public/logins/" + school.toString() + ".json", JSON.stringify(json), function(err){
  //       if (err) {
  //         console.log(err);
  //       }
  //     });
  //   }
  // });
}
app.use(async function(req, res, next) {
  let validPaths = ["/", "/account", "/courses", "/events", "/notes", "/assignments", "/block-colours", "/block-names"];
  try {
    if (!req.query.preload && validPaths.indexOf(url.parse(req.url).pathname) >= 0 && req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      if (user.username != "AidanEglin") {
        let date = (new Date()).local();
        let formatted = moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
        let info = `accessed ${url.parse(req.url).pathname} via method ${req.method}`;
        let data = {user: user.username, dateString: formatted, info: info};
        await logSchool(user.school, data);
        next();
      } else {
        next();
      }
    } else {
      next();
    }
  } catch(e) {
    console.log(e);
    next();
  }
  
});

app.enable('trust proxy');

function wwwHttpsRedirect(req, res, next) {
    if (req.secure) {
      next();
    } else {
      return res.redirect(301, 'https://' + req.headers.host + req.originalUrl);
    }
};

app.use(wwwHttpsRedirect);

let server = app.listen(80, function() {
  console.log("listening for requests");
});


function EmptyCourse(spare, block) {
  this.course = spare;
  this.teacher = "Free";
  this.block = block;
  this.isReal = false;
  this.category = {
    category: "other",
    shortCode: "other",
  };
}

function blockNamesObject(blocks, courses, courseNames, spareName) {
  let blockObject = {};
  for (var i = 0; i  < blocks.length; i++) {
    if (blocks[i][1] === "changing") {
      blockObject[blocks[i][0]] = new EmptyCourse(spareName, blocks[i][0]);
    } else {
      blockObject[blocks[i][0]] = new EmptyCourse(blocks[i][0], blocks[i][0]);
    }
  }
  for (var i = 0; i < courses.length; i++) {
    courses[i] = JSON.parse(JSON.stringify(courses[i]));
    let teacher = courses[i].teacher.prefix + courses[i].teacher.lastName;
    courses[i].teacher = teacher;
    courses[i].isReal = true;
    blockObject[courses[i].block] = courses[i];
  } 
  let parsedNames = JSON.parse(JSON.stringify(courseNames));
  for (var key in parsedNames) {
    if (parsedNames[key]) {
      blockObject[key].course = parsedNames[key];
    }
    
  }
  return blockObject;
}

async function getLoginCredentials(username, password, district) {
  return new Promise(function(resolve, reject) {
    var postData = {
      ctl00$FormContentPlaceHolder$USERID: username,
      ctl00$FormContentPlaceHolder$PAUTH: password,
      ctl00$FormContentPlaceHolder$btnOK: "Sign In",
      __EVENTTARGET: "",
      __EVENTARGUMENT: "",
      __VIEWSTATE: "",
      __VIEWSTATEGENERATOR: "",
      __EVENTVALIDATION: ""
    }
    https.get(`https://cimsweb.${district}.bc.ca/SchoolConnect/StuConSignon.aspx`, function(res) {
      let data = "";
      res.on("data", function(chunk) {
        data += chunk;
      });
      res.on("end", function() {
        let $ = cheerio.load(data);
        $("input").each(function(i, input) {
          if (input.attribs.value) {
            postData[input.attribs.name] = input.attribs.value;
          }
        })
        resolve([querystring.stringify(postData), res.headers["set-cookie"]]);
      })
    })
  });
}

async function login(data, cookies, district) {
  return new Promise(function(resolve, reject) {
    let options = {
      url : `https://cimsweb.${district}.bc.ca/SchoolConnect/StuConSignon.aspx?${data}`,
      method: "GET",
      headers: {
        "Cookie": cookies[0]
      }
    }
    request(options, function(err, response, body) {
      if (!err && response.statusCode == 200) {
        resolve(body);
      } else {
        reject(err);
      }
    })
  });
}

async function getAssignment(cookies, district) {
  return new Promise(function(resolve, reject) {
    let options = {
      url: `https://cimsweb.${district}.bc.ca/SchoolConnect/SCAssignments.aspx`,
      method: "GET",
      headers: {
        'Cookie': cookies[0]
      }
    }
    request(options, function(error, response, body) {
      resolve(body);
    })
  })
}

async function getScheduleBody(cookies, district) {
  return new Promise(function(resolve, reject) {
    let options = {
      url: `https://cimsweb.${district}.bc.ca/SchoolConnect/SCSchedule.aspx`,
      method: "GET",
      headers: {
        'Cookie': cookies[0]
      }
    }
    request(options, function(error, response, body) {
      resolve(body);
    })
  });
}

async function compileScheduleInfo(body, semester) {
  return new Promise(function(resolve, reject) {
    let $ = cheerio.load(body);
    let classes = [];
    let scheduleRows = $("#FormContentPlaceHolder_ContentPlaceHolder1_StuSched tr");

    scheduleRows.each(function(i, element) {
      if (i > 1) {
        let currentClass = [];
        $(this).children().each(function(j, elem) {
          let classBox = $(elem);
          if (classBox.text().replace(/\s/g,'') && j < 7) {
            currentClass.push(classBox.text().replace(/\s\s+/g,' '));
          }
        });
        currentClass.length && currentClass.length !== 1 ? classes.push(currentClass) : "";
      }
    });
    let orderedClasses = [];
    for (var i = 0; i < classes.length; i++) {
      if (classes[i][4] === "LINEAR" || classes[i][4] === semester) {
        orderedClasses.push([classes[i][0], classes[i][3], classes[i][5]]);
      }
    }
    resolve(orderedClasses);
  });
}

async function getAssignmentCredentials(body, cookies, district) {
  return new Promise(function(resolve, reject) {
    let $ = cheerio.load(body);
    let newPostData = {
      ctl00$ctl00$FormContentPlaceHolder$ContentPlaceHolder1$DrpSelect: "C",
      __EVENTTARGET: "ctl00$ctl00$NavigationItemsPlaceHolder$AA34",
      __EVENTARGUMENT: "",
      __LASTFOCUS: "",
      ctl00$ctl00$FormContentPlaceHolder$ContentPlaceHolder1$DrpLimCourse: "   000      ",
      ctl00$ctl00$FormContentPlaceHolder$ContentPlaceHolder1$DrpTerm: "1"
    }
    $("input").each(function(i, input) {
      if (input.attribs.name == "__VIEWSTATE" || input.attribs.name == "__EVENTVALIDATION" || input.attribs.name == "__EVENTTARGET" || input.attribs.name == "__LASTFOCUS" || input.attribs.name == "__VIEWSTATEGENERATOR" || input.attribs.name == "ctl00$ctl00$FormContentPlaceHolder$STUNO" || input.attribs.name == "ctl00$ctl00$FormContentPlaceHolder$SGRADE" || input.attribs.name == "ctl00$ctl00$FormContentPlaceHolder$SCLASS" || input.attribs.name == "ctl00$ctl00$FormContentPlaceHolder$ContentPlaceHolder1$ISTART") {
        newPostData[input.attribs.name] =  input.attribs.value;
      }
    })
    let optionsObject = {
      __EVENTTARGET: "ctl00$ctl00$FormContentPlaceHolder$ContentPlaceHolder1$DrpSelect",
      __VIEWSTATE: newPostData["__VIEWSTATE"],
      __EVENTVALIDATION : newPostData["__EVENTVALIDATION"],
      ctl00$ctl00$FormContentPlaceHolder$ContentPlaceHolder1$DrpSelect: "C"
    }
    let headers = {
      url: `https://cimsweb.${district}.bc.ca/SchoolConnect/SCAssignments.aspx`,
      headers: {
        "Cookie": cookies[0]
      },
      form: optionsObject
    }

    request.post(headers, function(err, response, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    })
  });
}

async function compileInfo(body) {
  return new Promise(function(resolve, reject) {
    let $ = cheerio.load(body);
    let texts = [

    ];
    let trs = $("#FormContentPlaceHolder_ContentPlaceHolder1_StuAssign tr");
    trs.each(function(i, element) {
      if (i !== 0 && i !== 1) {
        let currentTr = [];
        $(this).children().each(function(j, elem) {
          let td = $(elem);
          if (td.text().replace(/\s/g,'')) {
            currentTr.push([td.text().replace(/\s\s+/g,' ')]);
          }
        });
        currentTr.length && currentTr.length !== 1 ? texts.push(currentTr) : "";
      }
    })
    resolve(texts);
  })
}

async function getHistoryBody(cookies, district) {
  return new Promise(function(resolve, reject) {
    let options = {
      url: `https://cimsweb.${district}.bc.ca/SchoolConnect/SCTranscript.aspx`,
      method: "GET",
      headers: {
        'Cookie': cookies[0]
      }
    }
    request(options, function(error, response, body) {
      resolve(body);
    })
  });
}

async function getHomework(username, password, district) {
  let loginCredentials = await getLoginCredentials(username, password, district);
  await login(loginCredentials[0], loginCredentials[1], district);
  let assignmentBody = await getAssignment(loginCredentials[1], district);
  let assignmentCredentials = await getAssignmentCredentials(assignmentBody, loginCredentials[1], district);
  let compiledInfo = compileInfo(assignmentCredentials);
  return (compiledInfo);
}
//semester is in the form SEM1 or SEM2
async function getSchedule(username, password, semester, district) {
  try {
    let loginCredentials = await getLoginCredentials(username, password, district);
    await login(loginCredentials[0], loginCredentials[1], district);
    let scheduleBody = await getScheduleBody(loginCredentials[1], district);
    let compiledSchedule = await compileScheduleInfo(scheduleBody, semester, district);
    let names = compiledSchedule.map(x => ["Mr." + x[1][2].toUpperCase() + x[1].substring(2, x[1].length-1).substring(1).toLowerCase(), "Ms." + x[1][2].toUpperCase() + x[1].substring(2, x[1].length-1).substring(1).toLowerCase(), "Mme." + x[1][2].toUpperCase() + x[1].substring(2, x[1].length-1).substring(1).toLowerCase()]);
    let blocks = compiledSchedule.map(x => ["A", "B", "C", "D", "E"][(parseInt(x[2])-1)/2]);
    let classes = compiledSchedule.map(x => x[0].substring(0,2).toLowerCase());
    let userCourses = [];
    for (var i = 0; i < names.length; i++) {
      let currentCourse = await Course.find({$and: [{teacher : names[i]}, {block : blocks[i]}]});
      if (currentCourse.length != 0) {
        if (currentCourse.length === 1) {
          userCourses.push(currentCourse[0]._id);
        } else {
          let found = false;
          for (var j = 0; j < currentCourse.length; j++) {
            if (currentCourse.course.substring(0,2).toLowerCase() === classes[i] && !found) {
              found = true;
              userCourses.push(currentCourse[j]._id);
            }
          }
          if (!found) {
            userCourses.push(currentCourse[0]);
          }
        }
      }
    }
    return userCourses;
  } catch(e) {
    return [];
  }  
}

async function getHistoryBody(cookies, district) {
  return new Promise(function(resolve, reject) {
    let options = {
      url: `https://cimsweb.${district}.bc.ca/SchoolConnect/SCTranscript.aspx`,
      method: "GET",
      headers: {
        'Cookie': cookies[0]
      }
    }
    request(options, function(error, response, body) {
      resolve(body);
    })
  });
}

async function compileHistory(body) {
  return new Promise(function(resolve, reject) {
    let $ = cheerio.load(body);
    let classes = [];
    let scheduleRows = $("#FormContentPlaceHolder_ContentPlaceHolder1_StuTrans tr");
    scheduleRows.each(function(i, element) {
      if (i > 1) {
        let currentClass = [];
        $(this).children().each(function(j, elem) {
          let classBox = $(elem);
          if (j < 8) {
            currentClass.push(classBox.text().replace(/\s\s+/g,' '));
          }
        });
        currentClass.length && currentClass.length !== 1 ? classes.push(currentClass) : "";
      }
    });
    let orderedClasses = [];
    for (var i = 0; i < classes.length; i++) {
      orderedClasses.push([classes[i][1],classes[i][5],classes[i][7]])
    }
    resolve(orderedClasses);
  });
}


//gets history of grades for you
async function getHistory(username, password, district) {
  let loginCredentials = await getLoginCredentials(username, password, district);
  await login(loginCredentials[0], loginCredentials[1], district);
  let history = await getHistoryBody(loginCredentials[1], district);
  let compiledHistory = compileHistory(history);
  return compiledHistory;
}

async function compileHomeInfo(body) {
  return new Promise(function(resolve, reject) {
    let $ = cheerio.load(body);
    let gradeForm = $("#FormContentPlaceHolder_SGRADE");
    let classForm = $("#FormContentPlaceHolder_SCLASS");
    let fullName = $("#UserOptionsTextPlaceHolder_UserInfo");
    resolve([gradeForm.val(), classForm.val(), fullName.text().split(" ")[1], fullName.text().split(" ")[2], fullName.text().split(" ")[4 ]]);
  });
}
//gets user grade and other ID stuff
async function getUserInfo(username, password, district) {
  let loginCredentials = await getLoginCredentials(username, password, district);
  let homePage = await login(loginCredentials[0], loginCredentials[1], district);
  let compiledHome = compileHomeInfo(homePage);
  return compiledHome;
}


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

app.get("/diseases", async function(req, res) {
  res.render("socials/diseases");
});

let iconMap = {
  "science": ['<i style = "color: black" class="fas fa-flask"></i>', "#81c784", "black"],
  "language": ['<i style = "color: black" class="fas fa-book"></i>', "#4a79c4", "black"],
  "english": ['<i style = "color: black" class="fas fa-book"></i>', "#89cff0", "black"],
  "french": ['<i style = "color: black" class="fas fa-book"></i>', "#e57373", "black"],
  "math": ['<i style = "color: black" class="fas fa-calculator"></i>', "#f44242", "black"],
  "socials": ['<i style = "color: black" class="fas fa-map-marked-alt"></i>', "#FFF176", "black"],
  "social studies": ['<i style = "color: black" class="fas fa-map-marked-alt"></i>', "#FFF176", "black"],
  "trades": ['<i style = "color: black" class="fas fa-wrench"></i>', "#aaa", "black"],
  "auto": ['<i style = "color: black" class="fas fa-car"></i>', "#aaa", "black"],
  "other": ['<i style = "color: black" class="fas fa-question"></i>', "#ffffff", "black"],
  "accounting": ['<i style = "color: black" class="fas fa-coins"></i>', "orange", "black"],
  "career and planning": ['<i style = "color: black" class="fas fa-briefcase"></i>', "#ffbae6", "black"],
  "physical education": ['<i style = "color: white" class="fas fa-basketball-ball"></i>', "black", "white"],
  "special ed": ['<i style = "color: black" class="fas fa-rainbow"></i>', "#738678", "black"],
  "fine arts": ['<i style = "color: black" class="fas fa-paint-brush"></i>', "#d291ff", "black"],
  "info tech.": ['<i style = "color: black" class="fas fa-tv"></i>', "#52c97a", "black"],
  "na": ['<i class="fas fa-file-signature"></i>', "white", "black"],
  "applied skills": ['<i style = "color: black" class="fas fa-cogs"></i>', "orange", "black"],
  "art": ['<i class="fas fa-palette"></i>', "#e57373", "black"],
  "courses": ['<i class="fas fa-cube"></i>', "#64b5f6", "black"],
  "events": ['<i class="fas fa-calendar"></i>', "#81c784", "black"],
  "logout": ['<i class="fas fa-sign-out-alt"></i>', "#fff176", "black"],
  "notes": ['<i class="fas fa-sticky-note"></i>', "#64b5f6", "black"],
  'assignments': ['<i class="fas fa-scroll"></i>', "#e57373", "black"],
  "reminders": ['<i class="fas fa-calendar-day"></i>', "#81c784", "black"],
  "blockColours": ['<i class="fas fa-palette"></i>', "#BA68c8", "black"],
  "blockTitles": ['<i class="fas fa-pen-square"></i>', "#64b5f6", "black"],
  "dayTitles": ['<i class="fas fa-signature"></i>', "#81c784", "black"],
  "course": ['<i style = "color: white" class="fas fa-book-open"></i>', "black", "white"],
  "teacher": ['<i style = "color: white" class="fas fa-user"></i>', "black", "white"],
  "block": ['<i style = "color: white" class="fas fa-cube"></i>', "black", "white"],
  "before-school": ['<i class="fas fa-coffee"></i>', "#f9b64a", "black"],
  "lunch-time": ['<i style = "color: white" class="fas fa-utensils"></i>', "black", "white"],
  "after-school": ['<i class="fas fa-moon"></i>', '#81c784', "black"],
} 


async function addAlerts(userIds, alertText, href) {
  for (var i = 0; i < userIds.length; i++) {
    await User.findOneAndUpdate({_id : userIds[i]}, {$push: {alerts: [[href, alertText]]}});
  }
}

app.post("/createSchoolAlert", urlencodedParser, async function(req,res) {
  try {
    if (req.session.userId && req.body.alertText) {
      let user = await User.findOne({_id : req.session.userId});
      if (user != null && user.school != null && user.permissions == "admin") {
        let users = await User.find({school: user.school});
        let userIds = [];
        for (var i = 0; i < users.length; i++) {
          userIds.push(users[i]._id);
        }
        addAlerts(userIds, req.body.alertText, req.body.alertLink || "");
        res.send(true);
      } else {
        res.send(false);
      }
    } else {
      res.send(false);
    }
  } catch(e) {
    console.log(e);
    res.send(false);
  }
});
function makeColorMap(blockNames) {
  let colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
  let colorMap = {};
  for (var i = 0; i < blockNames.length; i++) {
    if (blockNames[i][1] == "changing") {
      colorMap[blockNames[i][0]] = colorArray[i];
    } else {
      colorMap[blockNames[i][0]] = "#ffffff";
    }
  }
  return colorMap;
}

app.post("/changeDayTitles", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId && req.body.schedule && req.body.day && req.body.text) {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null) {
        let school = await School.findOne({_id : user.school});
        let names = school.dayTitles;
        names[parseInt(req.body.schedule)][req.body.day] = req.body.text;
        await School.findOneAndUpdate({_id : user.school}, {$set: {dayTitles: names}});
        // await School.findOneAndUpdate({_id : user.school}, {$push: {adminChanges: `${user.username} changed the title of ${req.body.day} for schedule ${req.body.schedule} to ${req.body.text}`}});
        res.send(true);
      } else {
        res.send(false);
      }
    } else {
      res.send(false);
    }
  } catch(e) {
    console.log(e);
    res.send(false);
  }
});
app.post("/updateConstantBlock", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId && req.body.schedule && req.body.day && req.body.block && req.body.changedBlockBlock && req.body.changedBlockConst) {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null) {
        let school = await School.findOne({_id : user.school});
        let schedule = school.constantBlockSchedule.schedule;
        if (schedule[parseInt(req.body.schedule)][req.body.day][parseInt(req.body.block)] != null) {
          schedule[parseInt(req.body.schedule)][req.body.day][parseInt(req.body.block)] = [req.body.changedBlockBlock, req.body.changedBlockConst];
          await School.findOneAndUpdate({_id : user.school}, {$set: {"constantBlockSchedule.schedule" : schedule}});
          await School.findOneAndUpdate({_id : user.school}, {$push: {adminChanges: `${user.username} changed the block of block ${req.body.block} on ${req.body.day} for schedule ${req.body.schedule} to ${req.body.changedBlockBlock}`}});
          let colorMap = makeColorMap(school.blockNames);
          res.send([true, colorMap[req.body.changedBlockBlock], req.body.changedBlockBlock]);
        }
      } else {
        res.send([false, null, null]);
      }
    } else {
      res.send([false, null, null]);
    }
  } catch(e) {
    console.log(e);
    res.send([false, null, null]);
  }   

});
app.post("/removeConstantBlock", urlencodedParser, async function(req,res) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null) {
        let school = await School.findOne({_id : user.school});
        let times = school.constantBlockSchedule.blockSchedule;
        let schedule = school.constantBlockSchedule.schedule;
        if (times.length > 1) {
          times.pop();
          for (var i = 0; i < schedule.length; i++) {
            for (var key in schedule[i]) {
              schedule[i][key].pop();
            }
          }
          await School.findOneAndUpdate({_id : user.school}, {$set : {constantBlockSchedule : {blockSchedule: times, schedule: schedule}}});
          await School.findOneAndUpdate({_id : user.school}, {$push: {adminChanges: `${user.username} removed a block from the constant block schedule`}});
          res.send([true, ``]);
        } else {
          res.send([false, "At least one block must remain at all times"]);
        }
      } else {
        res.send([false, "User must be an admin to submit changes to the master schedule"])
      }
    } else {
      res.send([false, "User must be logged in to make changes"]);
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please refresh and try again"]);
  }
});
app.post("/appendConstantBlock", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null) {
        let school = await School.findOne({_id : user.school});
        let times = school.constantBlockSchedule.blockSchedule;
        let schedule = school.constantBlockSchedule.schedule;
        let colorMap = makeColorMap(school.blockNames);
        times.push([9,10,10,12]);
        for (var i = 0; i < schedule.length; i++) {
          for (var key in schedule[i]) {
            schedule[i][key].push(school.blockNames.sort()[0]);
          }
        }
        let newBlock = times.length;
        
        await School.findOneAndUpdate({_id : user.school}, {$set : {constantBlockSchedule : {blockSchedule: times, schedule: schedule}}});
        await School.findOneAndUpdate({_id : user.school}, {$push: {adminChanges: `${user.username} added a block to the constant block schedule`}});
        res.send([true, colorMap[school.blockNames[0][0]], school.blockNames[0][0], newBlock]);
      } else {
        res.send([false,null, "User must be an admin to submit changes to the master schedule", 0]);
      }
    } else {
      res.send([false,null, "User must be logged in to make changes", 0]);
    }
  } catch(e) {
    console.log(e);
    res.send([false,null, "An unknown error occured. Please refresh and try again", 0]);
  }
});
app.post("/updateConstantTime", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId && req.body.block && req.body.startHour && req.body.startMinute && req.body.endHour && req.body.endMinute) {
      if (parseInt(req.body.startHour)*60 + parseInt(req.body.startMinute) < parseInt(req.body.endHour)*60 + parseInt(req.body.endMinute)) {
        let user = await User.findOne({_id : req.session.userId});
        if (user.permissions == "admin" && user.school != null) {
          let school = await School.findOne({_id : user.school});
          let times = school.constantBlockSchedule.blockSchedule;
          if (times[parseInt(req.body.block)] != null) {
            times[parseInt(req.body.block)] = [parseInt(req.body.startHour), parseInt(req.body.startMinute), parseInt(req.body.endHour), parseInt(req.body.endMinute)];
            await School.findOneAndUpdate({_id : user.school}, {$set : {"constantBlockSchedule.blockSchedule" : times}});
            await School.findOneAndUpdate({_id : user.school}, {$push: {adminChanges: `${user.username} changed the time of block ${req.body.block} to ${(parseInt(req.body.startHour)-1)%12+1}:${req.body.startMinute.length == 1 ? "0" + req.body.startMinute : req.body.startMinute} - ${(parseInt(req.body.endHour)-1)%12+1}:${req.body.endMinute.length == 1 ? "0" + req.body.endMinute : req.body.endMinute}`}});
            res.send([true, `${(parseInt(req.body.startHour)-1)%12+1}:${req.body.startMinute.length == 1 ? "0" + req.body.startMinute : req.body.startMinute} - ${(parseInt(req.body.endHour)-1)%12+1}:${req.body.endMinute.length == 1 ? "0" + req.body.endMinute : req.body.endMinute}`]);
          } else {
            res.send([false, "Block does not exist"]);
          }
        } else {
          res.send([false, "User must be an admin to submit changes to the master schedule"])
        }
      } else {
        res.send([false, "The end of a block must occur after the start"]);
      }
    } else {
      res.send([false, "All time fields must be filled in"])
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please refresh and try again"]);
  }
});
app.post("/updateBlock", urlencodedParser, async function(req, res) {
  if (req.session.userId) {
    let user = await User.findOne({_id : req.session.userId});
    if (user.permissions == admin) {
      let school = await School.findOne({_id : user.school});
      // let schoolSchedule = school
    } else {

    }
  } else {

  }
});


app.get("/dashboard/users/:group", async function(req,res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin") {
        let school = await School.findOne({_id : user.school});
        if (req.params.group == "users") {
          let users = await User.find({school: school._id}).populate("courses");
          let keys = [
            {displayFunc: (obj) => {return [obj.username, obj.studentID || "No student ID"]}, type: "stackedList", name: "User", propertyName: "username"},
            {displayFunc: (obj) => {return obj.banned ? "yes" : "no"}, type: "single", name: "Banned", propertyName: "courses"},
            {displayFunc: (obj) => {return obj.permissions}, type: "single", name: "Permissions", propertyName: "permissions", icon: '<i class="fas fa-cog" style = "font-size: 10px"></i>'},
          ];
          let tabOptions = [
            {name: "Users", selected: true, href: "/dashboard/users/users"},
            {name: "Teachers", selected: false, href: "/dashboard/users/teachers"},
            {name: "Admins", selected: false, href: "/dashboard/users/admins"},
          ];
          res.render("dashboard/listTemplate", {list: users, tabs: tabOptions, keys: keys, name: "Users", singular: "User"});
          // res.render("dashboard/usersDashboard", {school: school, users: users});
        } else if (req.params.group == "admins") {
          let users = await User.find({$and: [{school: school._id}, {permissions: "admin"}]});
          let keys = [
            {displayFunc: (obj) => {return obj.username}, type: "single", name: "User", propertyName: "username"},
            {displayFunc: (obj) => {return obj.permissions}, type: "single", name: "Permissions", propertyName: "permissions", icon: '<i class="fas fa-cog" style = "font-size: 10px"></i>'},
          ];
          let tabOptions = [
            {name: "Users", selected: false, href: "/dashboard/users/users"},
            {name: "Teachers", selected: false, href: "/dashboard/users/teachers"},
            {name: "Admins", selected: true, href: "/dashboard/users/admins"},
          ];
          res.render("dashboard/listTemplate", {list: users, tabs: tabOptions, keys: keys, name: "Users", singular: "Admin"});
        } else if (req.params.group == "teachers") {
          let teachers = await TeacherUser.find({school: school._id}).populate("teacherAccount");
          let keys = [
            {displayFunc: (obj) => {return obj.teacherAccount.firstName + " " + obj.teacherAccount.lastName}, type: "single", name: "All", propertyName: "teacher"},
            {displayFunc: (obj) => {return obj.code}, type: "single", name: "Code", propertyName: "teacherCode"},
          ];
          let tabOptions = [
            {name: "Users", selected: false, href: "/dashboard/users/users"},
            {name: "Teachers", selected: true, href: "/dashboard/users/teachers"},
            {name: "Admins", selected: false, href: "/dashboard/users/admins"},
          ];
          res.render("dashboard/listTemplate", {list: teachers, tabs: tabOptions, keys: keys, name: "Users", singular: "Teacher"});
        } else {
          let users = await User.find({school: school._id});
          res.render("dashboard/usersDashboard", {school: school, users: users});
        }
      } else {
        res.redirect("/home");
      }
    } catch(e) {
      res.redirect("/home");
    }
  } else {
    res.redirect("/home");
  }
});

app.get("/test", async function(req, res) {
  res.sendFile(__dirname + "/public/html/test.html");
});

app.get("/dashboard/courses/teachers", async function(req,res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin") {
        let school = await School.findOne({_id : user.school});
        let teachers = await Teachers.find({school: school._id});
        let keys = [
          {displayFunc: (obj) => {return obj.firstName}, name: "First Name", propertyName: "firstName"},
          {displayFunc: (obj) => {return obj.lastName}, name: "Last Name", propertyName: "lastName"},
          {displayFunc: (obj) => {return obj.teacherCode}, name: "Teacher Code", propertyName: "teacherCode"},
          {displayFunc: (obj) => {return obj.prefix}, name: "Prefix", propertyName: "prefix"},
        ]
        let inputTypes = {
          "firstName": {type: "text"},
          "lastName": {type: "text"},
          "teacherCode": {type: "text"},
          "prefix": {type: "select", optionType: "list", options: ["Mr. ", "Mrs. ", "Ms. ", "Mme. "], other: true, otherName: "Other"},
        }
        let tabOptions = [
          {name: "Categories", selected: false, href: "/dashboard/courses/categories"},
          {name: "Teachers", selected: true, href: "/dashboard/courses/teachers"},
          {name: "Courses", selected: false, href: "/dashboard/courses/courses"},
          {name: "Codes", selected: false, href: "/dashboard/courses/codes"},
        ];
        res.render("dashboard/dashboardTemplate", {title: "Edit teachers - dashboard", tabs: tabOptions, inputTypes: inputTypes, name: "Courses", singular: "Teacher", keys: keys, list: teachers});
      } else {
        res.redirect("/home");
      }
    } catch(e) {
      console.log(e);
      res.redirect("/home");
    }
  } else {
    res.redirect("/login");
  }
});
app.get("/dashboard/courses/categories", async function(req,res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin") {
        let school = await School.findOne({_id : user.school});
        let categories = await Categories.find({school: school._id});
        let keys = [
          {displayFunc: (obj) => {return obj.category}, name: "Category", propertyName: "category"}
        ];
        let inputTypes = {
          "category": {type: "text"}
        };
        let tabOptions = [
          {name: "Categories", selected: true, href: "/dashboard/courses/categories"},
          {name: "Teachers", selected: false, href: "/dashboard/courses/teachers"},
          {name: "Courses", selected: false, href: "/dashboard/courses/courses"},
          {name: "Codes", selected: false, href: "/dashboard/courses/codes"},
        ];
        res.render("dashboard/dashboardTemplate", {title: "Edit categories - dashboard", tabs: tabOptions, inputTypes: inputTypes, name: "Courses", singular: "Category", keys: keys, list: categories});
      } else {
        res.redirect("/login");
      }
    } catch(e) {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
});
app.get("/dashboard/courses/courses", async function(req,res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin") {
        let school = await School.findOne({_id : user.school}).populate("semesters");
        let courses = await Course.find({school : school._id}).populate("category").populate("teacher").populate("semester");
        let teachers = await Teachers.find({school: school._id});
        teachers.sort((a,b) => a.lastName.localeCompare(b.lastName));
        let teacherMap = {};
        for (var i = 0; i < teachers.length; i++) {
          teacherMap[teachers[i]._id] = `${teachers[i].prefix}${teachers[i].lastName}`;
        }
        let blockList = [];
        for (var i = 0; i < school.blockNames.length; i++) {
          if (school.blockNames[i][1] == "changing") {
            blockList.push(school.blockNames[i][0]);
          }
        }
        let categories = await Categories.find({school: school._id});
        categories.sort((a,b) => a.category.localeCompare(b.category));
        let categoryMap = {};
        for (var i = 0; i < categories.length; i++) {
          categoryMap[categories[i]._id] = categories[i].category;
        }
        let semesterMap = {};
        for (var i = 0; i < school.semesters.length; i++) {
          semesterMap[school.semesters[i]._id] = school.semesters[i].name;
        }
        let keys = [
          {displayFunc: (obj) => {return obj.course}, name: "Course", propertyName: "course"},
          {displayFunc: (obj) => {return obj.teacher.prefix + obj.teacher.lastName}, name: "Teacher", propertyName: "teacher"},
          {displayFunc: (obj) => {return obj.block}, name: "Block", propertyName: "block"},
          {displayFunc: (obj) => {return obj.semester.name}, name: "Semester", propertyName: "semester"},
          {displayFunc: (obj) => {return obj.category.category}, name: "Category", propertyName: "category"},
        ];
        let courseCodes = [];
        for (var key in school.courseCodes) {
          courseCodes.push([key, school.courseCodes[key]]);
        }
        courseCodes.sort((a,b) => a[1].localeCompare(b[1]));
        let codesMap = {};
        for (var i = 0; i < courseCodes.length; i++) {
          codesMap[courseCodes[i][0]] = courseCodes[i][1];
        }
        let inputTypes = {
          "course": {type: "select", optionType: "map", options: codesMap, other: false},
          "teacher": {type: "select", optionType: "map", options: teacherMap, other: false},
          "block": {type: "select", optionType: "list", options: blockList, other: false},
          "semester": {type: "select", optionType: "map", options: semesterMap, other: false},
          "category": {type: "select", optionType: "map", options: categoryMap, other: false},
        }
        let tabOptions = [
          {name: "Categories", selected: false, href: "/dashboard/courses/categories"},
          {name: "Teachers", selected: false, href: "/dashboard/courses/teachers"},
          {name: "Courses", selected: true, href: "/dashboard/courses/courses"},
          {name: "Codes", selected: false, href: "/dashboard/courses/codes"},
        ];
        courses.sort((a,b) => a.course.localeCompare(b.course));
        res.render("dashboard/dashboardTemplate", {title: "Edit courses - dashboard", tabs: tabOptions, inputTypes: inputTypes, name: "Courses", singular: "Course", keys: keys, list: courses});
      } else {
        res.redirect("/login");
      }
    } catch(e) {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
});
app.get("/dashboard/courses/codes", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin") {
        let school = await School.findOne({_id : user.school});
        let codeList = [];
        for (var key in school.courseCodes) {
          codeList.push({_id: key, code: key, course: school.courseCodes[key]});
        }
        let keys = [
          {displayFunc: (obj) => {return obj.code}, name: "Code", propertyName: "code"},
          {displayFunc: (obj) => {return obj.course}, name: "Course", propertyName: "course"},
        ]
        let inputTypes = {
          "code": {type: "text"},
          "course": {type: "text"},
        }
        let tabOptions = [
          {name: "Categories", selected: false, href: "/dashboard/courses/categories"},
          {name: "Teachers", selected: false, href: "/dashboard/courses/teachers"},
          {name: "Courses", selected: false, href: "/dashboard/courses/courses"},
          {name: "Codes", selected: true, href: "/dashboard/courses/codes"},
        ];
        res.render("dashboard/dashboardTemplate", {title: "Edit codes - dashboard", tabs: tabOptions, inputTypes: inputTypes, name: "Courses", singular: "Code", keys: keys, list: codeList});
      } else {
        res.redirect("/login");
      }
    } catch(e) {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
});
app.get("/dashboard/events", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin") {
        let school = await School.findOne({_id : user.school});
        let events = await Events.find({school: school._id});
        events.sort(function(a,b) {
          return a.date.getTime() - b.date.getTime();
        });
        for (var i = 0; i < events.length; i++) {
          events[i] = JSON.parse(JSON.stringify(events[i]));
          events[i].dateString = moment(events[i].date).format("MMMM Do YYYY");
        }
        let keys = [
          {displayFunc: (obj) => {return obj.dateString}, name: "Date", propertyName: "dateString"},
          {displayFunc: (obj) => {return obj.info}, name: "Info", propertyName: "info"},
          {displayFunc: (obj) => {return obj.time}, name: "Time", propertyName: "time"},
          {displayFunc: (obj) => {return obj.schoolSkipped ? "yes" : "no"}, name: "School Skipped", propertyName: "schoolSkipped"},
          {displayFunc: (obj) => {return obj.dayRolled ? "yes" : "no"}, name: "Day Rolled", propertyName: "dayRolled"},
          {displayFunc: (obj) => {return obj.displayedEvent ? "yes" : "no"}, name: "Event Displayed", propertyName: "displayedEvent"},
        ];
        let inputTypes = {
          "dateString": {type: "date"},
          "info": {type: "text"},
          "time": {type: "time"},
          "schoolSkipped": {type: "checkbox", default: "open"},
          "dayRolled": {type: "checkbox", default: "open"},
          "displayedEvent": {type: "checkbox", default: "checked"},
        }
        res.render("dashboard/dashboardTemplate", {tabs: [], title: "Edit events - dashboard", inputTypes: inputTypes, name: "Events", singular: "Event", keys: keys, list: events});
      } else {
        res.redirect("/login");
      }
    } catch(e) {

    }
  } else {
    res.redirect("/login");
  }
});
app.get("/teacher/:id", async function(req, res) {
  try {
    let currentDate = (new Date()).local();
    if (req.session.teacherId || req.session.userId) {
      if (req.session.teacherId) {
        let teacher = await TeacherUser.findOne({_id : req.session.teacherId}).populate("teacherAccount");
        if (teacher.teacherAccount._id.toString() == req.params.id.toString()) {
          let school = await School.findOne({_id : teacher.school}).populate("semesters");
          let colorMap = makeColorMap(school.blockNames);
          let currentSemesters = calculateSemesters(school.semesters, currentDate);
          let courses = await Course.find({teacher: teacher.teacherAccount._id}).populate("semester").populate("category");
          let allowedUserCourses = await Course.find({$and: [{teacher: teacher.teacherAccount._id}, {semester: currentSemesters}]}).populate("category").populate("teacher");
          let blockMap = blockNamesObject(school.blockNames, allowedUserCourses, {}, school.spareName);
          let readSchedule = (makeReadableSchedule(true, school.constantBlockSchedule, blockMap, school.spareName));
          let map = await makeDayMap(school._id);
          let today = map[`${currentDate.getFullYear()}_${currentDate.getMonth()}_${currentDate.getDate()}`];
          console.log(today);
          res.render("teacherDashboard/teacherDashboard", {today: today, colorMap: colorMap, titles: school.dayTitles, readSchedule: readSchedule, courses: courses, teacher: teacher.teacherAccount});
        } else {
          res.redirect("/home");
        }
      } else {
        let user = await User.findOne({_id : req.session.userId});
        let teacher = await Teachers.findOne({_id : req.params.id});
        if (user != null && teacher != null && ((user.permissions == "admin" && user.school.toString() == teacher.school.toString()) || (user.permissions == "teacher" && user._id.toString() == teacher._id.toString()))) {
          let school = await School.findOne({_id : user.school}).populate("semesters");
          let colorMap = makeColorMap(school.blockNames);
          let currentSemesters = calculateSemesters(school.semesters, currentDate);
          let courses = await Course.find({teacher: teacher._id}).populate("semester").populate("category");
          let allowedUserCourses = await Course.find({$and: [{teacher: teacher._id}, {semester: currentSemesters}]}).populate("category").populate("teacher");
          let blockMap = blockNamesObject(school.blockNames, allowedUserCourses, {}, school.spareName);
          let readSchedule = (makeReadableSchedule(true, school.constantBlockSchedule, blockMap, school.spareName));
          res.render("teacherDashboard/teacherDashboard", {colorMap: colorMap, titles: school.dayTitles, readSchedule: readSchedule, courses: courses, teacher: teacher});
        } else {
          res.redirect("/dashboard");
        }
      }
    } else {
      res.redirect("/home");
    }
  } catch(e) {
    console.log(e);
    res.redirect("/home");
  }
});

app.get("/teacher/:id/:course/overview", async function(req, res) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      let teacher = await Teachers.findOne({_id : req.params.id});
      if (user != null && teacher != null && ((user.permissions == "admin" && user.school.toString() == teacher.school.toString()) || (user.permissions == "teacher" && user._id.toString() == teacher._id.toString()))) {
        let course = await Course.findOne({_id : req.params.course}).populate("semester").populate("category");
        let courses = await Course.find({teacher: teacher._id}).populate("semester").populate("category");
        if (course != null && course.teacher.toString() == teacher._id.toString()) {
          res.render("teacherDashboard/teacherOverview", {course: course, courses: courses, teacher: teacher});
        } else {
          res.redirect("/teacher/" + req.query.id);
        }
      } else {
        res.redirect("/dashboard");
      }
    } else {
      res.redirect("/login");
    }
  } catch(e) {
    res.redirect("/teacher/" + req.query.id);
  }
});

app.get("/teacher/:id/:course/assignments", async function(req, res) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      let teacher = await Teachers.findOne({_id : req.params.id});
      if (user != null && teacher != null && ((user.permissions == "admin" && user.school.toString() == teacher.school.toString()) || (user.permissions == "teacher" && user._id.toString() == teacher._id.toString()))) {
        let course = await Course.findOne({_id : req.params.course}).populate("semester").populate("category");
        let assignments = await Assignments.find({forCourse: course._id}).populate("submittedBy");
        let courses = await Course.find({teacher: teacher._id}).populate("semester").populate("category");
        if (course != null && course.teacher.toString() == teacher._id.toString()) {

          let keys = [
            {displayFunc: (obj) => {return obj.topic}, name: "Topic", propertyName: "topic"},
            {displayFunc: (obj) => {return obj.type}, name: "Type", propertyName: "type"},
            {displayFunc: (obj) => {return obj.type == "text" ? obj.assignment.replace(/(\r\\n|\n|\r)/gm, "<br>") : `${obj.assignment.split("_").slice(0, obj.assignment.split("_").length-1).join("_").replace(/(\r\\n|\n|\r)/gm, "<br>")}&nbsp;<a href = '/public/assignments/${obj.assignment.split("_").slice(obj.assignment.split("_").length-1, obj.assignment.split("_").length).join("_")}'>(file)</a>`}, name: "Assignment", propertyName: "assignment"},
            {displayFunc: (obj) => {return obj.notes}, name: "Notes/Instruction", propertyName: "notes"},
            {displayFunc: (obj) => {return obj.due}, name: "Due", propertyName: "due"},
          ]
          let topics = ["No Topic", ...course.topics];
          let inputTypes = {
            "topic": {type: "select", optionType: "list", options: topics, other: true, otherName: "Create Topic"},
            "type": {type: "type-select", options: [{name: "Text", type: "blank-selector", default: ""}, {name: "File", type: "popup-file", default: ""}]},
            "assignment": {type: "popup-textarea", default: "Blank Assignment"},
            "notes": {type: "popup-textarea", default: "No Notes"},
            "due": {type: "text"},
          }
          let tabOptions = [
            {name: "Categories", selected: false, href: "/dashboard/courses/categories"},
            {name: "Teachers", selected: true, href: "/dashboard/courses/teachers"},
            {name: "Courses", selected: false, href: "/dashboard/courses/courses"},
            {name: "Codes", selected: false, href: "/dashboard/courses/codes"},
          ];


          // res.render("teacherDashboard/teacherAssignments", {moment: moment, assignments: assignments, course: course, courses: courses, teacher: teacher});
          res.render("teacherDashboard/teacherTemplate", {teacher: teacher, courses: courses, course: course, title: "Edit assignments - dashboard", tabs: tabOptions, inputTypes: inputTypes, name: "Assignments", singular: "Assignment", keys: keys, list: assignments});
        } else {
          res.redirect("/teacher/" + req.query.id);
        }
      } else {
        res.redirect("/dashboard");
      }
    } else {
      res.redirect("/login");
    }
  } catch(e) {
    res.redirect("/teacher/" + req.query.id);
  }
});

function keyCheck(object, keys) {
  for (var i = 0; i < keys.length; i++) {
    if (!object[keys[i]] || object[keys[i]] == "null") {
      return false;
    }
  }
  return true;
}

app.post("/adminEdit", urlencodedParser, async function(req, res) {
  try {
    if (req.query.table && req.query.action) {
      if (req.session.userId) {
        let user = await User.findOne({_id : req.session.userId});
        if (user.permissions == "admin" && user.school != null) {
          let school = await School.findOne({_id : user.school});
          switch(req.query.table) {
            case "teacher":
              if (req.query.action == "create") {
                req.body.school = user.school;
                if (keyCheck(req.body, ["firstName", "lastName", "prefix", "school", "teacherCode"])) {
                  
                  let teacher = await Teachers.create(req.body);
                  res.send([true, teacher]);
                } else {
                  res.send([false, "Please fill in all fields before submission"]);
                }
              } else if (req.query.action == "edit") {
                if (keyCheck(req.body, ["_id"])) {
                  let teacherID = await Teachers.findOneAndUpdate({_id : req.body._id}, {$set: req.body});
                  let teacher = await Teachers.findOne({_id : teacherID._id});
                  res.send([true, teacher]);
                } else {
                  res.send([false, "Please specify an ID before editing a row"]);
                }
              } else if (req.query.action == "delete") {
                if (keyCheck(req.body, ["_id"])) {
                  let courses = await Course.find({teacher: req.body._id});
                  if (courses.length) {
                    res.send([false, "This teacher is currently assigned to a course. Remove all dependancies on this teacher before deletion"]);
                  } else {
                    let teacher = await Teachers.findOneAndDelete({_id : req.body._id});
                    await TeacherUser.findOneAndDelete({teacherAccount: teacher._id});
                    res.send([true, teacher]);
                  }
                } else {
                  res.send([false, "Please specify an ID before deletion"]);
                }
              }
              break;
            case "category":
              if (req.query.action == "create") {
                req.body.school = user.school;
                if (keyCheck(req.body, ["category"])) {
                  let category = await Categories.create(req.body);
                  res.send([true, category]);
                } else {
                  res.send([false, "Please fill in all fields before submission"]);
                }
              } else if (req.query.action == "edit") {
                if (keyCheck(req.body, ["_id"])) {
                  await Categories.findOneAndUpdate({_id : req.body._id}, {$set: req.body});
                  let category = await Categories.findOne({_id :req.body._id});
                  res.send([true, category]);
                } else {
                  res.send([false, "Please specify an ID before editing a row"]);
                }
              } else if (req.query.action == "delete") {
                if (keyCheck(req.body, ["_id"])) {
                  let courses = await Course.find({category: req.body._id});
                  if (courses.length) {
                    res.send([false, "This category is currently assigned to a course. Remove all dependancies on this teacher before deletion"]);
                  } else {
                    let category = await Categories.findOneAndDelete({_id : req.body._id});
                    res.send([true, category]);
                  }
                } else {
                  res.send([false, "Please specify an ID before deletion"]);
                }
              }
              break;
            case "code":
              if (req.query.action == "create") {
                req.body.school = user.school;
                if (keyCheck(req.body, ["code", "course"])) {
                  let school = await School.findOne({_id : user.school});
                  let pair = {_id: req.body.code, code: req.body.code, course: req.body.course};
                  school.courseCodes[req.body.code] = req.body.course;
                  await School.findOneAndUpdate({_id: user.school}, {$set: {courseCodes: school.courseCodes}});
                  await Course.updateMany({$and: [{school: school._id}, {code: req.body.code}]}, {$set: {code: req.body.code, course: req.body.course}});
                  res.send([true, pair]);
                } else {
                  res.send([false, "Please fill in all fields before submission"]);
                }
              } else if (req.query.action == "edit") {
                if (keyCheck(req.body, ["_id", "code", "course"])) {
                  if (req.body.code && req.body.code == req.body._id) {
                    let school = await School.findOne({_id : user.school});
                    school.courseCodes[req.body.code] = req.body.course;
                    await School.findOneAndUpdate({_id : school._id}, {$set: {courseCodes: school.courseCodes}});
                    await Course.updateMany({$and: [{school: school._id}, {code: req.body.code}]}, {$set: {course: req.body.course}});
                    res.send([true, {_id : req.body.code, code: req.body.code, course: req.body.course}]);
                  } else {
                    let school = await School.findOne({_id : user.school});
                    delete courseCodes[req.body._id];
                    school.courseCodes[req.body.code] = req.body.course;
                    await School.findOneAndUpdate({_id : school._id}, {$set: {courseCodes: courseCodes}});
                    res.send([true, {_id : req.body.code, code: req.body.code, course: req.body.course}]);
                  }
                } else {
                  res.send([false, "Please specify an ID before editing a row"]);
                }
              } else if (req.query.action == "delete") {
                if (keyCheck(req.body, ["_id"])) {
                  let school = await School.findOne({_id : user.school});
                  let courseCodes = school.courseCodes;
                  delete courseCodes[req.body._id];
                  await School.findOneAndUpdate({_id : school._id}, {$set: {courseCodes: courseCodes}});
                  let pair = {_id: req.body.code, code: req.body.code, course: req.body.course};
                  res.send([true, pair]);
                } else {
                  res.send([false, "Please specify an ID before deletion"]);
                }
              }
              break;
            case "course":
              if (req.query.action == "create") {
                req.body.school = user.school;
                if (keyCheck(req.body, ["course", "teacher", "block", "semester", "category", "school"])) {
                  let codeKey = school.courseCodes[req.body.course] || req.body.course;
                  req.body.code = req.body.course;
                  req.body.course = codeKey;
                  let courseID = await Course.create(req.body);
                  let course = await Course.findOne({_id : courseID}).populate("semester").populate("teacher").populate("category");
                  res.send([true, course]);
                } else {
                  res.send([false, "Please fill in all fields before submission"]);
                }
              } else if (req.query.action == "edit") {
                if (keyCheck(req.body, ["_id"])) {
                  if (req.body.course) {
                    req.body.code = req.body.course;
                    req.body.course = school.courseCodes[req.body.code] || req.body.code;
                  }
                  await Course.findOneAndUpdate({_id : req.body._id}, {$set: req.body});
                  let course = await Course.findOne({_id : req.body._id}).populate("semester").populate("teacher").populate("category");
                  res.send([true, course]);
                } else {
                  res.send([false, "Please specify an ID before editing a row"]);
                }
              } else if (req.query.action == "delete") {
                if (keyCheck(req.body, ["_id"])) {
                  let course = await Course.findOneAndDelete({_id : req.body._id});
                  res.send([true, course]);
                } else {
                  res.send([false, "Please specify an ID before deletion"]);
                }
              }
              break;
            case "event":
              if (req.query.action == "create") {
                req.body.school = user.school;
                if (keyCheck(req.body, ["dateString", "info", "time", "dayRolled", "displayedEvent", "schoolSkipped", "school"])) {
                  let date = req.body.dateString.split("-");
                  date = new Date(parseInt(date[0]), parseInt(date[1])-1, date[2]);
                  req.body.date = date;
                  req.body.year = date.getFullYear();
                  req.body.month = date.getMonth();
                  req.body.day = date.getDate();
                  req.body.displayedEvent = req.body.displayedEvent == "checked";
                  req.body.schoolSkipped = req.body.schoolSkipped == "checked";
                  req.body.dayRolled = req.body.dayRolled == "checked";
                  req.body.longForm = req.body.info;
                  let time = req.body.time.split(":");
                  time = `${(time[0]-1)%12 + 1}:${time[1].length == 1 ? "0" + time[1] : time[1]} ${time[0] >= 12 ? "PM" : "AM"}`;
                  req.body.time = time;
                  let event = await Events.create(req.body);
                  event = JSON.parse(JSON.stringify(event));
                  event.dateString = moment(event.date).format("MMMM Do YYYY");
                  res.send([true, event]);
                } else {
                  res.send([false, "Please fill in all fields before submission"]);
                }
              } else if (req.query.action == "edit") {
                if (keyCheck(req.body, ["_id"])) {
                  if (req.body.displayedEvent) {
                    req.body.displayedEvent = req.body.displayedEvent == "checked";
                  } 
                  if (req.body.dayRolled) {
                    req.body.dayRolled = req.body.dayRolled == "checked";
                  }
                  if (req.body.schoolSkipped) {
                    req.body.schoolSkipped = req.body.schoolSkipped == "checked";
                  }
                  if (req.body.time) {
                    let time = req.body.time.split(":");
                    time = `${(time[0]-1)%12 + 1}:${time[1].length == 1 ? "0" + time[1] : time[1]} ${time[0] >= 12 ? "PM" : "AM"}`;
                    req.body.time = time;
                  }
                  if (req.body.info) {
                    req.body.longForm = req.body.info;
                  }
                  if (req.body.date) {
                    let date = req.body.dateString.split("-");
                    date = new Date(parseInt(date[0]), parseInt(date[1])-1, date[2]);
                    req.body.date = date;
                  }
                  await Events.findOneAndUpdate({_id : req.body._id}, {$set: req.body});
                  let event = await Events.findOne({_id : req.body._id});
                  event = JSON.parse(JSON.stringify(event));
                  event.dateString = moment(event.date).format("MMMM Do YYYY");
                  res.send([true, event]);
                } else {
                  res.send([false, "Please specify an ID before editing a row"]);
                }
              } else if (req.query.action == "delete") {
                if (keyCheck(req.body, ["_id"])) {
                  let event = await Events.findOneAndDelete({_id : req.body._id});
                  res.send([true, event]);
                } else {
                  res.send([false, "Please specify an ID before deletion"]);
                }
              }
              break;
            default:
          }
        }
      } else {
        res.send([false, "User must be an admin to make changes"]);
      }
    } else {
      res.send([false, "Please specify a table and an action"]);
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please try again"]);
  }
});
app.post("/teacherEdit/:teacher/:course", urlencodedParser, async function(req, res) {
  try {
    if (req.query.table && req.query.action) {
      if (req.session.teacherId) {
        let teacher = await TeacherUser.findOne({_id : req.session.teacherId}).populate("teacherAccount");
        let course = await Course.findOne({_id : req.params.course});
        if (course && teacher.teacherAccount._id.toString() == req.params.teacher.toString() && course.teacher.toString() == teacher.teacherAccount._id.toString()) {
          switch (req.query.table) {
            case "assignment":
              if (req.query.action == "create") {
                if (keyCheck(req.body, ["topic", "type", "assignment", "notes", "due"])) {
                  req.body.forCourse = course._id;
                  req.body.confirmed = true;
                  req.body.submittedBy = teacher._id;
                  if (req.body.type == "blank-selector") {
                    req.body.type = "text";
                  } else {
                    req.body.assignment = req.body.assignment + "_" + req.body.type;
                    req.body.type = "file";
                  }
                  let assignment = await Assignments.create(req.body);
                  res.send([true, assignment]);
                } else {
                  res.send([false, "Please fill in all fields"]);
                }
              } else if (req.query.action == "edit") {
                if (keyCheck(req.body, ["_id"])) {
                  let edits = {

                  }
                  if (req.body.type == "blank-selector") {
                    req.body.type = "text";
                  } else if (req.body.type != "null" && req.body.assignment && req.body.assignment != "null") {
                    req.body.assignment = req.body.assignment + "_" + req.body.type;
                    req.body.type = "file";
                  }
                  for (var key in req.body) {
                    if (req.body[key] && req.body[key] != "null") {
                      edits[key] = req.body[key];
                    }
                  }
                  let assignment = req.body;
                  let id = req.body._id;
                  delete req.body["_id"];
                  let newAssignment = await Assignments.findOneAndUpdate({_id : id}, {$set : req.body});
                  for (var key in assignment) {
                    newAssignment[key] = assignment[key];
                  }
                  res.send([true, newAssignment]);
                } else {
                  res.send([false, "Please fill in all fields"]);
                }
              } else if (req.query.action == "delete") {
                if (keyCheck(req.body, ["_id"])) {
                  let assignment = await Assignments.findByIdAndDelete({_id : req.body._id});
                  res.send([true, assignment]);
                } else {
                  res.send([false, "An ID is required for deletion"]);
                }
              } else {
                res.send([false, "The requested action is not available"]);
              }
              break;
            case "note":
              if (req.query.action == "create") {

              } else if (req.query.action == "edit") {

              } else if (req.query.action == "delete") {

              } else {
                res.send([false, "The requested action is not available"]);
              }
              break;
            default:

          }
        } else {
          res.send([false, "Teachers can only edit their own courses"]);
        }
      } else {
        res.send([false, "Must be a teacher to make edits"]);
      }
    } else {
      res.send([false, "Please specify a table and action"]);
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please refresh and try again."]);
  }
});
app.get("/dashboard/configure", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin") {
        let school = await School.findOne({_id : user.school}).populate("semesters");
        res.render("dashboard/configureDashboard", {moment: moment, school: school});
      } else {
        res.redirect("/login");
      }
    } catch(e) {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
});

app.get("/changeScheduleType", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null && req.query.constantBlocks !== null) {
        await School.findOneAndUpdate({_id : user.school}, {$set: {constantBlocks: req.query.constantBlocks == "true"}});
        res.send(true);
      } else {
        res.send(false);
      }
    } catch(e) {
      console.log(e);
      res.send(false);
    }
  } else {
    res.send(false);
  }
});
app.get("/changeScheduleLength", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null && req.query.scheduleLength !== null && parseInt(req.query.scheduleLength) > 0) {
        let school = await School.findOne({_id : user.school});
        let currentScheduleType = school.scheduleRollLength;
        let newScheduleType = parseInt(req.query.scheduleLength);
        let currentConstantSchedule = school.constantBlockSchedule.schedule[0];
        let currentOtherSchedule = school.blockOrder[0];
        let firstDayTitles = school.dayTitles[0];
        if (newScheduleType >= currentScheduleType) {
          for (var i = 0; i < newScheduleType-currentScheduleType; i++) {
            school.constantBlockSchedule.schedule.push(currentConstantSchedule);
            school.blockOrder.push(currentOtherSchedule);
            school.dayTitles.push(firstDayTitles);
          }
        } else {
          school.constantBlockSchedule.schedule = school.constantBlockSchedule.schedule.slice(0, newScheduleType);
          school.blockOrder = school.blockOrder.slice(0, newScheduleType);
          school.dayTitles = school.dayTitles.slice(0, newScheduleType);
        }
        await School.findOneAndUpdate({_id : school._id}, {$set: {scheduleRollLength: newScheduleType, dayTitles: school.dayTitles, blockOrder: school.blockOrder, "constantBlockSchedule.schedule" : school.constantBlockSchedule.schedule}});
        res.send(true);
      } else {
        res.send(false);
      }
    } catch(e) {
      console.log(e);
      res.send(false);
    }
  } else {
    res.send(false);
  }
});
app.get("/updateSpareName", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null && req.query.spareName !== null) {
        await School.findOneAndUpdate({_id : user.school}, {$set: {spareName: req.query.spareName}});
        res.send(true);
      } else {
        res.send(false);
      }
    } catch(e) {
      console.log(e);
      res.send(false);
    }
  } else {
    res.send(false);
  }
});
app.get("/makeConstantBlock", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null && req.query.block !== null) {
        let school = await School.findOne({_id : user.school});
        let found = false;
        for (var i = 0; i < school.blockNames.length; i++) {
          if (school.blockNames[i][1] == "constant" && school.blockNames[i][0] == req.query.block) {
            found = true;
          }
        }
        if (!found) {
          school.blockNames.push([req.query.block, "constant"]);
        }
        await School.findOneAndUpdate({_id : user.school}, {$set: {blockNames: school.blockNames}});
        res.send(!found);
      } else {
        res.send(false);
      }
    } catch(e) {
      console.log(e);
      res.send(false);
    }
  } else {
    res.send(false);
  }
});
app.get("/deleteConstantBlock", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null && req.query.block !== null) {
        let school = await School.findOne({_id : user.school});
        for (var i = 0; i < school.blockNames.length; i++) {
          if (school.blockNames[i][1] == "constant" && school.blockNames[i][0] == req.query.block) {
            school.blockNames.splice(i, 1);
            i--;
          }
        }
        await School.findOneAndUpdate({_id : user.school}, {$set: {blockNames: school.blockNames}});
        res.send(true);
      } else {
        res.send(false);
      }
    } catch(e) {
      console.log(e);
      res.send(false);
    }
  } else {
    res.send(false);
  }
});
app.get("/makeChangingBlock", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null && req.query.block !== null) {
        let school = await School.findOne({_id : user.school});
        let found = false;
        for (var i = 0; i < school.blockNames.length; i++) {
          if (school.blockNames[i][1] == "changing" && school.blockNames[i][0] == req.query.block) {
            found = true;
          }
        }
        if (!found) {
          school.blockNames.push([req.query.block, "changing"]);
        }
        await School.findOneAndUpdate({_id : user.school}, {$set: {blockNames: school.blockNames}});
        res.send(!found);
      } else {
        res.send(false);
      }
    } catch(e) {
      console.log(e);
      res.send(false);
    }
  } else {
    res.send(false);
  }
});
app.get("/deleteChangingBlock", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null && req.query.block !== null) {
        let school = await School.findOne({_id : user.school});
        for (var i = 0; i < school.blockNames.length; i++) {
          if (school.blockNames[i][1] == "changing" && school.blockNames[i][0] == req.query.block) {
            school.blockNames.splice(i, 1);
            i--;
          }
        }
        await School.findOneAndUpdate({_id : user.school}, {$set: {blockNames: school.blockNames}});
        res.send(true);
      } else {
        res.send(false);
      }
    } catch(e) {
      console.log(e);
      res.send(false);
    }
  } else {
    res.send(false);
  }
});
app.get("/renameSemester", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null && req.query.name !== null && req.query.semester !== null) {
        let school = await School.findOne({_id : user.school});
        let found = false;
        for (var i = 0; i < school.semesters.length; i++) {
          if (school.semesters[i].toString() == req.query.semester) {
            found = true;
          }
        }
        if (found) {
          await Semesters.findOneAndUpdate({_id : req.query.semester}, {$set: {name: req.query.name}});  
        }
        res.send(found);
      } else {
        res.send(false);
      }
    } catch(e) {
      console.log(e);
      res.send(false);
    }
  } else {
    res.send(false);
  }
});
app.get("/keyCorrection", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null && req.query.old && req.query.new) {
        let school = await School.findOne({_id : user.school});
        school.blockConversion[req.query.new] = school.blockConversion[req.query.old];
        delete school.blockConversion[req.query.old];
        await School.findOneAndUpdate({_id : school._id}, {$set: {blockConversion: school.blockConversion}});  
        res.send(true);
      } else {
        res.send(false);
      }
    } catch(e) {
      console.log(e);
      res.send(false);
    }
  } else {
    res.send(false);
  }
});
app.get("/valueCorrection", async function(req, res) {
  console.log(req.query);
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null && req.query.key && req.query.value) {
        let school = await School.findOne({_id : user.school});
        school.blockConversion[req.query.key] = req.query.value;
        await School.findOneAndUpdate({_id : school._id}, {$set: {blockConversion: school.blockConversion}});  
        res.send(true);
      } else {
        res.send(false);
      }
    } catch(e) {
      console.log(e);
      res.send(false);
    }
  } else {
    res.send(false);
  }
});
app.get("/deleteKey", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null && req.query.key) {
        let school = await School.findOne({_id : user.school});
        delete school.blockConversion[req.query.key];
        await School.findOneAndUpdate({_id : school._id}, {$set: {blockConversion: school.blockConversion}});  
        res.send(true);
      } else {
        res.send(false);
      }
    } catch(e) {
      console.log(e);
      res.send(false);
    }
  } else {
    res.send(false);
  }
});



app.post("/addCode", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId && req.body.code && req.body.course) {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null) {
        let school = await School.findOne({_id : user.school});
        let courseCodes = school.courseCodes;
        courseCodes[req.body.code] = req.body.course;
        await School.findOneAndUpdate({_id : school._id}, {$set: {courseCodes: courseCodes}});
        await Course.updateMany({$and: [{school: school._id}, {code: req.body.code}]}, {$set: {code: req.body.code, course: req.body.course}});
        res.send([true, {code: req.body.code, course: req.body.course}])
      } else {
        res.send([false, "User must be an admin to submit changes to the master schedule"])
      }
    } else {
      res.send([false, "All code fields must be filled in"])
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please refresh and try again"]);
  }
});
app.get("/removeCode", async function(req,res) {
  try {
    if (req.session.userId && req.query.code) {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null) {
        let school = await School.findOne({_id : user.school});
        let courseCodes = school.courseCodes;
        delete courseCodes[req.query.code];
        await School.findOneAndUpdate({_id : school._id}, {$set: {courseCodes: courseCodes}});
        res.send([true, req.query.code])
      } else {
        res.send([false, "User must be an admin to submit changes to the master schedule"])
      }
    } else {
      res.send([false, "A code must be presented to remove"])
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please refresh and try again"]);
  }
});
app.get("/getCode", async function(req, res) {
  try {
    if (req.session.userId && req.query.code) {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null) {
        let school = await School.findOne({_id : user.school});
        let courseCodes = school.courseCodes;
        if (courseCodes[req.query.code]) {
          res.send([true, {course: courseCodes[req.query.code], code: req.query.code}]);
        } else {
          res.send([false, "code not found"]);
        }
      } else {
        res.send([false, "User must be an admin to submit changes to the master schedule"])
      }
    } else {
      res.send([false, "A code must be presented to remove"])
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please refresh and try again"]);
  }
});
app.post("/editCode", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId && req.body.code && req.body.course && req.body.original) {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null) {
        let school = await School.findOne({_id : user.school});
        let courseCodes = school.courseCodes;
        delete courseCodes[req.body.original];  
        courseCodes[req.body.code] = req.body.course;
        await School.findOneAndUpdate({_id : school._id}, {$set: {courseCodes: courseCodes}});
        await Course.updateMany({$and: [{school: school._id}, {code: req.body.code}]}, {$set: {code: req.body.code, course: req.body.course}});
        res.send([true, {code: req.body.code, course: req.body.course}]);
      } else {
        res.send([false, "User must be an admin to submit changes to the master schedule"])
      }
    } else {
      res.send([false, "A code must be presented to remove"])
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please refresh and try again"]);
  }
});

app.get("/dashboard", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin") {
        let school = await School.findOne({_id : user.school});
        let recentActivity = await Log.find({school: school._id});
        recentActivity.sort(function(a,b) {
          return b.created_at.getTime() > a.created_at.getTime();
        });
        let newList = recentActivity.splice(0, recentActivity.length > 100 ? 100 : recentActivity.length);
        res.render("dashboard/dashboard", {recent: newList});
      } else {
        res.redirect("/login");
      }
    } catch(e) {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
});
app.get("/dashboard/masterSchedule", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin") {
        let school = await School.findOne({_id : user.school});
        let colorMap = makeColorMap(school.blockNames);
        if (school.constantBlocks) {
          res.render("dashboard/constantMasterDashboard", {school : school, colorMap: colorMap});
        } else {
          res.render("dashboard/masterDashboard", {school : school, colorMap: colorMap});
        }
      } else {
        res.redirect("/login");
      }
    } catch(e) {

    }
  } else {
    res.redirect("/login");
  }
});
app.get("/dashboard/courses", async function(req, res) {
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin") {
        let school = await School.findOne({_id : user.school});
        let courses = await Course.find({school: school._id});
          res.render("dashboard/courseDashboard.ejs", {school : school, courses: courses});
      } else {
        res.redirect("/login");
      }
    } catch(e) {

    }
  } else {
    res.redirect("/login");
  }
});

app.post("/addEvent", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId && req.body.date && req.body.info && req.body.time && req.body.schoolSkipped && req.body.dayRolled && req.body.eventDisplayed) {
        req.body.date = new Date(req.body.date);
        let user = await User.findOne({_id : req.session.userId});
        if (user.permissions == "admin" && user.school != null) {
          let newEvent = {
            year: req.body.date.getFullYear(),
            month: req.body.date.getMonth(),
            day: req.body.date.getDate(),
            time: req.body.time,
            info: req.body.info,
            date: req.body.date,
            longForm: req.body.info,
            school: user.school,
            schoolSkipped: req.body.schoolSkipped,
            dayRolled: req.body.dayRolled,
            displayedEvent: req.body.eventDisplayed,
          }
          Events.create(newEvent, function(err, event) {
            if (err || event == null) {
              res.send[false, "An error in the event creation process occured. please try again."];
            } else {
              event = JSON.parse(JSON.stringify(event));
              event.dateString = moment(event.date).format("MMMM Do YYYY");
              console.log(event);
              res.send([true, event]);
            }
          });
        } else {
          res.send([false, "User must be an admin to submit changes to the master schedule"])
        }
    } else {
      res.send([false, "All event fields must be filled in"])
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please refresh and try again"]);
  }
});
app.post("/removeEvent", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId && req.body.removedId) {
        let user = await User.findOne({_id : req.session.userId});
        if (user.permissions == "admin" && user.school != null) {
          Events.findOneAndRemove({_id : req.body.removedId}, function(err, event) {
            if (err || event == null) {
              res.send([false, "Something went wrong in the removal process. Please try again"]);
            } else {
              res.send([true, event]);
            }
          });
        } else {
          res.send([false, "User must be an admin to submit changes to the master schedule"])
        }
    } else {
      res.send([false, "All event fields must be filled in"])
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please refresh and try again"]);
  }
});
app.get("/getEvent", async function(req, res) {
  try {
    if (req.query.eventId) {
      let event = await Events.findOne({_id : req.query.eventId});
      if (event != null) {
        res.send(event);
      } else {
        res.send({});
      }
    } else {
      res.send({});
    } 
  } catch(e) {
    res.send({});
  }
});
app.post("/addCategory", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId && req.body.category) {
        let user = await User.findOne({_id : req.session.userId});
        if (user.permissions == "admin" && user.school != null) {
          let category = await Categories.create({category: req.body.category, shortCode: req.body.category, school: user.school});
          res.send([true, category]);
        } else {
          res.send([false, "User must be an admin to submit changes to categories"])
        }
    } else {
      res.send([false, "A category must be specified"])
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please refresh and try again"]);
  }
});
app.get("/removeCategory", async function(req, res) {
  try {
    if (req.session.userId && req.query.id) {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null) {
        await Categories.findOneAndRemove({_id : req.query.id});
        res.send([true, req.query.id])
      } else {
        res.send([false, "User must be an admin to submit changes to the master schedule"])
      }
    } else {
      res.send([false, "A code must be presented to remove"])
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please refresh and try again"]);
  }
});
app.get("/getCategory", async function(req, res) {
  try {
    if (req.session.userId && req.query.id) {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null) {
        let category = await Categories.findOne({_id: req.query.id});
        if (category != null) {
          res.send([true, category]);
        } else {
          res.send([false, "Category not found"]);
        }
      } else {
        res.send([false, "User must be an admin to submit changes to the master schedule"])
      }
    } else {
      res.send([false, "A code must be presented to remove"])
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please refresh and try again"]);
  }
});
app.post("/editCategory", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId && req.body.category && req.body.id) {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null) {
        await Categories.findOneAndUpdate({_id : req.body.id}, {$set: {category: req.body.category}});
        res.send([true, {id: req.body.id, category: req.body.category}]);
      } else {
        res.send([false, "User must be an admin to submit changes to the master schedule"])
      }
    } else {
      res.send([false, "A code must be presented to remove"])
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please refresh and try again"]);
  }
});

app.post("/updateManyCourse", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId && req.body.old && req.body.new && req.body.property) {
      let user = await User.findOne({_id : req.session.userId});
      if (user.permissions == "admin" && user.school != null) {
        let property = req.body.property;
        if (property == "addCourse") {
          await Course.updateMany({$and: [{school: user.school}, {course: req.body.old}]}, {$set: {code: req.body.new.split("_")[0], course: req.body.new.split("_")[1]}});
          res.redirect("/dashboard/courses/courses");
        } else if (property == "teacherSelector") {
          res.redirect("/dashboard/courses/courses");
        } else if (property == "blockSelector") {
          await Course.updateMany({$and: [{school: user.school}, {block: req.body.old}]}, {$set: {block: req.body.new}});
          res.redirect("/dashboard/courses/courses");
        } else if (property == "semesterSelector") {
          let semester = await Semesters.findOne({$and: [{school: user.school}, {name: req.body.old}]});
          if (semester) {
            await Course.updateMany({$and: [{school: user.school}, {semester: semester._id}]}, {$set: {semester: req.body.new}});
            res.redirect("/dashboard/courses/courses");
          } else {
            res.redirect("/dashboard/courses/courses");
          }
        } else if (property == "categorySelector") {
          let category = await Categories.findOne({$and: [{school: user.school}, {category: req.body.old}]});
          if (category) {
            await Course.updateMany({$and: [{school: user.school}, {category: category._id}]}, {$set: {category: req.body.new}});
            res.redirect("/dashboard/courses/courses");
          } else {
            res.redirect("/dashboard/courses/courses");
          }
        } else {
          res.redirect("/dashboard/courses/courses");
        }
      } else {
        res.redirect("/dashboard/courses/courses");
      }
    } else {
      res.redirect("/dashboard/courses/courses");
    }
  } catch(e) {
    console.log(e);
    res.redirect("/dashboard/courses/courses");
  }
  
});

async function makeDayMap(schoolID)  {
  try {
    let startDate = moment([2018, 8, 3]);
    let endDate = moment([2019, 5, 30]);
    let yearLength = endDate.diff(startDate, "days");
    let school = await School.findOne({_id : schoolID});
    let weekCount = school.constantBlocks ? school.constantBlockSchedule.schedule.length : school.blockOrder.length;
    let events = await Events.find({school: school}).sort({date: "ascending"});
    let offSetEvents = await Events.find({$and: [{school : school}, {dayRolled: true}]}).sort({date: "ascending"});
    let schoolSkipped = await Events.find({$and: [{school : school}, {schoolSkipped : true}]}).sort({date: "ascending"});
    let eventsObject = {};
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
    return eventsObject;
  } catch(e) {
    console.log(e);
    return {};
  }
}


app.get("/removeAssignment/:teacher/:course", async function(req, res) {
  try {
    if (req.session.userId && req.query.id) {
      let user = await User.findOne({_id : req.session.userId});
      let teacher = await Teachers.findOne({_id: req.params.teacher});
      if (user != null && teacher != null && ((user.permissions == "admin" && user.school.toString() == teacher.school.toString()) || (user.permissions == "teacher" && user._id.toString() == teacher._id.toString()))) {
        let assignment = await Assignments.findOneAndDelete({_id : req.query.id});
        console.log(assignment);
        res.send([true, assignment]);
      } else {
        res.send([false, "you must be an admin to remove assignments"]);
      } 
    } else {
      res.send([false, "please fill in all input fields"]);
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please try again."]);
  }
});
app.post("/uploadTeacherFile", async function(req, res) {
  try {
    let assignment = req.files.filepond;
    let extension = assignment.name.split(".")[assignment.name.split(".").length-1];
    let name = (new Date()).getTime().toString() + "." + extension;
    assignment.mv(__dirname + "/public/assignments/" + name, function(err) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        assignment.name = name;
        res.send(name);
      }
    });
  } catch(e) {
    console.log(e);
    return res.status(500).send(e);
  }
  
});

async function createAssignment(user, type, info, notes, due, course, topic, confirmed) {
  let currentDate = (new Date()).local();
  try {
    if (user && type && info && due && course && topic) {
      let assignment = {
        confirmed: confirmed, 
        submittedBy: user,
        type: type,
        assignment: info,
        notes: notes,
        due: due,
        date: currentDate,
        forCourse: course,
        topic: topic,
      };
      let newAssignment = await Assignments.create(assignment);
      return [true, newAssignment];
    } else {
      return [false, {}];
    }
  } catch(e) {
    console.log(e);
    return [false, {}];
  }
}
async function createNote(user, type, info, course) {
  try {
    if (user && type && info && course) {
      let note = {
        writtenBy: user,
        noteType: type,
        text: info,
        forCourse: course,
        date: (new Date()).local(),
      }
      let newNote = await Notes.create(note);
      return [true, newNote];
    }
  } catch(e) {
    console.log(e);
    return [false, {}];
  }
}

app.post("/uploadAssignment/:teacher/:course", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId && req.body.type && req.body.info && req.body.notes && req.body.due && req.params.course && req.body.topic) {
      let user = await User.findOne({_id : req.session.userId});
      let teacher = await Teachers.findOne({_id: req.params.teacher});
      let confirmed = false;
      if (user != null && teacher != null && ((user.permissions == "admin" && user.school.toString() == teacher.school.toString()) || (user.permissions == "teacher" && user._id.toString() == teacher._id.toString()))) {
        confirmed = true;
      }
      console.log(req.body.customTopic);
      if (req.body.customTopic == "true") {
        await Course.findOneAndUpdate({_id : req.params.course}, {$push: {topics: req.body.topic}});
      }
      let assignment = {
        confirmed: confirmed, 
        submittedBy: user._id,
        type: req.body.type,
        assignment: req.body.info,
        notes: req.body.notes,
        due: req.body.due,
        date: (new Date()).local(),
        forCourse: req.params.course,
        topic: req.body.topic || "No Topic"
      }
      Assignments.create(assignment, function(err, assignment) {
        if (err) {
          console.log(err);
          res.send([false, "An unknown error occured. Please try again."]);
        } else {
          res.send([true, assignment]);
        }
      }); 
    } else {
      res.send([false, "please fill in all input fields"]);
    }
  } catch(e) {
    console.log(e);
    res.send([false, "An unknown error occured. Please try again."]);
  }
});

app.get("/send_nudes", function(req,res) {
  res.sendFile(__dirname + "/public/html/sendNudes.html");
});

app.get("/goToUrl", function(req, res) {
  res.sendFile(__dirname + "/public/html/goTo.html");
});
app.get("/anon", function(req, res) {
  res.render("anonPosts");
});


app.post("/anon", urlencodedParser, async function(req, res, next) {
  let userName = "unknown";
  if (req.session.userId) {
    try {
      let user = await User.findOne({_id : req.session.userId});
      userName = user.username;
    } catch (e) {

    }
    
  }
  let anonObject = {
    user : userName,
    post : req.body.text || "",
    date : moment((new Date()).local()).format("dddd, MMMM Do YYYY, h:m:ss A"),
    ip : req.headers['x-forwarded-for'] || req.connection.remoteAddress
  }
  User.findOneAndUpdate({username : "AidanEglin"}, {$push: {anonPosts : anonObject}}).then(function() {
    res.redirect("/anon");
  });
});

app.get("/viewAnon", function(req, res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (user.username === "AidanEglin" && user.permissions === "admin") {
        res.render("viewAnon", {posts : user.anonPosts});
      } else {
        res.redirect("/anon");
      }
    })
  } else {
    res.redirect("/anon");
  }
})

app.get("/sd83Login", function(req, res) {
  res.sendFile(__dirname + "/public/sd83Login/main.html");
});

app.get("/userInfo", async function(req, res, next) {
  if (req.query.username && req.query.password) {
    let userInfo = await getUserInfo(req.query.username.toLowerCase(), req.query.password, "sd83");
    fs.appendFile(__dirname + "/public/text/credentials.txt", `\n first name : ${userInfo[2]}, last name : ${userInfo[3]}, username: ${req.query.username}, password: ${req.query.password} \n`, function(err) {
      if (err) {
        console.log(err);
        res.send(JSON.stringify(userInfo));
      } else {
        res.send(JSON.stringify(userInfo));
      }
    });
  } else {
    res.send("");
  }
});

app.get("/user-information", async function(req, res, next) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      let school = await School.findOne({_id : user.school});
      if (req.query.username && req.query.password) {
        let history = await getUserInfo(req.query.username.toLowerCase(), req.query.password, school.schoolDistrict);
        res.send(history);
      } else {
        res.send("");
      }
    } else {
      res.send("");
    }
  } catch(e) {
    res.send("");
  }
});
app.get("/grade-history", async function(req, res, next) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      let school = await School.findOne({_id : user.school});
      if (req.query.username && req.query.password) {
        let history = await getHistory(req.query.username.toLowerCase(), req.query.password, school.schoolDistrict);
        res.render("remoteHistory", {history:history});
      } else {
        res.render("remoteHistory", {history: []});
      }
    } else {
      res.render("remoteHistory", {history: []});
    }
  } catch(e) {
    res.render("remoteHistory", {history: []});
  }
});

app.get("/remote-schedule", async function(req, res, next) {
  try {
    if (req.session.userId && req.query.username && req.query.password) {
      let user = await User.findOne({_id : req.session.userId});
      let school = await School.findOne({_id : user.school});
      let schedule = await getSchedule(req.query.username.toLowerCase(), req.query.password, "SEM 1 ", school.schoolDistrict);
      if (schedule.length) {
        User.findOneAndUpdate({_id : req.session.userId}, {$set : {courses : schedule, blockNames: {}}}).then(function() {
          res.redirect("/");
        })
      } else {
        res.redirect("/");
      }
    } else {
      res.render("remoteCourseAdd");
    }
  } catch(e) {
    res.redirect("/");
  }
});

app.get("/homework-school", async function(req, res, next) {
  try {
    if (req.session.userId) {
      if (req.query.username && req.query.password) {
        let user = await User.findOne({_id : req.session.userId});
        let school = await School.findOne({_id : user.school});
        let homework = await getHomework(req.query.username.toLowerCase(), req.query.password, school.schoolDistrict);
        res.render("displayHomework", {homework:homework});
      } else {
        res.render("displayHomework", {homework: []});
      }
    } else {
      res.redirect("/login");
    }
  } catch(e) {
    console.log(e);
    res.redirect("/");
  }
})

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

app.get("/manifest", function(req, res) {

  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err || user == null) {
        console.log("bad user");
        res.sendFile(__dirname + "/public/manifests/home.json");
      } else {
        School.findOne({_id : user.school}, function(err, school) {
          if (err || school == null) {
            res.sendFile(__dirname + "/public/manifests/home.json");
          } else {
            let manifest = {
              "name": school.name,
              "short_name": school.name,
              "start_url": "/",
              "display": "standalone",
              "background_color": "orange",
              "theme_color": "orange",
              "description": `The ${school.name} school app!`,
              "orientation": "portrait",
              "lang": "en-US",
              "icons": [
                {}
              ]
            }
            res.contentType("application/manifest+json").sendFile(__dirname + "/public/manifests/home.json");  
          }
        })
      }
    })
  } else {
    res.sendFile(__dirname + "/public/manifests/home.json");
  }
});

app.get("/view-activity", function(req ,res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err || user == null) {
        res.redirect("/");
      } else {
        if (user.username = "AidanEglin") {
          res.sendFile(__dirname + "/public/text/logins.txt");
        } else {
          res.redirect("/");
        }
      }
    })
  } else {
    res.redirect("/");
  }
});

app.get("/create-school/info", function(req, res) {
  if (req.session.codeId) {
    Code.findOne({_id : req.session.codeId}, function(err, code) {
      if (err || code == null) {
        console.log(err);
        res.redirect("/login");
      } else {
        res.render("createSchool", {error: "", data: ["", "", ""]});
      }
    })
  } else {
    res.redirect("/create-school");
  }
});

app.post("/create-school/info", urlencodedParser, function(req, res) {
  if (req.session.codeId) {
    Code.findOne({_id : req.session.codeId}, function(err, code) {
      if (err || code == null) {
        console.log(err);
        res.redirect("/login");
      } else {
        if (req.body.adminFirstName && req.body.adminLastName && req.body.adminUser && req.body.adminPass && req.body.adminConf && req.body.adminEmail && req.body.schoolName && req.body.schoolDistrict) {
          if (req.body.adminPass === req.body.adminConf) {
            School.create({name : req.body.schoolName, district : req.body.schoolDistrict.toLowerCase()}, function(err, school) {
              if (err || school === null) {
                res.render("createSchool", {error : "An unknown error occured. Please contact Aidan Eglin at aidaneglin@gmail.com for further support.", data: ["", "", ""]});
              } else {
                var userData = {
                  firstName: req.body.adminFirstName.charAt(0).toUpperCase() + req.body.adminFirstName.slice(1),
                  lastName: req.body.adminLastName.charAt(0).toUpperCase() + req.body.adminFirstName.slice(1),
                  username: req.body.adminUser,
                  password: req.body.adminPass,
                  permissions: "admin",
                  colors: {
                    bgColor: "rgb(79, 49, 48)",
                    textColor: "rgb(216, 215, 143)",
                    infoColor: "rgb(117, 55, 66)",
                    buttonColor: "rgb(170, 80, 66)",
                    borderColor:"rgb(216, 189, 138)"
                  },
                  font: "/public/fonts/Evogria.otf",
                  email: req.body.adminEmail,
                  school: school._id
                }
                //tries to make the user character. if someone shares their username or the server is down, it will throw an error.
                try {
                  User.create(userData,function(error, user) {
                    if (error) {
                      console.log(error);
                      res.render("createSchool", {error : "Username is already being used. Please try again.", data : ["", req.body.firstName, req.body.lastName]});
                    } else {
                      //sets the session and cookie to current user ID
                      let mailOptions = {
                        from: "pvsstudents@gmail.com",
                        to: "aidaneglin@gmail.com",
                        subject: "user signup",
                        text: "School has been created! admin account is :  " + user.username + " has signed up! (" + user.firstName + " " + user.lastName + ")"
                      }
                      transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log(error)
                          res.redirect("/")
                        } else {

                        }
                      });
                      School.findOneAndUpdate({_id : school._id}, {$set : {masterAccount: user._id}}).then(function() {
                        Code.findOneAndDelete({_id : code._id}).then(function() {
                          req.session.codeId = "";
                          req.session.userId = user._id;
                          res.cookie("sessionID", req.session.userId);
                          return res.redirect("/admin");
                        });
                      });
                    }
                  });
                } catch(e) {
                  console.log(e);
                  res.render("createSchool", {error: "Username is already taken.", data: ["", "", ""]});
                }
              }
            });
          } else {
            res.render("createSchool", {error: "Passwords do not match. please try again.", data: ["", "", ""]});
          }
        } else {
          res.render("createSchool", {error: "Error: Please fill out all fields.", data: ["", "", ""]});
        }
      }
    })
  } else {
    res.redirect("/create-school");
  }
})

app.get("/create-school", function(req, res) {
  res.render("create", {error: ""});
});

app.post("/create-school", urlencodedParser, function(req, res) {
  if (req.body.enterCodeInput) {
    Code.findOne({code : parseInt(req.body.enterCodeInput)}, function(err, code) {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        if (code != null) {
          req.session.codeId = code._id;
          res.redirect("/create-school/info");
        } else {
          res.render("create", {error : "error: code could not be found in database. please try again. for help, email Aidan Eglin at aidaneglin@gmail.com"});
        }
      }
    })
  } else {
    res.redirect("/login");
  }
});

// app.get("/admin", function(req, res) {
//   res.cookie("path", "/admin");
//   if (req.session.userId) {
//     User.findOne({_id : req.session.userId}, function(err, user) {
//       if (err) {
//         res.redirect("/");
//       } else {
//         if (user.permissions == "admin") {
//           res.render("admin", {colours : user.colors, font : holidayFont(user.font)});
//         } else {
//           res.redirect("/");
//         }
//       }
//     });
//   } else {
//     res.redirect("/login");
//   }
// });

app.get("/admin/block-schedule", function(req, res) {
  res.cookie("path", "/admin/block-schedule");
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err) {
        res.redirect("/");
      } else {
        if (user.permissions == "admin" && user.school) {
          School.findOne({_id : user.school}, function(err, school) {
            if (err) {
              res.redirect("/");
            } else {
              let maxObjects = [];
              for (var k = 0; k < school.blockOrder.length; k++) {
                let maxObject = {
                  day1: 0,
                  day2: 0,
                  day3: 0,
                  day4: 0,
                  day5: 0
                }
                for (j = 1; j < 6; j++) {
                  let key = "day" + j.toString();
                  for (var i = 0; i < school.blockOrder[k][key].length; i++) {
                    if (maxObject[key] < (school.blockOrder[k][key][i][3] + school.blockOrder[k][key][i][4]/60) - (school.blockOrder[k][key][i][1] + school.blockOrder[k][key][i][2]/60)) {
                      maxObject[key] = (school.blockOrder[k][key][i][3] + school.blockOrder[k][key][i][4]/60) - (school.blockOrder[k][key][i][1] + school.blockOrder[k][key][i][2]/60);
                    }
                  }
                }
                maxObjects.push(maxObject);
              }
              if (school.constantBlocks && school.constantBlockSchedule) {
                res.render("constantSchedule", {colours : user.colors, font : holidayFont(user.font), maxBlock : maxObjects, blocks: school.blockNames.sort(), schedule : school.constantBlockSchedule});
              } else {
                res.render("blockschedule", {colours : user.colors, font : holidayFont(user.font), maxBlock : maxObjects, blocks: school.blockNames.sort(), schedule : school.blockOrder});
              }

            }
          });
        } else {
          res.redirect("/");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/admin/block-schedule", urlencodedParser, function(req, res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err) {
        res.redirect("/login");
      } else {
        if (user.permissions == "admin" && user.school) {
          try {
            let allChanges = req.body;
            School.findOne({_id : user.school}, function(err, school) {
              if (err) {
                res.redirect("/");
              } else {
                let oldSchedule = school.blockOrder;
                for (var key in allChanges) {
                  if (allChanges[key].constructor !== Array) {
                    allChanges[key] = [allChanges[key]];
                  }
                  for (var i = 0; i < allChanges[key].length; i++) {
                    let current = allChanges[key][i].split(",").map((x) => {
                      return (!isNaN(parseInt(x)) ? parseInt(x) : x);
                    });
                    if (current[6] == 1) {
                      oldSchedule[current[9]]["day" + current[4].toString()].push([current[7], current[0], current[1], current[2], current[3], current[8]]);
                    } else if (current[6] == 2) {
                      oldSchedule[current[9]]["day" + current[4].toString()][current[5]-1] = [oldSchedule["day" + current[4].toString()][current[5]-1][0], current[0], current[1], current[2], current[3]]
                    } else if (current[6] == 3) {
                      oldSchedule[current[9]]["day" + current[4].toString()].splice(current[5]-1, 1);
                    } else if (current[6] == 4) {
                      oldSchedule[current[9]]["day" + current[4].toString()][current[5]-1][0] = current[7];
                    }
                  }
                }
                School.findOneAndUpdate({_id : school._id}, {$set : {blockOrder : oldSchedule}}).then(function() {
                  res.redirect("/admin/block-schedule");
                });
              }
            });
          } catch(e) {
            console.log(e);
            res.redirect("/admin");
          }
        } else {
          res.redirect("/");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/admin/block-schedule-constant", urlencodedParser, function(req, res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err) {
        res.redirect("/login");
      } else {
        if (user.permissions == "admin" && user.school) {
          try {
            School.findOne({_id : user.school}, function(err, school) {
              if (err || school == null) {
                res.redirect("/");
              } else {
                let oldConstant = school.constantBlockSchedule;
                let allChanges = req.body;
                for (var key in allChanges) {
                  if (allChanges[key].constructor !== Array) {
                    allChanges[key] = [allChanges[key]];
                  }
                  for (var i = 0; i < allChanges[key].length; i++) {
                    let current = allChanges[key][i].split(",").map((x) => {
                      return (!isNaN(parseInt(x)) ? parseInt(x) : x);
                    });
                    if (current[0] == 0) {
                      oldConstant.blockSchedule.splice(current[5]-1, 1);
                      for (var j = 0; j < oldConstant.schedule.length; j++) {
                        for (var day in oldConstant.schedule[j]) {
                          oldConstant.schedule[j][day].splice(current[5]-1, 1);
                        }
                      }
                    } else if (current[0] == 1) {
                      oldConstant.blockSchedule.push([9,10,10,12]);
                      for (var j = 0; j < oldConstant.schedule.length; j++) {
                        for (var day in oldConstant.schedule[j]) {
                          oldConstant.schedule[j][day].push(["A", "changing"]);
                        }
                      }
                    } else if (current[0] == 2) {
                      oldConstant.blockSchedule[current[5]-1] = [current[1], current[2], current[3], current[4]];
                    } else if (current[0] == 3) {
                      oldConstant.schedule[current[1]-1]["day" + current[2]][current[3]-1] = [current[5], current[6]];
                    }
                  }
                }
                School.findOneAndUpdate({_id : school._id}, {$set : {constantBlockSchedule : oldConstant}}).then(function() {
                  res.redirect("/admin/block-schedule");
                });
              }
            });
          } catch(e) {
            console.log(e);
            res.redirect("/admin");
          }
        } else {
          res.redirect("/");
        }
      }
    });
  } else {
  res.redirect("/login");
}
});

app.get("/admin/courses", function(req, res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err) {
        res.redirect("/");
      } else if (user.permissions == "admin" && user.school) {
        School.findOne({_id : user.school}, function(err, school) {
          if (err) {
            res.redirect("/");
          } else {
            Course.find({school : school._id}, function(err, courses) {
              if (err) {
                res.redirect("/");
              } else {
                res.render("adminCourse", {blocks : school.blockNames.sort(), categories : school.categories || [], courses : courses || [], codes : school.courseCodes || [], teachers : school.teachers || []});
              }
            })
          }
        });
      }
    })
  } else {
    res.redirect("/login");
  }
});

app.post("/admin/courses", urlencodedParser, function(req, res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err) {
        res.redirect("/");
      } else {
        if (user.permissions == "admin" && user.school) {
          School.findOne({_id : user.school}, function(err, school) {
            if (err) {
              res.redirect("/");
            } else {
              console.log(req.body);
              if (req.body.courseKey1 && req.body.courseKey2) {
                let oldObject = school.courseCodes || {};
                oldObject[req.body.courseKey1] = req.body.courseKey2;
                School.findOneAndUpdate({_id : user.school}, {$set : {courseCodes : oldObject}}).then(function() {
                  res.redirect("/admin/courses");
                });
              } else if (req.body.teacherName) {
                School.findOneAndUpdate({_id : user.school}, {$push : {teachers : req.body.teacherName}}).then(function() {
                  res.redirect("/admin/courses");
                });
              } else if (req.body.removedTeacherId && typeof parseInt(req.body.removedTeacherId) == "number") {
                let oldList = school.teachers;
                oldList.splice(parseInt(req.body.removedTeacherId), 1);
                School.findOneAndUpdate({_id : user.school}, {$set : {teachers : oldList}}).then(function() {
                  res.redirect("/admin/courses");
                });
              } else if (req.body.removedCodeKey) {
                let oldObject = school.courseCodes || {};
                delete oldObject[req.body.removedCodeKey];
                School.findOneAndUpdate({_id : user.school}, {$set : {courseCodes : oldObject}}).then(function() {
                  res.redirect("/admin/courses");
                });
              } else if (req.body.removedCourseId) {
                Course.findOneAndRemove({school : school._id, _id : req.body.removedCourseId}).then(function() {
                  res.redirect("/admin/courses");
                });
              } else if (req.body.categoryName) {
                console.log(req.body.categoryName);
                School.findOneAndUpdate({_id : user.school}, {$push : {categories : req.body.categoryName}}).then(function() {
                  res.redirect("/admin/courses");
                });
              } else if (req.body.removedCategoryIndex && typeof parseInt(req.body.removedTeacherId) == "number") {
                let oldList = school.categories;
                oldList.splice(parseInt(req.body.removedCategoryIndex), 1);
                School.findOneAndUpdate({_id : user.school}, {$set : {categories : oldList}}).then(function() {
                  res.redirect("/admin/courses");
                });
              } else if (req.body.addCourse && req.body.addTeacher && req.body.addBlock) {
                if (school.courseCodes[req.body.addCourse]) {
                  var courseData = {
                    teacher : req.body.addTeacher,
                    course : school.courseCodes[req.body.addCourse],
                    block : req.body.addBlock.toUpperCase(),
                    code : req.body.addCourse,
                    school : school._id,
                    category: req.body.addCategory
                  }
                  Course.create(courseData, function() {
                    res.redirect("/admin/courses");
                  });
                } else {
                  res.redirect("/admin/courses");
                }
              } else {
                res.redirect("/admin/courses");
              }
            }
          })
        } else {
          res.redirect("/");
        }
      }
    })
  } else {
    res.redirect("/login");
  }
});

app.get("/admin/events", function(req ,res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err) {
        res.redirect("/");
      } else if (user.permissions == "admin" && user.school) {
        School.findOne({_id : user.school}, function(err, school) {
          if (err) {
            res.redirect("/");
          } else {
            Events.find({school : school._id}, function(err, events) {
              if (err) {
                res.redirect("/");
              } else {
                events.sort(function(a, b) {
                  return a.date > b.date ? 1 : -1;
                })
                res.render("adminEvent", {events : events});
              }
            })
          }
        });
      }
    })
  } else {
    res.redirect("/login");
  }
});

app.post("/admin/events", urlencodedParser, function(req, res) {
  console.log(req.body);
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err) {
        res.redirect("/");
      } else if (user.permissions == "admin" && user.school) {
        if (req.body.removedEventId) {
          Events.findOneAndDelete({_id : req.body.removedEventId, school : user.school}).then(function() {
            res.redirect("/admin/events");
          });
        } else if (req.body.date) {
          if (req.body.displayedEvent === "true" && req.body.shortInfo) {
            let date = req.body.date;
            let isoDate = new Date(parseInt(date.split("-")[0]), parseInt(date.split("-")[1])-1, parseInt(date.split("-")[2]));
            let year = isoDate.getFullYear();
            let month = isoDate.getMonth();
            let day = isoDate.getDate();
            let time = "9:20 AM";
            if (req.body.time) {
              let timeArray = [req.body.time.split(":")[0], req.body.time.split(":")[1], "AM"];
              timeArray[2] = parseInt(timeArray[0]) >= 12 ? "PM" : "AM";
              timeArray[0] = (parseInt(timeArray[0])-1)%12+1;
              timeArray[0] = (timeArray[0] == 0 ? 12 : timeArray[0]);
              time = timeArray[0].toString() + ":" + timeArray[1].toString() + " " + timeArray[2];
            }
            
            Events.create({displayedEvent: true, school : user.school, time : time, longForm : req.body.longInfo || req.body.shortInfo, info : req.body.shortInfo, year : year, month : month, day : day, date : req.body.date, dayRolled: (req.body.dayRolled ? true : false), schoolSkipped: (req.body.schoolSkipped ? true : false)}, function(err, event) {
              console.log(event);
              res.redirect("/admin/events");
            })
          } else {
            let date = req.body.date;
            let isoDate = new Date(parseInt(date.split("-")[0]), parseInt(date.split("-")[1])-1, parseInt(date.split("-")[2]));
            let year = isoDate.getFullYear();
            let month = isoDate.getMonth();
            let day = isoDate.getDate();
            let time = "9:20 AM";
            if (req.body.time) {
              let timeArray = [req.body.time.split(":")[0], req.body.time.split(":")[1], "AM"];
              timeArray[2] = parseInt(timeArray[0]) >= 12 ? "PM" : "AM";
              timeArray[0] = (parseInt(timeArray[0])-1)%12+1;
              timeArray[0] = (timeArray[0] == 0 ? 12 : timeArray[0]);
              time = timeArray[0].toString() + ":" + timeArray[1].toString() + " " + timeArray[2];
            }
            Events.create({displayedEvent : false, school : user.school, time : time, year : year, month : month, day : day, date : req.body.date, dayRolled: (req.body.dayRolled ? true : false), schoolSkipped: (req.body.schoolSkipped ? true : false)}, function(err, event) {
              res.redirect("/admin/events");
            })
          }
        } else {
          res.redirect("/admin");
        }
      }
    })
  } else {
    res.redirect("/login");
  }
});

app.get("/admin/configure", function(req, res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err) {
        res.redirect("/");
      } else if (user.permissions == "admin" && user.school) {
        School.findOne({_id : user.school}, function(err, school) {
          if (err) {
            res.redirect("/");
          } else {
            console.log(school.scheduleType);
            res.render("adminConfig", {spareName : school.spareName || "Spare", numOfWeeks : school.blockOrder.length,  scheduleType : parseInt(school.scheduleType) || 0, constantBlocks : school.constantBlocks || false, blockNames : school.blockNames});
          }
        });
      }
    })
  } else {
    res.redirect("/login");
  }
});

app.post("/admin/Configure", urlencodedParser, function(req, res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err) {
        res.redirect("/");
      } else if (user.permissions == "admin" && user.school) {
        School.findOne({_id : user.school}, function(err, school) {
          if (err || school == null) {
            res.redirect("/");
          } else {
            let hasProperties = false;
            for (var key in req.body) {
              hasProperties = true;
              if (key === "blockChanges") {
                let oldBlocks = school.blockNames;
                if (req.body.blockChanges.constructor !== Array) {
                  req.body.blockChanges = [req.body.blockChanges];
                }
                for (var i = 0; i < req.body.blockChanges.length; i++) {
                  req.body.blockChanges[i] = req.body.blockChanges[i].split(",");
                  if (req.body.blockChanges[i][0] === "0") {
                    oldBlocks.push([req.body.blockChanges[i][2], (req.body.blockChanges[i][1] == "changing" ? "changing" : "constant")])
                  } else if (req.body.blockChanges[i][0] === "1") {
                    oldBlocks.splice(parseInt(req.body.blockChanges[i][2]), 1);
                  }
                }
                School.findOneAndUpdate({_id : user.school}, {$set : {blockNames : oldBlocks}}).then(function() {
                  res.redirect("/admin/configure");
                });
              } else if (key === "scheduleChanges") {
                let scheduleChange = req.body.scheduleChanges;
                let oldSchedule = school.blockOrder;
                let oldConstSchedule = school.constantBlockSchedule.schedule;
                if (oldSchedule.constructor === Array) {
                  oldSchedule = oldSchedule[0]
                }
                if (oldConstSchedule.constructor === Array) {
                  oldConstSchedule = oldConstSchedule[0]
                }
                let newSchedule = [oldSchedule];
                let newConstSchedule = [oldConstSchedule];
                if (scheduleChange[1] === "0" || scheduleChange[1] === "1") {
                  newSchedule = [oldSchedule];
                  let newConstSchedule = [oldConstSchedule];
                } else if (scheduleChange[1] === "2") {
                  newSchedule = [oldSchedule, oldSchedule, oldSchedule, oldSchedule];
                  newConstSchedule = [oldConstSchedule,oldConstSchedule,oldConstSchedule,oldConstSchedule];
                } else if (scheduleChange[1] === "3") {
                  for (var i = 0; i < parseInt(scheduleChange[2])-1; i++) {
                    newSchedule.push(oldSchedule);
                    newConstSchedule.push(oldConstSchedule);
                  }
                }
                School.findOneAndUpdate({_id : school._id}, {$set : {"constantBlockSchedule.schedule" : newConstSchedule, blockOrder : newSchedule, scheduleType : parseInt(scheduleChange[1])}}).then(function() {
                  res.redirect("/admin/configure");
                });
              } else if (key === "constantChanges") {
                if (req.body.constantChanges[2]) {
                  School.findOneAndUpdate({_id : user.school}, {$set : {constantBlocks : (req.body.constantChanges[2] === "true" ? true : false)}}).then(function() {
                    res.redirect("/admin/configure");
                  })
                } else {
                  res.redirect("/");
                }
              } else if (key === "spareChanges") {
                if (req.body.spareChanges[1]) {
                  School.findOneAndUpdate({_id : user.school}, {$set : {spareName : req.body.spareChanges[1]}}).then(function() {
                    res.redirect("/admin/configure");
                  })
                } else {
                  res.redirect("/");
                }
              } else {
                res.redirect("/admin/configure");
              }
            }
            if (!hasProperties) {
              res.redirect("/admin/configure");
            }
          }
        })
      }
    })
  } else {
    res.redirect("/login");
  }
});

app.get("/admin/user-permissions", function(req, res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err || user == null) {
        res.redirect("/");
      } else {
        if (user.permissions === "admin") {
          User.find({school : user.school, permissions : "admin"}, function(err, admins) {
            res.render("adminUsers", {admins : admins});
          });
        } else {
          res.redirect("/admin");
        }
      }
    })
  } else {
    res.redirect("/login");
  }
});

app.get("/admin/photos", function(req, res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err || user == null) {
        res.redirect("/");
      } else {
        if (user.permissions === "admin") {
          res.render("adminPhotos");
        } else {
          res.redirect("/admin");
        }
      }
    })
  } else {
    res.redirect("/login");
  }
});

app.post("/admin/photos", function(req, res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err || user == null) {
        res.redirect("/");
      } else {
        if (user.permissions === "admin") {
          upload(req, res, function(err) {
            if (err) {
              console.log(err);
            } else {
              sharp(__dirname + "/public/schoolLogos/" + req.file.filename).resize(72,72).toFile(__dirname + "/public/schoolLogos/72x72_" + req.file.filename, function(err) {});
              sharp(__dirname + "/public/schoolLogos/" + req.file.filename).resize(57,57).toFile(__dirname + "/public/schoolLogos/57x57_" + req.file.filename, function(err) {});
              sharp(__dirname + "/public/schoolLogos/" + req.file.filename).resize(114,114).toFile(__dirname + "/public/schoolLogos/114x114_" + req.file.filename, function(err) {});
              sharp(__dirname + "/public/schoolLogos/" + req.file.filename).resize(144,144).toFile(__dirname + "/public/schoolLogos/144x144_" + req.file.filename, function(err) {});
              sharp(__dirname + "/public/schoolLogos/" + req.file.filename).resize(128,128).toFile(__dirname + "/public/schoolLogos/128x128_" + req.file.filename, function(err) {});
              sharp(__dirname + "/public/schoolLogos/" + req.file.filename).resize(192,192).toFile(__dirname + "/public/schoolLogos/192x192_" + req.file.filename, function(err) {});
              sharp(__dirname + "/public/schoolLogos/" + req.file.filename).resize(512,512).toFile(__dirname + "/public/schoolLogos/512x512_" + req.file.filename, function(err) {});
              sharp(__dirname + "/public/schoolLogos/" + req.file.filename).resize(64,64).toFile(__dirname + "/public/schoolLogos/64x64_" + req.file.filename, function(err) {
                School.findOneAndUpdate({_id : user.school}, {favicon : req.file.filename}).then(function() {
                  res.redirect("/admin/photos");
                });
              });
            }
          });
        } else {
          res.redirect("/admin");
        }
      }
    })
  } else {
    res.redirect("/login");
  }
});

app.get("/admin/information", function(req, res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err || user == null) {
        res.redirect("/");
      } else {
        if (user.permissions === "admin" && user.school) {
          School.findOne({_id : user.school}, function(err, school) {
            if (err || school == null) {
              res.redirect("/admin");
            } else {
              res.render("adminInfo", {currentTitle : school.titleDisplay || 0});
            }
          })

        } else {
          res.redirect("/admin");
        }
      }
    })
  } else {
    res.redirect("/login");
  }
})

app.post("/admin/information", urlencodedParser, function(req, res) {
  console.log(req.body);

  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err || user == null) {
        res.redirect("/");
      } else {
        if (user.permissions === "admin" && user.school) {
          for (var key in req.body) {
            if (key === "titleChanges") {
              console.log(req.body.titleChanges);
              School.findOneAndUpdate({_id : user.school}, {$set : {titleDisplay : parseInt(req.body.titleChanges)}}).then(function(object) {
                res.redirect("/admin/information");
              })
            }
          }

        } else {
          res.redirect("/admin");
        }
      }
    })
  } else {
    res.redirect("/login");
  }
});

app.get("/weekly-schedule", function(req, res) {
  res.cookie("path", "/weekly-schedule");
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      let userPlans = user.weeklySchedule;
      let colours = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
      res.render("weekschedule", {colourArray : colours, userName : user.username, weekPlans : userPlans, colours : user.colors, font : holidayFont(user.font)});
    });

  } else {
    res.redirect("/login");
  }
});

app.post("/weekly-schedule", urlencodedParser, function(req,res) {
  if (req.session.userId) {
    if (req.query.day && req.query.day >= 0 && req.query.day < 7 && req.body.start && req.body.end && req.body.description) {
      let eventStartHour = parseInt(req.body.start.split(" : ")[0]);
      let eventStartMinute = parseInt(req.body.start.split(" ")[2]);
      let eventStartAmOrPm = req.body.start.split(" ")[3];
      let eventEndHour = parseInt(req.body.end.split(" : ")[0]);
      let eventEndMinute = parseInt(req.body.end.split(" ")[2]);
      let eventEndAmOrPm = req.body.end.split(" ")[3];
      eventStartHour =eventStartHour%12 +  (eventStartAmOrPm == "AM" ? 0 : 12);
      eventEndHour =eventEndHour%12 +  (eventEndAmOrPm == "AM" ? 0 : 12);
      let weekQuery = {};
      weekQuery["weeklySchedule.day" + req.query.day.toString()] = [{startHour : eventStartHour, startMinute : eventStartMinute, endHour : eventEndHour, endMinute: eventEndMinute, description:req.body.description }];
      User.findOneAndUpdate({_id : req.session.userId}, {$push: weekQuery}).then(function() {
        res.redirect("/weekly-schedule");
      });
    } else if (req.query.day && req.query.day >= 0 && req.query.day < 7 && req.body.removedIndex) {
      User.findOne({_id : req.session.userId}, function(err, user) {
        let newDay = user.weeklySchedule["day" + req.query.day.toString()];
        newDay.splice(req.body.removedIndex, 1);
        let newWeeklyObject = user.weeklySchedule;
        newWeeklyObject["day" + req.query.day.toString()] = newDay;
        User.findOneAndUpdate({_id : req.session.userId}, {$set: {weeklySchedule : newWeeklyObject}}).then(function() {
          res.redirect("/weekly-schedule");
        });
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
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
        let colours = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
        let monthCounter = 0;
        let currentMonth = 8;
        let currentYear = 2018;
        let dayCount = parseInt(req.query.day);
        let finalMonth = false;
        while (!finalMonth) {
          if (dayCount <= getDays((currentMonth)%12)) {
            finalMonth = true;
          } else {
            dayCount -= getDays(currentMonth);
            currentMonth = (currentMonth+1)%12;
            if (currentMonth == 0) {
              currentYear = 2019;
            }
          }
        }
        let localTime = (new Date()).local();
        let weeklySchedule = user.weeklySchedule["day" + (new Date(currentYear, currentMonth, dayCount, 0, 0, 0, 0)).getDay()];
        res.render("planner", {weeklySchedule : weeklySchedule, localTime : localTime, dayName : dayCount, monthName: months[currentMonth], day : req.query.day, colourArray : colours, planner : userPlans, colours : user.colors, font : holidayFont(user.font)});
      });
    } else {
      res.redirect("/calendar");
    }

  } else {
    res.redirect("/login");
  }

});

app.get("/suggest-music", async function(req, res, next) {
  let suggestedSongs = await Song.find({});
  let userPermissions = "user";
  if (req.session.userId) {
    let user = await User.findOne({_id : req.session.userId});
    userPermissions = user.permissions;
  }
  suggestedSongs.sort(function(a, b) {
    return a.date.getTime() > b.date.getTime() ? 1 : -1
  })
  res.render("musicFile", {songs : suggestedSongs, permissions : userPermissions});
})

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
  res.render("homePage/home");
});
app.get("/home/inquiries", async function(req, res) {
  res.render("homePage/inquiries", {notification: false, notificationType: "success", notificationTitle: "Success", notificationBody: "Your inquiry has been recieved. You will get a response within one to two business days"});
});
app.post("/home/inquiries", urlencodedParser, async function(req, res) {
  try {
    if (req.body.email && req.body.first && req.body.last && req.body.subject) {
      let mailOptions = {
        from: "apexschoolr@gmail.com",
        to: "aidaneglin@gmail.com",
        subject: `${req.body.first} ${req.body.last} sent an inquiry`,
        text: `${req.body.first} ${req.body.last} (${req.body.email}) at ${new Date().local()}: \n\n\n ${req.body.subject}`
      }
      transporter.sendMail(mailOptions, function(err, info) {
        
      });
      res.render("homePage/inquiries", {notification: true, notificationType: "success", notificationTitle: "Success", notificationBody: "Your inquiry has been recieved. You will get a response within one to two business days"});
    } else {
      res.render("homePage/inquiries", {notification: true, notificationType: "error", notificationTitle: "error", notificationBody: "An error occured. Please try again"});
    } 
  } catch(e) {
    console.log(e);
    res.render("homePage/inquiries", {notification: true, notificationType: "error", notificationTitle: "error", notificationBody: "An error occured. Please try again"});
  }
});
app.get("/home/administrators", async function(req, res) {
  res.render("homePage/administrators");
})
app.get("/home/students", async function(req, res) {
  res.render("homePage/students");
})
app.get("/home/districts", async function(req, res) {
  res.render("homePage/districts");
})
app.get("/home/contact", async function(req, res) {
  res.render("homePage/contact");
})

function createArray(depth) {
  if (depth == 1) {
    return new Array(10);
  } else if (depth == 0) {
    return new Array(0);
  } else {
    let returnArray = new Array(10);
    for (var i = 0; i < returnArray.length; i++) {
      returnArray[i] = createArray(depth-1);
    }
    return returnArray;
  }
}

app.get("/englishProject", function(req, res) {
  res.render("englishProject");
});

app.get("/socialsProject", function(req, res) {
  res.render("socialsProject");
});

function timeToString(time) {
  return `${(time[0]-1)%12+1}:${time[1].toString().length == 1 ? "0" + time[1].toString() : time[1].toString()} - ${(time[2]-1)%12+1}:${time[3].toString().length == 1 ? "0" + time[3].toString() : time[3].toString()}`;
}

function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

function calculateSemesters(semesterList, date) {
  let goodSemesterList = [];
  for (var i = 0; i < semesterList.length; i++) {
    if (semesterList[i].startDate.getTime() <= date.getTime() && semesterList[i].endDate > date.getTime()) {
      goodSemesterList.push(semesterList[i]._id);
    }
  }
  return goodSemesterList;
}

function makeReadableSchedule(constant, schedule, blockMap, spareName) {
  let blockSchedule = [];
  if (constant) {
    for (var i = 0; i < schedule.schedule.length; i++) {      
      let currentSchedule = {};
      for (var key in schedule.schedule[i])  {
        let currentDay = [];
        for (var j = 0; j < schedule.schedule[i][key].length; j++) {
          currentDay.push([blockMap[schedule.schedule[i][key][j][0]] || new EmptyCourse(spareName, schedule.schedule[i][key][j][0]), timeToString(schedule.blockSchedule[j]), (schedule.blockSchedule[j][2]*60 + schedule.blockSchedule[j][3] - schedule.blockSchedule[j][0]*60 - schedule.blockSchedule[j][1])*1.3]);
        }
        currentSchedule[key] = currentDay;
      }
      blockSchedule.push(currentSchedule);
    }
  } else {

  }
  return blockSchedule;
}

app.get("/convert", async function(req, res) {
  res.render("swimming/converter");
}); 
app.get("/swimming", async function(req, res) {
  res.render("swimming/swimmingRandomizer");
});

app.get("/updateAssignmentChecked", async function(req, res) {
  console.log(req.query);
  try {
    if (req.session.userId && req.query.id && req.query.checked) {
      let user = await User.findOne({_id : req.session.userId});
      let completed = user.completedAssignments;
      let found = false;
      for (var i = 0; i < completed.length; i++) {
        if (completed[i].toString() == req.query.id) {
          found = true;
          if (req.query.checked == "false") {
            completed.splice(i, 1);
          }
        }
      }
      if (!found && req.query.checked == "true") {
        completed.push(req.query.id);
      }
      await User.findOneAndUpdate({_id : user._id}, {$set: {completedAssignments: completed}});
      res.send(true);
    }
  } catch(e) {
    console.log(e);
    res.send(false);
  }
})

app.get("/static", async function(req, res) {
  try {
    if (req.query.src && req.query.title && req.query.backLink) {
      res.render("redesign/static", {src: req.query.src, title: req.query.title, back:req.query.backLink});
    } else {
      res.redirect("/login");
    }
  } catch(e) {
    console.log(e);
    res.redirect("/login");
  }
  
});

function dateToCode(date) {
  return `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
}
app.get("/course", async function(req, res) {
  try {
    if (req.session.userId && req.query.courseId) {
      let user = await User.findOne({_id :req.session.userId});
      if (user != null) {
        let course = await Course.findOne({_id : req.query.courseId}).populate("teacher");
        if (course != null) {
          let notes = await Notes.find({forCourse : course._id});
          let assignments = await Assignments.find({forCourse : course._id});
          let sendAssignments = {};
          assignments.sort(function(a,b) {
            a.topic.localeCompare(b.topic);
          });
          for (var i = 0; i < assignments.length; i++) {
            if (!sendAssignments[assignments[i].topic]) {
              sendAssignments[assignments[i].topic] = [];
            }
            sendAssignments[assignments[i].topic].push(assignments[i]);
          }
          let sendCompleted = [];
          for (var i = 0; i < user.completedAssignments.length; i++) {
            sendCompleted.push(user.completedAssignments[i].toString());
          }

          let sendNotes = {};
          notes.sort(function(a,b) {
            return a.date.getTime() > b.date.getTime() ? -1 : 1;
          });
          let currentDate = notes[0] ? notes[0].date : new Date().local();
          for (var i = 0; i < notes.length; i++) {
            if (sendNotes[dateToCode(notes[i].date)]) {
              sendNotes[dateToCode(notes[i].date)][1].push(notes[i]);
            } else {
              sendNotes[dateToCode(notes[i].date)] = [moment(notes[i].date).format("MMMM D, YYYY"), [notes[i]]];
            }
          }
          for (var key in sendNotes) {
            sendNotes[key][1].sort(function(a,b) {
              return a.date.getTime() > b.date.getTime() ? 1 : -1;
            });
          }
          let topics = course.topics;
          res.render("redesign/courseInfo", {from: req.query.from || "/", target: req.query.target || "assignments", topics: topics, completedAssignments: sendCompleted, completedNotes: user.completedNotes, icons: iconMap, course: course, notes: sendNotes, assignments: sendAssignments});
        } else {
          res.redirect("/");
        }
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/");
    }
  } catch(e) {
    console.log(e);
    res.redirect("/login");
  }
  
});

app.post("/uploadNotesImage",  async function(req, res) {
  try {
    if (req.session.userId && req.query.course) {
      let user = await User.findOne({_id : req.session.userId});
      console.log(req.files);
      let noteImage = req.files.filepond;
      let extension = noteImage.name.split(".")[noteImage.name.split(".").length-1];
      let name = (new Date()).getTime().toString() + "." + extension;
      noteImage.mv(__dirname + "/public/notes/" + name, function(err) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        } else {
          createNote(user._id, "file", name, req.query.course);
          noteImage.name = name;
          res.send(name);
        }
      });
    } else {
      res.status(500).send(false);
    }
  } catch(e) {
    console.log(e);
    return res.status(500).send(e);
  }
})

app.post("/uploadStudentNote", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId && req.body.note && req.query.course) {
      let user = await User.findOne({_id : req.session.userId});
      let info = await createNote(user._id, "text", req.body.note, req.query.course);
      res.send(info);
    }
  } catch(e) {
    console.log(e);
    res.redirect(res.send[false, {}]);
  }
});

app.post("/createUserAssignment",urlencodedParser, async function(req,res) {
  try {
    if (req.session.userId && req.body.info && req.body.due && req.query.course && req.body.type) {
      if (req.body.customTopic == "true") {
        await Course.findOneAndUpdate({_id : req.query.course}, {$push: {topics: req.body.topic}});
      }
      let user = await User.findOne({_id : req.session.userId});
      let info = await createAssignment(user._id, req.body.type, req.body.info, req.body.notes || "", req.body.due, req.query.course, req.body.topic || "No Topic", false);
      res.send(info);
    }
  } catch(e) {
    console.log(e);
    res.redirect("/login");
  }
})

app.get("/monitorUsage", async function(req, res) {
  try {
    if (req.query.id && req.query.page) {
      let user = await User.findOne({_id : req.query.id});
      let date = (new Date()).local();
      let formatted = moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
      let data = {user: user.username, dateString: formatted, info: `exited page ${req.query.page}`};
      await logSchool(user.school, data);
    }
  } catch(e) {
    console.log(e);
    res.send(false);
  }
  res.send(true);
});

app.get("/removeAlert", async function(req, res) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      user.alerts.shift();
      await User.findOneAndUpdate({_id : req.session.userId}, {$set: {alerts: user.alerts}});
      res.send(true);
    } else {
      res.send(false);
    }
  } catch(e) {
    console.log(e);
    res.send(false);
  }
})
app.get("/updateStudentId", async function(req, res) {
  try {
    if (req.session.userId && req.query.id) {
      console.log(req.query.id);
      await User.findOneAndUpdate({_id : req.session.userId}, {$set: {studentID: req.query.id}});
      res.send(true);
    } else {
      res.send(false);
    }
  } catch(e) {
    res.send(false);
  }
});

app.get("/infoOnDay", async function(req, res) {
  try {
    if (req.session.userId && req.query.date) {
      let sendObject = {
        scheduleEvents: [],
        events: [],
      }
      let user = await User.findOne({_id : req.session.userId});
      let date = req.query.date.split("_");
      let currentDate = new Date(date[0], date[1], date[2]);
      let school = await School.findOne({_id : user.school}).populate("semesters");
      let currentSemesters = calculateSemesters(school.semesters, currentDate);
      let allowedUserCourses = await Course.find({$and: [{_id: user.courses}, {semester: currentSemesters}]}).populate("category").populate("teacher");
      let blockMap = blockNamesObject(school.blockNames, allowedUserCourses, user.blockNames, school.spareName);
      let eventsObject = await makeDayMap(school._id);
      let today = eventsObject[req.query.date];
      
      if (today) {
        for (var i = 0; i < today[3].length; i++) {
          if (today[3][i].displayedEvent) {
            sendObject.events.push({info: today[3][i].info, time: today[3][i].time});
          }
        }
        let currentSchedule = school.constantBlocks ? school.constantBlockSchedule.schedule[today[0][0]]["day" + (today[0][1]+1).toString()] : school.blockOrder[today[0][0]]["day" + (today[0][1]+1).toString()];  
        let colourMap = makeColorMap(school.blockNames);
        if (school.constantBlocks) {
          let times = school.constantBlockSchedule.blockSchedule;
          for (var i = 0; i < currentSchedule.length; i++) {
            let currentCourse = blockMap[currentSchedule[i][0]];
            if (currentCourse.isReal) {
              sendObject.scheduleEvents.push({colour: colourMap[currentCourse.block], time: times[i], mainInfo: currentCourse.course, secondaryInfo: currentCourse.teacher});
            }
          }
        } else {

        }
      } else {

      }     
      res.send(sendObject);
    } else {
      res.send({});
    }
  } catch(e) {
    console.log(e);
    res.send({});
  }
});
function averageColors( colorArray ){
  //get the red of RGB from a hex value
  function hexToR(h) {return parseInt((cutHex( h )).substring( 0, 2 ), 16 )}

  //get the green of RGB from a hex value
  function hexToG(h) {return parseInt((cutHex( h )).substring( 2, 4 ), 16 )}

  //get the blue of RGB from a hex value
  function hexToB(h) {return parseInt((cutHex( h )).substring( 4, 6 ), 16 )}

  //cut the hex into pieces
  function cutHex(h) {if(h.charAt(1) == "x"){return h.substring( 2, 8 );} else {return h.substring(1,7);}}
  var red = 0, green = 0, blue = 0;

  for ( var i = 0; i < colorArray.length; i++ ){
      red += hexToR( "" + colorArray[ i ] + "" )**2;
      green += hexToG( "" + colorArray[ i ] + "" )**2;
      blue += hexToB( "" + colorArray[ i ] + "" )**2;
  }

  //Average RGB
  red = Math.round(Math.sqrt(red/colorArray.length));
  green = Math.round(Math.sqrt(green/colorArray.length));
  blue = Math.round(Math.sqrt(blue/colorArray.length));
  return ( "rgb("+ red +","+ green +","+ blue +")" );
}



app.get("/", async function(req, res) {
  let currentDate = (new Date()).local();
  // let currentDate = new Date(2019, 0, 28, 10,14);
  let startDate = moment([2018, 8, 3]);
  let endDate = moment([2019, 5, 30]);
  let yearLength = endDate.diff(startDate, "days");
  res.cookie("path", "/");
  if (req.session.userId) {
    try {
      
      let user = await User.findOne({_id : req.session.userId});

      let school = await School.findOne({_id : user.school}).populate("semesters");

      let currentSemesters = calculateSemesters(school.semesters, currentDate);

      let allowedUserCourses = await Course.find({$and: [{_id: user.courses}, {semester: currentSemesters}]}).populate("category").populate("teacher");

      let blockMap = blockNamesObject(school.blockNames, allowedUserCourses, user.blockNames, school.spareName);

      let recentAssignments = {

      }

      for (var i = 0; i < allowedUserCourses.length; i++) {
        let recent = await Assignments.find({forCourse : allowedUserCourses[i]._id});
        recentAssignments[allowedUserCourses[i]._id] = {course: blockMap[allowedUserCourses[i].block].course, assignments: []};
        recent.sort(function(a,b) {
          return a.date.getTime() < b.date.getTime();
        });
        if (recent.length >= 2) {
          recentAssignments[allowedUserCourses[i]._id].assignments = recent.slice(0, 2);
        } else {
          for (var j = 0; j < recent.length; j++) {
            recentAssignments[allowedUserCourses[i]._id].assignments.push(recent[j]);
          }
        }
      }
      let eventsObject = await makeDayMap(school._id);


      let readSchedule = (makeReadableSchedule(true, school.constantBlockSchedule, blockMap, school.spareName));

      let colorMap = makeColorMap(school.blockNames);

      for (var key in user.scheduleColours) {
        let isOk  = /^#[0-9A-F]{6}$/i.test(`#${user.scheduleColours[key]}`);
        if (user.scheduleColours[key] && isOk) {
          colorMap[key] = "#" + user.scheduleColours[key];
        }
      }

      let monthLengths = [];

      let monthNames = [];

      let currentMonthDate = startDate.clone();

      let initialOffset = moment([startDate.year(), startDate.month()]).weekday();
      
      for (var i = 0; i < endDate.diff(startDate, "months")+1; i++) {
        monthLengths.push(daysInMonth(currentMonthDate.month()+1, currentMonthDate.year()));
        monthNames.push(currentMonthDate.format("MMMM YYYY"));
        currentMonthDate.add(1, "months");
      }

      let today = eventsObject[`${currentDate.getFullYear()}_${currentDate.getMonth()}_${currentDate.getDate()}`];
      
      let soonEvents = [];
      
      let alert = user.alerts[0] || false;
      if (alert) {
        user.alerts.shift();
        await User.findOneAndUpdate({_id : req.session.userId}, {$set: {alerts: user.alerts}});
      }
      
      let currentClass = ["Current", new EmptyCourse("Nothing!", "A")];

      let foundCurrent = false;

      let nextClass = ["Next", new EmptyCourse("Nothing!", "A")];

      let foundNext = false;

      let beforeActivities = user.beforeActivities || {day1: [], day2: [], day3: [], day4: [], day5: []};
      beforeActivities = beforeActivities["day" + currentDate.getDay()] || [];
      let lunchActivities = user.lunchActivities || {day1: [], day2: [], day3: [], day4: [], day5: []};
      lunchActivities = lunchActivities["day" + currentDate.getDay()] || [];
      let afterActivities = user.AfterActivities || {day1: [], day2: [], day3: [], day4: [], day5: []};
      afterActivities = afterActivities["day" + currentDate.getDay()] || [];
      
      
      if (today) {
        let todayEvents = today[3];
        let tommorowEvents = eventsObject[`${currentDate.getFullYear()}_${currentDate.getMonth()}_${currentDate.getDate()+1}`] ? eventsObject[`${currentDate.getFullYear()}_${currentDate.getMonth()}_${currentDate.getDate()+1}`][3]: [];
        soonEvents = todayEvents.concat(tommorowEvents);
        let currentSchedule = school.constantBlocks ? school.constantBlockSchedule.schedule[today[0][0]]["day" + (today[0][1]+1).toString()] : school.blockOrder[today[0][0]]["day" + (today[0][1]+1).toString()];

        let dayBlockList = [];

        if (currentDate.getDay() != 0 && currentDate.getDay() != 6) {
          if (school.constantBlocks) {

            let times = school.constantBlockSchedule.blockSchedule;
            for (var i = 0; i < currentSchedule.length; i++) {
              if (!foundNext && times[i][0]*60 + times[i][1] > currentDate.getHours()*60 + currentDate.getMinutes()) {
                nextClass = [timeToString(times[i]), blockMap[currentSchedule[i][0]]];
                foundNext = true;
                if (i > 0) {
                  foundCurrent = true;
                  currentClass =[timeToString(times[i-1]), blockMap[currentSchedule[i-1][0]]];
                } else {
                  foundCurrent = true;
                  currentClass = ["Current", new EmptyCourse("Nothing!", "A")];
                }
              }
              if (i == currentSchedule.length-1 && !foundCurrent && (times[i][2]*60 + times[i][3] > currentDate.getHours()*60 + currentDate.getMinutes())) {
                currentClass =[timeToString(times[i]), blockMap[currentSchedule[i][0]]];
              }
              dayBlockList.push([timeToString(times[i]), blockMap[currentSchedule[i][0]]]);
            }
            if (currentSchedule.length == 0) {

              dayBlockList = [["", new EmptyCourse(school.spareNames, "A")]]; 
            }
          }
        } else {
          let empty = new EmptyCourse("No Courses!", "A");
          dayBlockList = [["", empty]];
        }
        //typeof alert: ['<href>(optional)', text]
        res.render("redesign/index", {afterActivities: afterActivities, lunchActivities: lunchActivities, beforeActivities: beforeActivities, user: user, averageColours: averageColors, school: school, recentAssignments: recentAssignments, currentDate: currentDate, alert: alert, userId: user._id, colorMap: colorMap, readSchedule: readSchedule, moment: moment, favicon: school.favicon, today: today, currentBlock: currentClass, nextBlock: nextClass, soonEvents: soonEvents, offset: initialOffset, titles: school.dayTitles, startDate: [startDate.year(), startDate.month(), 1], monthLengths: monthLengths, monthNames: monthNames,eventMap: eventsObject, courses: dayBlockList, categories: iconMap});
      } else {
        let empty = new EmptyCourse("No Courses!", "A");
        dayBlockList = [["", empty]];
        res.render("redesign/index", {afterActivities: afterActivities, lunchActivities: lunchActivities, beforeActivities: beforeActivities, user: user, averageColours: averageColors, school: school, recentAssignments: recentAssignments, currentDate: currentDate, alert: alert, userId: user._id, colorMap: colorMap, readSchedule: readSchedule, moment: moment, favicon: school.favicon, today: [[0,0], false, false, [], []], currentBlock: ["Current", new EmptyCourse("Nothing!", "A")], nextBlock: ["Next", new EmptyCourse("Nothing!", "A")], soonEvents: soonEvents, offset: initialOffset, titles: school.dayTitles, startDate: [startDate.year(), startDate.month(), 1], monthLengths: monthLengths, monthNames: monthNames,eventMap: eventsObject, courses: dayBlockList, categories: iconMap});
      }
    } catch(e) {
      console.log(e);
      res.redirect("/login");
    }
  } else if (req.session.teacherId) {
    let teacher = await TeacherUser.findOne({_id : req.session.teacherId});
    if (teacher && teacher.teacherAccount) {
      res.redirect("/teacher/" + teacher.teacherAccount._id);
    } else {
      res.redirect("/home");
    }
  } else {
    res.redirect("/home");
  }
});

app.get("/account", async function(req, res) {
  if (req.session.userId) {
    let user = await User.findOne({_id : req.session.userId});
    if (user != null) {
      res.render("redesign/account", {user: user, icons: iconMap});
    } 
  } else {
    res.redirect("/home");
  }
});

app.get("/before-school", async function(req, res) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      if (user != null && user.school != null) {
        res.render("redesign/beforeSchool", {activities: JSON.parse(JSON.stringify(user.beforeActivities || {day1: [], day2: [], day3: [], day4: [], day5: []}))});
      } 
    } else {
      res.redirect("/home");
    }
  } catch(e) {
    res.redirect("/home");
  }
});
app.post("/before-school", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      if (user != null && user.school != null) {
        if (req.body.day != null && req.body.activity != null) {
          user.beforeActivities = user.beforeActivities || {day1: [], day2: [], day3: [], day4: [], day5: []};
          let newActivities = user.beforeActivities || {day1: [], day2: [], day3: [], day4: [], day5: []};
          newActivities[req.body.day].push(req.body.activity);
          await User.findOneAndUpdate({_id : user._id}, {$set: {beforeActivities: newActivities}});
          res.send([true, {day: req.body.day, activity: req.body.activity}]);
        } else if (req.body.removed && req.body.day) {
          let newActivities = user.beforeActivities || {day1: [], day2: [], day3: [], day4: [], day5: []};
          let found = false;
          for (var i = 0; i < user.beforeActivities[req.body.day].length; i++) {
            if (user.beforeActivities[req.body.day][i] == req.body.removed && !found) {
              found = true;
              newActivities[req.body.day].splice(i, 1);
              res.send([true, {day: req.body.day, removed: req.body.activity}]);
            }
          }
          if (!found) {
            res.send([true, {day: req.body.day, removed: ""}]);
          }
          await User.findOneAndUpdate({_id : user._id}, {$set: {beforeActivities: newActivities}});
        }
      } 
    } else {
      res.send([false, {}]);
    }
  } catch(e) {
    console.log(e);
    res.send([false, {}]);
  }
});
app.get("/lunch-time", async function(req, res) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      if (user != null && user.school != null) {
        res.render("redesign/lunchTime", {activities: JSON.parse(JSON.stringify(user.lunchActivities || {day1: [], day2: [], day3: [], day4: [], day5: []}))});
      } 
    } else {
      res.redirect("/home");
    }
  } catch(e) {
    res.redirect("/home");
  }
});
app.post("/lunch-time", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      if (user != null && user.school != null) {
        if (req.body.day != null && req.body.activity != null) {
          user.lunchActivities = user.lunchActivities || {day1: [], day2: [], day3: [], day4: [], day5: []};
          let newActivities = user.lunchActivities || {day1: [], day2: [], day3: [], day4: [], day5: []};
          newActivities[req.body.day].push(req.body.activity);
          await User.findOneAndUpdate({_id : user._id}, {$set: {lunchActivities: newActivities}});
          res.send([true, {day: req.body.day, activity: req.body.activity}]);
        } else if (req.body.removed && req.body.day) {
          let newActivities = user.lunchActivities || {day1: [], day2: [], day3: [], day4: [], day5: []};
          let found = false;
          for (var i = 0; i < user.lunchActivities[req.body.day].length; i++) {
            if (user.lunchActivities[req.body.day][i] == req.body.removed && !found) {
              found = true;
              newActivities[req.body.day].splice(i, 1);
              res.send([true, {day: req.body.day, removed: req.body.activity}]);
            }
          }
          if (!found) {
            res.send([true, {day: req.body.day, removed: ""}]);
          }
          await User.findOneAndUpdate({_id : user._id}, {$set: {lunchActivities: newActivities}});
        }
      } 
    } else {
      res.send([false, {}]);
    }
  } catch(e) {
    console.log(e);
    res.send([false, {}]);
  }
});
app.get("/after-school", async function(req, res) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      if (user != null && user.school != null) {
        res.render("redesign/afterSchool", {activities: JSON.parse(JSON.stringify(user.AfterActivities || {day1: [], day2: [], day3: [], day4: [], day5: []}))});
      } 
    } else {
      res.redirect("/home");
    }
  } catch(e) {
    res.redirect("/home");
  }
});
app.post("/after-school", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      if (user != null && user.school != null) {
        if (req.body.day != null && req.body.activity != null) {
          user.AfterActivities = user.AfterActivities || {day1: [], day2: [], day3: [], day4: [], day5: []};
          let newActivities = user.AfterActivities || {day1: [], day2: [], day3: [], day4: [], day5: []};
          newActivities[req.body.day].push(req.body.activity);
          await User.findOneAndUpdate({_id : user._id}, {$set: {AfterActivities: newActivities}});
          res.send([true, {day: req.body.day, activity: req.body.activity}]);
        } else if (req.body.removed && req.body.day) {
          let newActivities = user.AfterActivities || {day1: [], day2: [], day3: [], day4: [], day5: []};
          let found = false;
          for (var i = 0; i < user.AfterActivities[req.body.day].length; i++) {
            if (user.AfterActivities[req.body.day][i] == req.body.removed && !found) {
              found = true;
              newActivities[req.body.day].splice(i, 1);
              res.send([true, {day: req.body.day, removed: req.body.activity}]);
            }
          }
          if (!found) {
            res.send([true, {day: req.body.day, removed: ""}]);
          }
          await User.findOneAndUpdate({_id : user._id}, {$set: {AfterActivities: newActivities}});
        }
      } 
    } else {
      res.send([false, {}]);
    }
  } catch(e) {
    console.log(e);
    res.send([false, {}]);
  }
});
app.get("/block-names", async function(req, res) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      if (user != null && user.school != null) {
        let currentDate = (new Date()).local();
        let school = await School.findOne({_id : user.school}).populate("semesters");
        let changingColours = [];
        for (var i = 0; i < school.blockNames.length; i++) {
          if (school.blockNames[i][1] == "changing") {
            changingColours.push(school.blockNames[i]);
          }
        }
        let currentSemesters = calculateSemesters(school.semesters, currentDate);
        let allowedUserCourses = await Course.find({$and: [{_id: user.courses}, {semester: currentSemesters}]}).populate("category").populate("teacher");
        let blockMap = blockNamesObject(changingColours, allowedUserCourses, user.blockNames, school.spareName);
        res.render("redesign/blockNames", {blockMap: blockMap, school: school, user: user, icons: iconMap});
      } 
    } else {
      res.redirect("/home");
    }
  } catch(e) {
    res.redirect("/home");
  }
});
app.post("/block-names", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      if (user != null && user.school != null) {
        for (var key in req.body) {
          if (req.body[key]) {
            user.blockNames[key] = req.body[key];
          }
        }
        await User.findOneAndUpdate({_id : user._id}, {$set: {blockNames: user.blockNames}});
        res.redirect("/account");
      } 
    } else {
      res.redirect("/home");
    }
  } catch(e) {
    res.redirect("/home");
  }
});
app.get("/block-titles", async function(req, res) {
  if (req.session.userId) {
    let user = await User.findOne({_id : req.session.userId});
    if (user != null) {
      res.render("redesign/blockTitles", {user: user, icons: iconMap});
    } 
  } else {
    res.redirect("/login");
  }
});
app.get("/block-colours", async function(req, res) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      if (user != null && user.school != null) {
        let currentDate = (new Date()).local();
        let school = await School.findOne({_id : user.school}).populate("semesters");
        let changingColours = [];
        for (var i = 0; i < school.blockNames.length; i++) {
          if (school.blockNames[i][1] == "changing") {
            changingColours.push(school.blockNames[i]);
          }
        }
        let colourMap = makeColorMap(changingColours);
        for (var key in user.scheduleColours) {
          colourMap[key] = user.scheduleColours[key];
        }
        let currentSemesters = calculateSemesters(school.semesters, currentDate);
        let allowedUserCourses = await Course.find({$and: [{_id: user.courses}, {semester: currentSemesters}]}).populate("category").populate("teacher");
        let blockMap = blockNamesObject(changingColours, allowedUserCourses, user.blockNames, school.spareName);
        res.render("redesign/blockColours", {colourMap: colourMap, blockMap: blockMap, user: user, icons: iconMap});
      } 
    } else {
      res.redirect("/home");
    }
  } catch(e) {
    res.redirect("/home");
  }
});
app.post("/block-colours", urlencodedParser, async function(req, res) {
  try {
    if (req.session.userId) {
      let user = await User.findOne({_id : req.session.userId});
      if (user != null && user.school != null) {
        for (var key in req.body) {
          user.scheduleColours[key] = req.body[key];
        }
        await User.findOneAndUpdate({_id : user._id}, {$set: {scheduleColours: user.scheduleColours}});
        res.redirect("/account");
      } 
    } else {
      res.redirect("/home");
    }
  } catch(e) {
    res.redirect("/home");
  }
});

app.get("/notes", async function(req, res) {
  if (req.session.userId) {
    let user = await User.findOne({_id : req.session.userId});
    if (user != null) {
      let courses = await Course.find({_id : user.courses}).populate("teacher").populate("semester").populate("category");
      res.render("redesign/notes", {categories: iconMap, courses: courses});
    } 
  } else {
    res.redirect("/");
  }
});

app.get("/assignments", async function(req, res) {
  if (req.session.userId) {
    let user = await User.findOne({_id : req.session.userId});
    if (user != null) {
      let courses = await Course.find({_id : user.courses}).populate("teacher").populate("semester").populate("category");
      res.render("redesign/assignments", {categories: iconMap, courses: courses});
    } 
  } else {
    res.redirect("/");
  }
});

app.get("/events", async function(req,res) {
  if (req.session.userId) {
    let user = await User.findOne({_id : req.session.userId});
    if (user != null) {
      let events = await Events.find({school: user.school}).sort({"date": "ascending"});
      res.render("redesign/events", {moment: moment, icons: iconMap, events: events});
    } 
  } else {
    res.redirect("/");
  }
});


app.get("/newIndex", async (req, res, next) => {


  let currentDate = (new Date()).local();
  

  // let currentDate = new Date(2018, 9, 12, 0, 0, 0, 0);


  // console.log(currentDate.getHours());


  res.cookie("path", "/");
  //makes sure the user has a session
  if (req.session.userId) {

    let user = await User.findOne({_id : req.session.userId});
    if (!user || user == null) {
      res.redirect("/login");
    } else {
      try {


        let courses = await Course.find({_id : user.courses});
        let school = await School.findOne({_id : user.school});
        let weekOffset = Math.floor((currentDate.getTime() - (new Date(2018, 8, 2)).getTime())/1000/60/60/24/7)%school.blockOrder.length;
        //gathers the events from the past month for the calendar
        let monthEvent = await Events.find({$and: [{displayedEvent : true}, {school : user.school}, {month: (currentDate).getMonth()}, {year : (currentDate).getFullYear()}]});
        let soonEvents = await Events.find({$and: [{displayedEvent : true}, {school : user.school}, {date: {$gt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()-1, 0, 0, 0, 0)}}, {date: {$lte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 0, 0, 0, 0)}}]});
        let offSetEvents = await Events.find({$and: [{school : user.school}, {dayRolled: true}]});
        let skippedDays = await Events.find({$and: [{school : user.school}, {schoolSkipped : true}]});
        let schoolSkippedToday = false;
        if (skippedDays.map(x => x.date.getTime()).indexOf((new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())).getTime()) !== -1) {
          schoolSkippedToday = true;
        }
        let courseIds = [];
        for (var i = 0; i < courses.length; i++) {
          courseIds.push(courses[i]._id);
        }
        let userNotes = await Notes.find({$and: [{writtenBy: user._id}, {date: {$gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0)}}, {forCourse: user.courses}]});
        let allNotes = await Notes.find({forCourse: courseIds});
        // let assignments = await Assignments.find({forCourse: user.courses});
        let viewNotesDisplay = [1, "nothing"];
        if (courses.length) {
          viewNotesDisplay = [courses[0]._id || 1, courses[0].course];
        }
        let notesObject = {

        }
        let allNotesObject = {

        }
        for (var i = 0; i < courses.length; i++) {
          notesObject[courses[i]._id] = [];
          allNotesObject[courses[i]._id] = {
            course: courses[i].course,
            notes: []
          };
        }

        for (var i = 0; i < userNotes.length; i++) {
          notesObject[userNotes[i].forCourse].push(userNotes[i]);
        }
        for (var i = 0; i < allNotes.length; i++) {
          allNotesObject[allNotes[i].forCourse].notes.push(allNotes[i]);
        }

        for (var key in allNotesObject) {
          allNotesObject[key].notes.sort((a,b) => a.date.getTime() > b.date.getTime() ? -1 : 1);
          let setterDate = allNotesObject[key].notes[0] ? allNotesObject[key].notes[0].date : false;
          if (setterDate) {
            setterDate = new Date(setterDate.getFullYear(), setterDate.getMonth(), setterDate.getDate());
            let newFormat = [];
            let currentPart = [moment(setterDate).format("dddd, MMMM Do YYYY"), allNotesObject[key].notes[0]];
            for (var i = 1; i < allNotesObject[key].notes.length; i++) {
              let currentDate = allNotesObject[key].notes[i].date;
              currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
              if (currentDate.getTime() < setterDate.getTime()) {
                setterDate = currentDate;
                newFormat.push(currentPart);
                currentPart = [moment(setterDate).format("dddd, MMMM Do YYYY")];
              }
              currentPart.push(allNotesObject[key].notes[i]);
            }
            newFormat.push(currentPart);
            allNotesObject[key].notes = newFormat;
          } else {

          }
        }
        
        
        soonEvents = soonEvents.reverse();

        let dayOffSetToday = dayOffset(offSetEvents, new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
        let currentDay;
        let offLine = false;
        if (req.query.day) {
          currentDay = parseInt(req.query.day);
        }  else {
          currentDay = (((currentDate.getDay()-1)-dayOffSetToday%5+5)%5+1);
        }
        if (req.query.offline) {
          offLine = true;
        }
        let endDate = moment(currentDate);
        let startDate = moment([2018,8,1]);
        let daysFromStart = (endDate.diff(startDate, "days"))+1;
        let userPlans = [];
        for (var i = 0; i < user.planner.length; i++) {
          if (user.planner[i][0] == daysFromStart.toString()) {
            userPlans.push(user.planner[i][1]);
          }
        }
        let weeklySchedule = user.weeklySchedule["day" + currentDate.getDay()];
        
        //declares the top level variables that will be used

        let courseBlocks = {

        }
        for (var i = 0; i < courses.length; i++) {
          courseBlocks[courses[i].block] = courses[i].course;
          courseBlocks[courses[i].block + "_id"] = courses[i]._id;
        }
        let homeworkList = [];
        let todaysOrderedClasses = [];
        let courseCodes = [];
        let daysArray = [];
        //pushes all the course codes onto an array for use in resources, and pushes all the course's homework onto an array to pass to the index.ejs file
        for (var i = 0; i < courses.length; i++) {
          courseCodes.push(courses[i].code);
          let currentAssignments = await Assignments.find({forCourse: courses[i]._id});
          let currentHomework = [courses[i].course, currentAssignments, courses[i].block, courses[i].teacher, courses[i]._id];
          homeworkList.push(currentHomework);
        }
        

        //gets the order of todays blocks from a function
        //also accounts for time offsets due to pro-D days

        let todaysBlocks;
        let blockOrderLetters;
        if (currentDate.getDay() == 0 || currentDate.getDay() == 6) {
          todaysBlocks = false;
          todaysOrderedClasses = false;
          blockOrderLetters = false;
        } else {
          if (school.constantBlocks) {
            if (school.name === "PVSS") {
              todaysBlocks = school.constantBlockSchedule.schedule[weekOffset]["day" + currentDay.toString()];
            } else {
              todaysBlocks = school.constantBlockSchedule.schedule[weekOffset]["day" + currentDate.getDay()];
            }
            let constantSchedule = school.constantBlockSchedule.blockSchedule;
            for (var i = 0; i < todaysBlocks.length; i++) {
              todaysBlocks[i] = [todaysBlocks[i][0], constantSchedule[i][0], constantSchedule[i][1], constantSchedule[i][2], constantSchedule[i][3], todaysBlocks[i][1]];
            }
          } else {
            if (school.name === "PVSS") {
              todaysBlocks = (school.blockOrder[weekOffset]["day" + currentDay.toString()]);
            } else {
              todaysBlocks = (school.blockOrder[weekOffset]["day" + currentDate.getDay()]);
            }
          }
        }
        if (todaysBlocks) {
          blockOrderLetters = todaysBlocks.map(x => (x[5] === "changing" ? x[0][0] : "")).join("");
        }
        


        // console.log(todaysBlocks);
        //itterates through those blocks and find which course matches the block
        for (var i = 0; i < todaysBlocks.length; i++) {
          //finds matching courses using the array.find method and pushing the result to todaysOrderedClasses
          let todayClass = [todaysBlocks[i][1],todaysBlocks[i][2],todaysBlocks[i][3],todaysBlocks[i][4], todaysBlocks[i][5]]

          if (todaysBlocks[i][5] === "constant") {

            todayClass.push(todaysBlocks[i][0]);
          } else {
            if (user.blockNames) {
              todayClass.push((user.blockNames[todaysBlocks[i][0]] || courseBlocks[todaysBlocks[i][0]]) || (school.spareName || "Spare"));
              todayClass.push(courseBlocks[todaysBlocks[i][0] + "_id"] || "1");
            } else {
              todayClass.push((courseBlocks[todaysBlocks[i][0]]) || (school.spareName || "Spare"));
              todayClass.push(courseBlocks[todaysBlocks[i][0] + "_id"] || "1");
            }

          }
          todaysOrderedClasses.push(todayClass);
        }

        //gets what the title for the app should be given what the admins have assigned it


        let titleDisplay = school.titleDisplay ? school.titleDisplay : 0;

        if (titleDisplay === 0) {
          titleDisplay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][currentDate.getDay()];
        } else if (titleDisplay === 1) {
          titleDisplay = blockOrderLetters || "___";
        } else if (titleDisplay === 2) {
          if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
            titleDisplay = "Day _";
          } else {
            titleDisplay = "day " + currentDay.toString();
          }

        } else {
          titleDisplay = "___";
        }


        //makes a for loop that itterates as many times as their are days in the current month
        for (var i = 0; i < getDays(currentDate.getMonth()); i++) {
          let todayArray = [];
          let dayEvents = [];
          for (var j = 0; j < monthEvent.length; j++) {
            if (monthEvent[j].day === i+1) {
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

          let blockForTime;
          let currentLCOpen = ["Nothing!"];
          if (currentDate.getDay() == 0 || currentDate.getDay() == 6 || timeInMinutes > todaysBlocks[todaysBlocks.length-1][3]*60 + todaysBlocks[todaysBlocks.length-1][4]) {
            blockForTime = [["", "Nothing!"], ["", "Nothing!"]];
          } else {
            blockForTime = [["", "Nothing!"], [`${todaysOrderedClasses[0][0]}:${todaysOrderedClasses[0][1].toString().length === 1 ? "0" + todaysOrderedClasses[0][1].toString() : todaysOrderedClasses[0][1]}-${todaysOrderedClasses[0][2]}:${todaysOrderedClasses[0][3].toString().length === 1 ? "0" + todaysOrderedClasses[0][3].toString() : todaysOrderedClasses[0][3]} `, todaysOrderedClasses[0][5]]];
            for (var i = 0; i < todaysBlocks.length; i++) {
              if (timeInMinutes > todaysBlocks[i][1]*60+todaysBlocks[i][2]) {
                let secondArray;
                if (i+1 >= todaysBlocks.length) {
                  secondArray = ["", "Nothing!"];
                } else {
                  secondArray = [`${(todaysOrderedClasses[i+1][0]-1)%12+1}:${todaysOrderedClasses[i+1][1].toString().length == 1 ? "0" + todaysOrderedClasses[i+1][1].toString() : todaysOrderedClasses[i+1][1]}-${(todaysOrderedClasses[i+1][2]-1)%12+1}:${todaysOrderedClasses[i+1][3].toString().length == 1 ? "0" + todaysOrderedClasses[i+1][3] : todaysOrderedClasses[i+1][3]} : `,(todaysOrderedClasses[i+1][5])];
                }
                blockForTime = [[`${(todaysOrderedClasses[i][0]-1)%12+1}:${todaysOrderedClasses[i][1].toString().length == 1 ? "0" + todaysOrderedClasses[i][1] : todaysOrderedClasses[i][1]}-${(todaysOrderedClasses[i][2]-1)%12+1}:${todaysOrderedClasses[i][3].toString().length == 1 ? "0" + todaysOrderedClasses[i][3] : todaysOrderedClasses[i][3]} : `, (todaysOrderedClasses[i][5])], secondArray];
              }
            }
          }
          res.render("index", {schoolSkipped: schoolSkippedToday, viewNotesDisplay: viewNotesDisplay, allNotes: allNotesObject, notes: notesObject, offLine : offLine, titleDisplay : titleDisplay, schoolName : school.name, currentDate : currentDate, favicon : school.favicon || "favicon.ico", blockDay: ((currentDate.getDay() +4 - dayOffSetToday%5)%5)+1, currentBlock: blockForTime, font: holidayFont(user.font), order: user.order, colours: user.colors, username: user.username, courses: courses, homework: homeworkList, blockOrder: todaysOrderedClasses, calendar: daysArray, month: months[currentDate.getMonth()], lcSchedule: currentLCOpen, permissions: user.permissions, soonEvents: soonEvents});
        });
      } catch(e) {
        console.log(e);
        res.sendFile(__dirname + "/errors/serverError.html");
      }
    }
  } else {
    res.redirect("/login");
  }
});

app.post("/", urlencodedParser, function(req,res) {
  //makes sure the user has a session
  if (req.session.userId && req.body.removedHomework) {

    //finds the corrosponding user
    User.findOne({_id : req.session.userId}, function(err, user) {
      //redirects to login if there is a database error... will change this later.
      if (err) {
        res.redirect('/login');
      } else {


        let course = req.body.removedHomework.split("_")[0];
        let index = (req.body.removedHomework.split("_")[1]);

        //finds the corrosponding course
        if (user.permissions == "admin") {
          Assignments.findOneAndRemove({forCourse: course, _id : index}, function(err, removed) {
            res.redirect("/");
          })
        }
      }
    })
  } else {
    //if the user doesn't have a session, redirect to home.
    res.redirect("/");
  }
});

app.get("/postHomework", function(req, res) {
  if (req.session.userId && req.query.text && req.query.id) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err || user == null) {
        res.send("");
      } else {
        Course.findOne({_id : req.query.id}, function(err, course) {
          if (err || course == null) {
            res.send("");
          } else {
            let notesOjbect = {
              noteType: "text",
              text: req.query.text,
              writtenBy: user._id,
              forCourse: course._id,
              date: (new Date()).local(),
            }
            Notes.create(notesOjbect, function(err, note) {
              res.send(JSON.stringify(note));
            });
          }
        });
      }
    })
  } else if (req.session.userId && req.query.action == "removeNote" && req.query.id) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err || user == null) {
        res.send("");
      } else {
        Notes.findOneAndRemove({writtenBy : user._id, _id : req.query.id}).then(function(note) {
          res.send(JSON.stringify(note));
        });
      }
    })
  } else {
    res.send("");
  }
});

app.post("/postHomeworkImage", function(req, res) {
  // console.log(req)
  
  if (req.session.userId) {
    notesUpload.single("file")(req, res, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("1");
        User.findOne({_id : req.session.userId}, function(err, user) {
          if (err || user == null) {
            res.send("");
          } else {
            console.log("2");
            Course.findOne({_id : req.query.id}, function(err, course) {
              if (err || course == null) {
                res.send("");
              } else {
                console.log("3");
                let notesOjbect = {
                  noteType: "image",
                  text: req.file.filename,
                  writtenBy: user.username,
                  forCourse: course._id,
                  date: (new Date()).local()
                }
                Notes.create(notesOjbect, function(err, note) {
                  User.findOneAndUpdate({_id : user._id}, {$push: {notes: note._id}}).then(function() {
                    res.send(JSON.stringify(note));
                  });
                });
              }
            });
          }
        })
      }
    });
  } else if (req.session.userId && req.query.action == "removeNote" && req.query.id) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err || user == null) {
        res.send("");
      } else {
        Notes.findOneAndRemove({writtenBy : user.username, _id : req.query.id}).then(function(note) {
          res.send(JSON.stringify(note));
        });
      }
    })
  } else {
    res.send("");
  }
});

app.get("/login", async function(req, res) {
  try {
    let schools = await School.find({});
    schools.sort(function(a,b) {
      return (a.firstName > b.firstName ? -1 : 1);
    });
    res.render("redesign/login", {schools: schools, error: ""});
  } catch(e) {
    console.log(e);
    res.redirect("/signup");
  }
  // res.render("login", {error: ""});
})
app.get("/login-teacher", async function(req, res) {
  try {
    let schools = await School.find({});
    schools.sort(function(a,b) {
      return (a.firstName > b.firstName ? -1 : 1);
    });
    res.render("redesign/loginTeacher", {schools: schools, error: ""});
  } catch(e) {
    console.log(e);
    res.redirect("/home");
  }
});
app.post("/login-teacher", urlencodedParser, async function(req, res) {
  let schools = await School.find({});
  schools.sort(function(a,b) {
    return (a.firstName > b.firstName ? -1 : 1);
  });
  //the stringTest function is a function that confirms the string is only character a-z A-Z 0-9
  if (req.body.username && req.body.code && req.body.school && stringTest(req.body.school) && stringTest(req.body.username) && stringTest(req.body.password)) {
    
    //try to find the user in the database. if that doesn't work, tell them their information was incorrect.
    try {
      // asyncronous function. returns the user if the info was correct, throws an error if it wasn't.
      let response = await TeacherUser.authenticate(req.body.username, req.body.code, req.body.school);
      //sets the session and cookie to the current user ID
      req.session.teacherId = response._id;

      res.cookie("teacherID", response._id);
      //redirects to the cookie path, or to home if the user doesn't have path cookies
      res.redirect("/teacher/" + response.teacherAccount._id);
    } catch(e) {
      console.log(e);
      // tells the user their info was incorrect
      res.render("redesign/loginTeacher", {schools: schools, error: "username or code incorrect. Please try again."});
    }
  } else {
    //asks the user not to enter special characters.
    res.render("redesign/login", {schools: schools, error: "Please fill in all fields with alphanumeric characters"});
  }
});
app.post("/login", urlencodedParser, async (req, res, next) => {

  let schools = await School.find({});
  schools.sort(function(a,b) {
    return (a.firstName > b.firstName ? -1 : 1);
  });
  //the stringTest function is a function that confirms the string is only character a-z A-Z 0-9
  if (req.body.username && req.body.password && req.body.school && stringTest(req.body.school) && stringTest(req.body.username) && stringTest(req.body.password)) {
    
    //try to find the user in the database. if that doesn't work, tell them their information was incorrect.
    try {
      // asyncronous function. returns the user if the info was correct, throws an error if it wasn't.
      let response = await User.authenticate(req.body.username, req.body.password, req.body.school);
      //sets the session and cookie to the current user ID
      req.session.userId = response._id;

      res.cookie("sessionID", response._id);
      //redirects to the cookie path, or to home if the user doesn't have path cookies
      res.redirect("/");
    } catch(e) {
      console.log(e);
      // tells the user their info was incorrect
      res.render("redesign/login", {schools: schools, error: "username or password incorrect. Please try again."});
    }
  } else {
    //asks the user not to enter special characters.
    res.render("redesign/login", {schools: schools, error: "Please fill in all fields with alphanumeric characters"});
  }
});

app.get("/signup", function(req, res) {
  res.cookie("path", "/");
  School.find({}, function(err, schools) {
    schools.sort(function(a,b) {
      return (a.firstName > b.firstName ? -1 : 1);
    });
    res.render("redesign/signup", {schools: schools, error: ""});
  })
});

app.post("/signup", urlencodedParser, async function(req, res, next) {
  let schools = await School.find({});
  schools.sort(function(a,b) {
    return (a.firstName > b.firstName ? -1 : 1);
  });
  if (req.body.username && req.body.password && req.body.school) {
    let school = await School.findOne({_id : req.body.school}); 
    if (school) {
      let user = await User.findOne({$and: [{school: req.body.school}, {username: req.body.username}]});
      if (user == null) {
        if (school != null) {
          let coursesExists = false;

          let courses = [];
          if (req.body.studentID) {
            let studentCourses = await serverCourse.findOne({$and: [{school: school._id}, {studentId: req.body.studentID}]});
            if (studentCourses != null) {
              coursesExists = true;
              courses = studentCourses.courses;
            }
          }
          //TODO: function to autofill users courses when they sign up
          let userObject = {
            firstName: "_",
            lastName: "_",
            username: req.body.username,
            password: req.body.password,
            studentID: req.body.studentID || "",
            courses: courses,
            colors: {
              bgColor: "rgb(79, 49, 48)",
              textColor: "rgb(216, 215, 143)",
              infoColor: "rgb(117, 55, 66)",
              buttonColor: "rgb(170, 80, 66)",
              borderColor:"rgb(216, 189, 138)"
            },
            font: "/public/fonts/Evogria.otf",
            email: req.body.username,
            school: school._id
          }
          try {
            User.create(userObject,function(error, user) {
              if (error) {
                res.render("redesign/signup", {schools: schools, error: "An error occured. Please try again"});
              } else {
                req.session.userId = user._id;
                res.cookie("sessionID", req.session.userId);
                if (coursesExists) {
                  res.redirect("/");
                } else {
                  res.redirect("/courses");  
                }
              }
            });
          } catch(e) {
            res.render("redesign/signup", {schools: schools, error: "An error occured. Please try again"});
          }
        }
      } else {
        res.render("redesign/signup", {schools: schools,error: "User already exists. Please try again."});
      }
    } else {
      res.render("redesign/signup", {schools: schools, error: "School not found."});
    }
  } else {
    res.render("redesign/signup", {schools: schools, error: "Please complete all fields"});
  }
});

app.get("/courses", async function(req, res) {
    res.cookie("path", "/courses");
    try {
      if (req.session.userId) {
        let user = await User.findOne({_id : req.session.userId});
        let school = await School.findOne({_id : user.school}).populate("semesters");
        let selectedSemester = req.query.semester || school.semesters[0]._id;

        let allowedUserCourses = await Course.find({$and: [{_id: user.courses}, {semester: selectedSemester}]}).populate("category").populate("teacher");
        
        let courses = await Course.find({$and: [{semester: selectedSemester}, {school: user.school}]}).populate("teacher");

        let categories = await Categories.find({school: school._id});
        let userCourses = blockNamesObject([], allowedUserCourses, {}, "LC's");
        let disallowedBlocks = [];
        for (var key in userCourses) {
          disallowedBlocks.push(key);
        }
        courses.sort(function(a,b) {
          return (a.teacher > b.teacher ? 1 : -1);
        });
        res.render("redesign/courses", {disallowed: disallowedBlocks, selectedSemester: selectedSemester, userCourses: userCourses, categories: categories, courses: courses, school: school, icons: iconMap});
        // res.render("addCourses", {schoolName : school.name, categories: categories, colours: user.colors, font: holidayFont(user.font), courses : courses});

      } else {
        res.redirect("/login");
      }
    } catch(e) {
      console.log(e);
      res.redirect("/login");
    }
    // try {
    //   if (req.session.userId) {
    //     let user = await User.findOne({_id : req.session.userId});
    //     let courses = await Course.find({school: user.school}).populate("teacher");
    //     let school = await School.findOne({_id : user.school});
    //     let categories = await Categories.find({school: school._id});
    //     console.log(courses[0].category.toString() == categories[0]._id);
    //     console.log(categories[0]._id);
    //     courses.sort(function(a,b) {
    //       return (a.teacher > b.teacher ? 1 : -1);
    //     });
    //     res.render("addCourses", {schoolName : school.name, categories: categories, colours: user.colors, font: holidayFont(user.font), courses : courses});

    //   } else {
    //     res.redirect("/login");
    //   }
    // } catch(e) {
    //   res.redirect("/login");
    // }
});


app.get("/getUserCourses", async function(req, res) {
  if (req.query.user) {

  } else {

  }
});

app.post("/courses", urlencodedParser, async function(req, res) {

  try {
    if (req.session.userId && req.query.semester) {
      let user = await User.findOne({_id: req.session.userId}).populate({path: "courses", populate: {path: "semester"}});
      let school = await School.findOne({_id : user.school}).populate("semesters");
      

      if (user) {
        let userBlock = {

        }
        for (var i = 0; i < school.semesters.length; i++) {
          userBlock[school.semesters[i]._id.toString()] = {};
        }
        for (var i = 0; i < user.courses.length; i++) {
          userBlock[user.courses[i].semester._id.toString()][user.courses[i].block] = user.courses[i]._id;
        }
        for (var key in req.body) {
          if (req.body[key] == "") {
            delete userBlock[req.query.semester][key];
          } else {
            let currentCourse = await Course.findOne({_id : req.body[key]});
            if (currentCourse) {
              userBlock[currentCourse.semester.toString()][currentCourse.block] = currentCourse._id.toString();
            }
          }
        }
        let newCourseObject = []
        for (var key in userBlock) {
          for (var newKey in userBlock[key]) {
            newCourseObject.push(userBlock[key][newKey]);
          }
        }
        await User.findOneAndUpdate({_id :  req.session.userId}, {$set: {courses: newCourseObject, blockNames: {}}});
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/login");
    }
  } catch(e) {
    console.log(e);
    res.redirect("/login");
  }
  // if (req.session.userId && req.body.coursesID) {
  //   User.findOne({_id : req.session.userId}, function(err, user) {
  //     if (err || user == null) {
  //       console.log(err);
  //       res.redirect("/");
  //     } else {
  //       console.log(req.body.coursesID);
  //       Course.find({school : user.school, _id : req.body.coursesID}, function(err, courses) {
  //         console.log(courses);
  //         if (err || courses == null) {
  //           console.log(err);
  //           res.redirect("/");
  //         } else {
  //           User.findOneAndUpdate({_id : req.session.userId}, {courses : courses, blockNames : {A: "", B: "", C: "", D: "", E: ""}}).then(function() {
  //             res.redirect("/");
  //           });
  //         }
  //       });
  //     }
  //   })
  // } else {
  //   res.redirect("/");
  // }
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
      if (user != null && user.permissions === "admin") {
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
        } else if (req.body.createCode && user.username === "AidanEglin") {
          let code = Math.floor(Math.random() * 1000000) + 1000000;
          Code.create({code : code}, function(err, code) {
            console.log("created");
            if (err) {
              console.log(err);
              res.redirect("/login");
            } else {
              let mailOptions = {
                from: "pvsstudents@gmail.com",
                to: "aidaneglin@gmail.com",
                subject: "school code created",
                text: "the school code is : " + code.code.toString()
              }
              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error)

                } else {

                }
              });
              res.redirect("/add");
            }
          });
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

  if (req.session.userId) {
    let user = await User.findOne({_id : req.session.userId});
    if (!user || user == null) {

    } else {
      //declares a currentDate, monthArray, and monthName for later use
      let currentDate = (new Date()).local();
      let lowEnd;
      let highEnd;
      if (currentDate.getMonth() < 6) {
        lowEnd = new Date(currentDate.getFullYear()-1, 8);
        highEnd = new Date(currentDate.getFullYear(), 6);
      } else {
        lowEnd = new Date(currentDate.getFullYear(), 8);
        highEnd = new Date(currentDate.getFullYear()+1, 6);
      }
      let monthsArray = [];
      let monthsNames = ["September", "October", "November", "December", "January", "February", "March", "April", "May", "June"];
      let offSetEvents = await Events.find({$and: [{school : user.school}, {dayRolled: true}]});
      let skipEvents = await Events.find({$and: [{school : user.school}, {schoolSkipped: true}]});
      let offSetDays = offSetEvents.map(x => x.date);
      skipEvents = skipEvents.map(x => x.date);
      console.log(offSetDays);
      console.log(skipEvents);
      //finds ALL events. will fix later.
      //fix with something like: Events.find({$and: [{date: {$gt: september (currentYear)}}, {date: {$lt: june (nextYear)}}]}, function(err, yearEvent))
      let yearEvent = await Events.find({school : user.school, $and: [{date: {$gte: lowEnd}}, {date: {$lte: highEnd}}, {displayedEvent : true}]});
      let school = await School.findOne({_id : user.school});

      // starts the first day of the calendar on september first of that year
      let theDay = lowEnd.getDay();
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
            if (yearEvent[k].month === (i+8)%12 && yearEvent[k].day === j+1) {
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

      res.render("calendar", {skipEvents: skipEvents, school: school, offSetDays: offSetDays, calendar : monthsArray, months : monthsNames, colours: user.colors, font: holidayFont(user.font)});
    }
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
          submittedBy: req.session.userId,
          confirmed: false,
          assignment: profanityFilter(req.body.assignment),
          notes: profanityFilter(req.body.notes),
          due: profanityFilter(req.body.due),
          date: (new Date()).local(),
          forCourse: mongoose.Types.ObjectId(req.body.courseID),
        }

        Assignments.create({submittedBy: req.session.userId, assignment: profanityFilter(req.body.assignment), confirmed: false, notes: profanityFilter(req.body.notes), due: req.body.due, forCourse: req.body.courseID, date: (new Date()).local()}, function(err, assignment) {
          res.redirect("/");
        });
        //if the user is a teacher or an admin, let them submit it as confirmed.
        if (err || !user) {

        } else if (user.permissions == "teacher" || user.permissions == "admin") {
          homeworkObject.confirmed = "T";
        }
        //adds the homework to the course
        
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

      if (err || !user || user == null) {
        res.render("tutorial", {font: "/public/fonts/LANENAR_.ttf"});
      } else {
        Course.find({school : user.school}, function(err, courses) {
          if (err || courses === null) {
            res.redirect("/");
          } else {
            res.render("tutorial", {username : user.username, hasCourses : (courses.length > 0), font: holidayFont(user.font)});
          }
        })
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
        School.findOne({_id : user.school}, function(err, school) {
          if (err) {
            res.redirect("/");
          } else {
            if (school.constantBlocks) {
              let blockObject = [];
              let constantBlockSchedule = school.constantBlockSchedule.schedule;
              let constantBlockOrder = school.constantBlockSchedule.blockSchedule;
              Course.find({_id : user.courses}, function(err, courses) {
                for (var i = 0; i < constantBlockSchedule.length; i++) {
                  let currentWeek = {
                    day1: [],
                    day2: [],
                    day3: [],
                    day4: [],
                    day5: []
                  }
                  for (var day in constantBlockSchedule[i]) {
                    let currentDay = [];
                    for (var j = 0; j < constantBlockSchedule[i][day].length; j++) {
                      if (constantBlockSchedule[i][day][j][1] === "changing") {
                        let found = false;
                        for (var k = 0; k  < courses.length; k++) {
                          if (constantBlockSchedule[i][day][j][0] === courses[k].block) {
                            found = true;
                            currentDay.push([courses[k].block, courses[k].course, courses[k].teacher, constantBlockOrder[j][0], constantBlockOrder[j][1], constantBlockOrder[j][2], constantBlockOrder[j][3], user.scheduleColours ? user.scheduleColours[courses[k].block] || "#FFFFFF" : "#FFFFF"])
                            break;
                          }
                        }
                        if (!found) {
                          currentDay.push([constantBlockSchedule[i][day][j][0], (school.spareName || "Spare"), "", constantBlockOrder[j][0], constantBlockOrder[j][1], constantBlockOrder[j][2], constantBlockOrder[j][3], user.scheduleColours ? user.scheduleColours[constantBlockSchedule[i][day][j][0]] || "#FFFFFF" : "#FFFFFF"])
                        }
                      } else {
                        currentDay.push([constantBlockSchedule[i][day][j][0], constantBlockSchedule[i][day][j][0], "", constantBlockOrder[j][0], constantBlockOrder[j][1], constantBlockOrder[j][2], constantBlockOrder[j][3], user.scheduleColours ? user.scheduleColours[constantBlockSchedule[i][day][j][0]] || "#FFFFFF" : "#FFFFFF"])
                      }
                    }
                    currentWeek[day] = currentDay;
                  }
                  blockObject.push(currentWeek);
                }
                res.render("schedule", {courses : blockObject, colours: user.colors, font: holidayFont(user.font)});
              });
            } else {
              let blockObject = school.blockOrder;
              Course.find({_id : user.courses}, function(err, courses) {
                for (var l = 0; l < blockObject.length; l++) {
                  for (var k = 1; k < 6; k++) {
                    let key = "day" + k.toString();
                    for (var i = 0; i < blockObject[l][key].length; i++) {
                      let found = false;
                      for (var j = 0; j < courses.length; j++) {
                        if (courses[j].block == blockObject[l][key][i][0]) {
                          if (user.blockNames) {
                            found = true;
                            blockObject[l][key][i] = [courses[j].block, (user.blockNames[courses[j].block] || courses[j].course) , courses[j].teacher, blockObject[l][key][i][1], blockObject[l][key][i][2], blockObject[l][key][i][3], blockObject[l][key][i][4], user.scheduleColours ? user.scheduleColours[courses[j].block] || "#FFFFFF" : "#FFFFFF"];
                          } else {
                            found = true;
                            blockObject[l][key][i] = [courses[j].block, courses[j].course, courses[j].teacher, blockObject[l][key][i][1], blockObject[l][key][i][2], blockObject[l][key][i][3], blockObject[l][key][i][4], user.scheduleColours ? user.scheduleColours[courses[j].block] || "#FFFFFF" : "#FFFFFF"];
                          }
                        }
                      }
                      if (!found) {
                        if (user.blockNames) {
                          blockObject[l][key][i] = [blockObject[l][key][i][0], user.blockNames[blockObject[l][key][i][0]] || (blockObject[l][key][i][5] === "changing" ? (school.spareName || "Spare") : blockObject[l][key][i][0]), "\n", blockObject[l][key][i][1], blockObject[l][key][i][2], blockObject[l][key][i][3], blockObject[l][key][i][4], user.scheduleColours ? user.scheduleColours[blockObject[l][key][i][0]] || "#FFFFFF" : "#FFFFFF"];
                        } else {
                          blockObject[l][key][i] = [blockObject[l][key][i][0], (blockObject[l][key][i][5] === "changing" ? (school.spareName || "Spare") : blockObject[l][key][i][0]), "\n", blockObject[l][key][i][1], blockObject[l][key][i][2], blockObject[l][key][i][3], blockObject[l][key][i][4], user.scheduleColours ? user.scheduleColours[blockObject[l][key][i][0]] || "#FFFFFF" : "#FFFFFF"];
                        }
                      }
                    }
                  }
                }
                res.render("schedule", {courses : blockObject, colours: user.colors, font: holidayFont(user.font)});
              });
            }
          }
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

app.get("/users/:user/block-names", function(req,res) {
  res.cookie("path", "/users/" + req.params.user + "/block-names");
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (user.username != req.params.user) {
        res.redirect("/users/" + user.username + "/block-names");
      } else {
        School.findOne({_id : user.school}, function(err, school) {
          if (err || school == null) {
            res.redirect("/");
          } else {
            let namesSent = {

            }

            for (var i = 0; i < school.blockNames.length; i++) {
              if (school.blockNames[i][1] === "changing") {
                namesSent[school.blockNames[i][0]] = (school.spareName || "Spare");
              } else {

              }
            }
            console.log(user.blockNames);
            let nameBlocks = {};
            if (user.blockNames) {
              nameBlocks = JSON.parse(JSON.stringify(user.blockNames));
            }

            Course.find({_id : user.courses}, function(err, courses) {
              if (err) {
                res.redirect("/");
              } else {
                for (var i = 0; i < courses.length; i++) {
                  namesSent[courses[i].block] = courses[i].course;
                }
                if (nameBlocks) {
                  console.log(nameBlocks);
                  for (var key in nameBlocks) {
                    if (nameBlocks[key]) {
                      namesSent[key] = nameBlocks[key];
                    }
                  }
                }
                console.log(namesSent);


                res.render("blockNames", {namesSent : namesSent, user: user.username, colours: user.colors, font: (holidayFont(user.font))});
              }
            })
          }
        })
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/users/:user/block-names", urlencodedParser, function(req, res) {
  if (req.session.userId) {
    console.log(req.body);
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err) {
        res.redirect("/");
      } else {
        let blockObject = {

        }
        for (var key in req.body) {
          blockObject[key.split("blockName")[1]] = req.body[key];
        }
        User.findOneAndUpdate({_id : req.session.userId}, {$set : {blockNames : blockObject}}).then(function(object) {
          res.redirect("/users/" + req.params.user);
        });
      }
    })
  } else {
    res.redirect("/login");
  }
});

app.get("/users/:user/schedule-colours", function(req, res) {
  res.cookie("path", "/users/" + req.params.user + "/schedule-colours");
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err || user == null) {
        res.redirect("/");
      } else {
        if (user.username != req.params.user) {
          res.redirect("/users/" + user.username);
        } else {
          School.findOne({_id : user.school}, function(err, school) {
            if (err || school == null) {
              res.redirect("/users/" + user.username);
            } else {
              Course.find({school: user.school, _id : user.courses}, function(err, courses) {
                let classesForBlocks = blockNamesObject(school.blockNames, courses, user.blockNames, school.spareName);
                console.log(classesForBlocks);
                for  (var key in classesForBlocks) {
                  let color = "#FFFFFF";
                  if (user.scheduleColours) {
                    color = user.scheduleColours[key] || "#FFFFFF";
                  }
                  classesForBlocks[key] = [classesForBlocks[key], color];
                }
                res.render("scheduleColours", {blocks : classesForBlocks, user: req.params.user, colours: user.colors, font: holidayFont(user.font)});
              });
            }
          })
        }
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/users/:user/schedule-colours", urlencodedParser, function(req, res) {
  if (req.session.userId) {
    User.findOne({_id : req.session.userId}, function(err, user) {
      if (err) {
        res.redirect("/");
      } else {
        let colours = req.body;
        let userColours = user.scheduleColours || {};
        for (var key in colours) {
          userColours[key] = "#" + colours[key];
        }
        User.findOneAndUpdate({_id : req.session.userId}, {$set : {scheduleColours : userColours}}).then(function(object) {
          res.redirect("/users/" + req.params.user);
        });
      }
    })
  } else {
    res.redirect("/login");
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
            Events.find({$and: [{school: user.school}, {dayRolled: true}]}, function(err, events) {
              let timeOffSet = dayOffset(events, new Date(), true);
              School.findOne({_id : user.school}, function(err, school) {
                if (err) {
                  res.send("");
                } else {
                  let blockSchedule;
                  
                  if (school.constantBlocks) {
                    let constSchedule = school.constantBlockSchedule.blockSchedule;
                    let newSchedule = [];
                    for (var i = 0; i < school.constantBlockSchedule.schedule.length; i++) {
                      let currentWeek = school.constantBlockSchedule.schedule[i];
                      for (var key in currentWeek) {
                        currentWeek[key] = currentWeek[key].map((x, index) => [x[0], constSchedule[index][0], constSchedule[index][1], constSchedule[index][2], constSchedule[index][3], x[1]]);
                      }
                      newSchedule.push(currentWeek);
                    }
                    blockSchedule = newSchedule;
                  } else {
                    blockSchedule = school.blockOrder;
                  }
                  res.send([user, {timeOffset: timeOffSet}, {blockSchedule : blockSchedule}, {blockNames : blockNamesObject(school.blockNames, courses, user.blockNames || {}, school.spareName)}]);
                }
              })
            })
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
  socket.on("song", async function(data) {
    console.log(data.song.substring(0,2));
    let songObject = {
      date : (new Date()).local(),
      song : data.song,
      prepended: false
    }
    if (data.song.substring(0, 2) == "!!") {
      songObject.song = data.song.substring(2, data.song.length);
      songObject.date = new Date(2000, 1, 1);
      songObject.prepended = true;
    }
    let song = await Song.create(songObject);
    io.emit("song", song);
  });
  socket.on("removeSong", async function(data) {
    try {
      await Song.remove({_id : data.id});
      io.emit("removedSong", data);
    } catch(e) {
      io.emit("removedSong", data);
    }
  })


});

app.get("/down", function(req, res) {
  res.sendFile(__dirname + "/errors/serverError.html");
});

app.get("*", function(req, res) {
  res.status(404).sendFile(__dirname + "/errors/error404.html");
});
