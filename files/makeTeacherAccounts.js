let parser = require("csv-parse");
let mongoose = require("mongoose");
let fs = require("fs");
let User = require("../models/userchar.js");
let Course = require("../models/coursechar.js");
let Song = require("../models/songchar.js");
let Events = require("../models/eventschar");
let Texts = require("../models/textchar.js");
let Resources = require("../models/resourcechar.js");
let Posts = require("../models/postchar.js");
let Push = require("../models/pushchar.js");
let School = require("../models/schoolchar.js");
let Code = require("../models/createcodeschar.js");
let Notes = require("../models/notechar.js");
let Assignments = require("../models/assignmentchar.js");
let Teachers = require("../models/teacherchar.js");
let Categories = require("../models/categorychar.js");
let Semesters = require("../models/semesterchar.js");
let TeacherUser = require("../models/teacherUserchar.js");


mongoose.connect("mongodb://127.0.0.1:27017/users", {useNewUrlParser: true});

mongoose.connection.once("open", function() {
  console.log("connection has been made");
}).on("error", function(error) {
  console.log("connection error: " + error);
});

async function main() {
    let teachers = await Teachers.find();
    for (var i = 0; i < teachers.length; i++) {
        let teacherAccount = await TeacherUser.findOne({teacherAccount : teachers[i]._id});
        if (teacherAccount) {

        } else {
            let randomID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
            await TeacherUser.create({school: teachers[i].school, teacherAccount: teachers[i]._id, code: randomID, teacherID: teachers[i].teacherCode});
        }
    }
}
main();