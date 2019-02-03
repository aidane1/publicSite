const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const CourseSchema = new Schema({
  block: {
    type: String,
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  code: {
    type: String
  },
  school: {
    type : Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: "Semester",
    required: true,
  },
  topics: {
    type: [{type: String}],
  },
});

var Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
