const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const ServerSchema = new Schema({
  studentId: {
    type: String,
    required: true,
  },
  school: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  courses: {
    type: [Schema.Types.ObjectId],
    default: [],
  }
});

var Server = mongoose.model('ServerCourses', ServerSchema);
module.exports = Server;
