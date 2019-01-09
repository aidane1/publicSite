const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const TeacherSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String, 
  },
  teacherCode: {
    type: String,
  },
  prefix: {
      type: String,
  },
  school: {
    type : Schema.Types.ObjectId,
    ref: "School",
  },
});

var Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher;
