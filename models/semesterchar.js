const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const SemesterChar = new Schema({
  startDate: {
      type: Date,
  },
  endDate: {
      type: Date,
  },
  name: {
      type: String,
  }
});

var Semester = mongoose.model('Semester', SemesterChar);
module.exports = Semester;
