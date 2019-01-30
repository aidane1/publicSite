const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TeacherUser = require("../models/teacherUserchar.js");


const TeacherSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String, 
  },
  teacherCode: {
    type: String,
    required: true
  },
  prefix: {
      type: String,
  },
  school: {
    type : Schema.Types.ObjectId,
    ref: "School",
  },
});

TeacherSchema.pre("save", async function(next) {
  let randomID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  let teacher = this;
  let newTeacher = {
    code: randomID,
    teacherID: teacher.teacherCode,
    school: teacher.school,
    teacherAccount: teacher._id,
  }
  TeacherUser.create(newTeacher, function(err, newTeacher) {
    if (err) {
      return err;
    }
    next();
  });
});

var Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher;
