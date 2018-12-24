const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const CourseSchema = new Schema({
  block: {
    type: String,
  },
  teacher: {
    type: String,
  },
  course: {
    type: String,
  },
  code: {
    type: String
  },
  school: {
    type : Schema.Types.ObjectId
  },
  category: {
    type: String,
    default: ""
  }
});

var Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
