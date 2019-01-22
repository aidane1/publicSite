const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const CourseSchema = new Schema({
  block: {
    type: String,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
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
  },
  topics: {
    type: [{type: String}],
  },
});

var Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
