const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const EventSchema = new Schema({
  year : {
    type : Number
  },
  month : {
    type : Number,
    required : true
  },
  day : {
    type : Number,
    required : true
  },
  time : {
    type : String,
    default : "9:20"
  },
  info : {
    type : String
  },
  date: {
    type: Date
  },
  longForm: {
    type: String
  },
  school : {
    type : Schema.Types.ObjectId
  },
  schoolSkipped: {
    type: Boolean
  },
  dayRolled: {
    type: Boolean
  },
  displayedEvent: {
    type: Boolean
  }
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;
