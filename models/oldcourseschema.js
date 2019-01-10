const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const CourseSchema = new Schema({
  block: {
    type: String,
  },
  teacher: {
    type: String
  },
  course: {
    type: String,
  },
  code: {
    type: String
  },
  school: {
    type : Schema.Types.ObjectId,
    ref: "School",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: "Semester"
  }
});

var oldCourse = mongoose.model('Course', CourseSchema);
module.exports = oldCourse;
