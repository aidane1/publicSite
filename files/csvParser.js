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




parser(input, {comment: '#'}, async function(err, output) {
  
  // let user = await User.findOne({username: "AidanEglin"});
  let schoolMap = {};
  let schoolList = [];
  for (var i = 1; i < output.length; i++) {
    if (schoolList.indexOf(output[i][11]) < 0) {
      schoolList.push(output[i][11]);
    }
  }
  for (var i = 0; i < schoolList.length; i++) {
    let currentSchool = await School.findOne({schoolId : schoolList[i]}).populate("semesters");
    if (currentSchool != null) {
      schoolMap[schoolList[i]] = currentSchool;
    }
  }
  
  // console.log(output);
  // 
  let teacherList = [];
  let currentTeacher = {firstName: "", lastName: "", teacherCode: "", prefix: "Mr. ", school: ""};
  for (var i = 1; i < output.length; i++) {
    let currentFirstName = output[i][2].replace(/\s/g,'');
    let currentLastName = output[i][1].replace(/\s/g,'');
    let currentTeacherCode = output[i][0].replace(/\s/g,'');
    if (currentFirstName && currentLastName && currentTeacherCode) {
      // console.log(currentFirstName);
      currentFirstName = currentFirstName[0].toUpperCase() + currentFirstName.substring(1, currentFirstName.length).toLowerCase();
      
      currentLastName = currentLastName[0].toUpperCase() + currentLastName.substring(1, currentLastName.length).toLowerCase();
      
      let currentSchool = schoolMap[output[i][11]];
      if ((currentTeacher.firstName != currentFirstName || currentTeacher.lastName != currentLastName || currentTeacher.teacherCode != currentTeacherCode || currentTeacher.school != currentSchool) && currentSchool) {
        currentSchool = currentSchool._id;
        currentTeacher.firstName = currentFirstName;
        currentTeacher.lastName = currentLastName;
        currentTeacher.teacherCode = currentTeacherCode;
        currentTeacher.school = currentSchool;
        teacherList.push({firstName: currentFirstName, lastName: currentLastName, teacherCode: currentTeacherCode, prefix: "Mr. ", school: currentSchool}); 
      }
    }
  }
  //this creates any teachers that didn't already exist
  for (var i = 0; i < teacherList.length; i++) {
    let foundTeacher = await Teachers.findOne({$and: [{school: teacherList[i].school}, {firstName: teacherList[i].firstName}, {lastName: teacherList[i].lastName}]});
    if (foundTeacher == null) {
      await Teachers.create(teacherList[i]);
    }
  }

  for (var i = 0; i < output.length; i++) {
    let currentSchool = schoolMap[output[i][11]];
    if (currentSchool) {
      let currentSemester = output[i][8];
      let matched = false;
      for (var j = 0; j < currentSchool.semesters.length; j++) {
        if (currentSchool.semesters[j].name == currentSemester) {
          matched = true;
        }
      }
      if (!matched && currentSemester.replace(/\s/g,'')) {
        let startDate = output[i][9].match(/.{1,2}/g);
        startDate[0] = parseInt("20" + startDate[0]);
        startDate = new Date(startDate[0], parseInt(startDate[1])-1, parseInt(startDate[2]));
        let endDate = output[i][10].match(/.{1,2}/g);
        endDate[0] = parseInt("20" + endDate[0]);
        endDate = new Date(endDate[0], parseInt(endDate[1])-1, parseInt(endDate[2]));
        let semester = await Semesters.create({name: currentSemester, startDate: startDate, endDate: endDate});
        await School.findOneAndUpdate({_id : currentSchool._id}, {$push: {semesters: semester._id}});
        schoolMap[output[i][11]].semesters.push(semester);
      }
    }
  }

  let categoryList = [];
  let currentCategory = {shortCode: "", category: "", school: ""};
  output.sort(function(a,b) {
    a[4].localeCompare(b[4]);
  });
  for (var i = 1; i < output.length; i++) {
    let currentCategoryCategory = output[i][4].replace(/\s/g,'');
    // console.log(currentCategoryCategory);
    let currentSchool = schoolMap[output[i][11]];
    if ((currentCategory.shortCode != currentCategoryCategory || currentCategory.category != currentCategoryCategory || currentCategory.school != currentSchool) && currentSchool && currentCategoryCategory) {
      currentSchool = currentSchool._id;
      currentCategory.school = currentSchool;
      currentCategory.category = currentCategoryCategory;
      currentCategory.shortCode = currentCategoryCategory;
      categoryList.push({school: currentSchool, category: currentCategoryCategory, shortCode: currentCategoryCategory});
    }
  }
  // console.log(categoryList);
  
  
  
  for (var i = 0; i < categoryList.length; i++) {
    
    let foundCategory = await Categories.findOne({$and: [{school: categoryList[i].school}, {shortCode: categoryList[i].shortCode}]});
    // console.log(foundCategory);
    if (foundCategory == null) {
      await Categories.create(categoryList[i]);
    }
  }

let mapVal = {
  "02": "A",
  "04": "B",
  "07": "C",
  "09": "D",
  "11": "E",
};

  let courseList = [];
  for (var i = 1; i < output.length; i++) {

    let currentFirstName = output[i][2].replace(/\s/g,'');
    let currentLastName = output[i][1].replace(/\s/g,'');
    let currentTeacherCode = output[i][0].replace(/\s/g,'');
    if (currentFirstName && currentLastName && currentTeacherCode) {
      currentFirstName = currentFirstName[0].toUpperCase() + currentFirstName.substring(1, currentFirstName.length).toLowerCase();
      
      currentLastName = currentLastName[0].toUpperCase() + currentLastName.substring(1, currentLastName.length).toLowerCase();
      
      let currentCode = output[i][3].replace(/\s/g,'');
      let currentTeacher = await Teachers.findOne({$and: [{firstName: currentFirstName}, {lastName: currentLastName}, {teacherCode: currentTeacherCode}]});
      let currentSchool = schoolMap[output[i][11]];
      let currentSemester = "";
      for (var j = 0; j < currentSchool.semesters.length; j++) {
        if (currentSchool.semesters[j].name == output[i][8]) {
          currentSemester = currentSchool.semesters[j]._id;
        }
      }
      if (currentSchool && currentSemester) {
        let currentCategory = await Categories.findOne({$and: [{shortCode: output[i][4].replace(/\s/g,'')}, {school: currentSchool._id}]});
        if (currentCategory != null && currentTeacher != null) {
          courseList.push({school: currentSchool._id, course: currentSchool.courseCodes[currentCode] || currentCode, category: currentCategory._id, code: currentCode, teacher: currentTeacher._id, semester: currentSemester, block: mapVal[output[i][7]] || output[i][7]});
        } else {

        }  
      }
    }
  }  
  for (var i = 0; i < courseList.length; i++) {
    let foundCourse = await Course.findOne({$and: [{code: courseList[i].code}, {teacher: courseList[i].teacher}, {semester: courseList[i].semester}, {block: courseList[i].block}]});
    if (foundCourse == null) {      
      await Course.create(courseList[i]);
    }
  }

  // console.log(teacherList);
  console.log(output);
});