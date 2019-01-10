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

let input = fs.readFileSync("/home/schoolFiles/master.csv");

mongoose.connect("mongodb://127.0.0.1:27017/users", {useNewUrlParser: true});

mongoose.connection.once("open", function() {
  console.log("connection has been made");
}).on("error", function(error) {
  console.log("connection error: " + error);
});

async function main() {

    let users = await User.find({username: "AidanEglin"});
    for (var i = 0; i < users.length; i++) {
        let currentCourses = await Course.find({_id : users[i].courses});
        let newCourses = [];
        for (var j = 0; j < currentCourses.length; j++) {
            console.log(currentCourses[j]);
            let currentTeacher = await Teachers.findOne({$and: [{school: "5ba9b63a6a4d061e77936950"}, {lastName: currentCourses[j].teacher.split(".")[1]}]});
            let currentCourse = await Course.findOne({$and: [{school: "5ba9b63a6a4d061e77936950"}, {teacher: currentTeacher._id}, {block: currentCourses[j].block}]});
            console.log(currentCourse);
            newCourses.push(currentCourse._id);
        }
        console.log(newCourses);
    }
}
main();