const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const HomeworkSchema = new Schema({
  parentCourseId: {
    type: Schema.Types.ObjectId
  },
  submittedBy: {
    type: String
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  page: {
    type: String
  },
  questions: {
    type: String
  },
  assignment: {
    type: String
  },
  notes: {
    type: String
  },
  date: {
    type: Date
  }
});

var Homework = mongoose.model('Homework', HomeworkSchema);
module.exports = Homework;
