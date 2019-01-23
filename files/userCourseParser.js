let parser = require("csv-parse");
let fs = require("fs");

let mongoose = require("mongoose");
let Course = require("../models/coursechar.js");
let School = require("../models/schoolchar.js");
let serverCourse = require("../models/servercourseschar.js");
let Teachers = require("../models/teacherchar.js");
let Semesters = require("../models/semesterchar.js");

mongoose.connect("mongodb://127.0.0.1:27017/users", {useNewUrlParser: true});

mongoose.connection.once("open", function() {
  console.log("connection has been made");
}).on("error", function(error) {
  console.log("connection error: " + error);
});


let input = fs.readFileSync("/home/schoolFiles/studentcourses.csv");


parser(input, {comment: "#"}, async function(err, output) {
    try {
        let defaultBlocks = {
            "01": "A",
            "03": "B",
            "05": "C",
            "07": "D",
            "09": "E",
        };
        let schoolMap = {};
        let schoolList = [];
        for (var i = 1; i < output.length; i++) {
            if (schoolList.indexOf(output[i][12]) < 0) {
            schoolList.push(output[i][12]);
            }
        }
        for (var i = 0; i < schoolList.length; i++) {
            let currentSchool = await School.findOne({schoolId : schoolList[i]}).populate("semesters");
            if (currentSchool != null) {
            schoolMap[schoolList[i]] = currentSchool;
            }
        }
        let idMap = {};
        for (var i = 1; i < output.length; i++){
            let currentSchool = schoolMap[output[i][12]];
            if (currentSchool) {
                idMap[output[i][0]] = {school: currentSchool, courses: []};
            }
        }
        for (var i = 1; i < output.length; i++) {
            let currentSchool = schoolMap[output[i][12]];
            if (currentSchool) {
                let currentTeacherCode = output[i][7].replace(/\s/g,'');
                let currentTeacher = await Teachers.findOne({$and: [{school: currentSchool._id}, {teacherCode: currentTeacherCode}]});
                if (currentTeacher) {
                    let currentSemester = "";
                    for (var j = 0; j < currentSchool.semesters.length; j++) {
                        if (currentSchool.semesters[j].name == output[i][4]) {
                            currentSemester = currentSchool.semesters[j]._id;
                        }
                    }
                    if (currentSemester) {
                        let blockConversion = currentSchool.courseBlockConversion || defaultBlocks;
                        let currentCourse = await Course.findOne({$and: [{semester: currentSemester}, {school: currentSchool._id}, {code: output[i][1].replace(/\s/g,'')}, {teacher: currentTeacher._id}, {block: blockConversion[output[i][5]]}]})
                        if (currentCourse) {
                            idMap[output[i][0]].courses.push(currentCourse._id);
                        }
                    }
                }
            }
        }
        for (var key in idMap) {
            let current = await serverCourse.findOne({$and: [{studentId: key}, {school: idMap[key].school}]});
            if (current) {
                await serverCourse.findOneAndUpdate({studenId: key}, {$set: idMap[key]});
            } else {
                let object = {studentId: key, school: idMap[key].school, courses: idMap[key].courses};
                await serverCourse.create(object);
            }
        }
    } catch(e) {
        console.log(e);
    }
});
