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
    type : String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  longForm: {
    type: String
  },
  school : {
    type : Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  schoolSkipped: {
    type: Boolean,
    required: true,
  },
  dayRolled: {
    type: Boolean,
    required: true,
  },
  displayedEvent: {
    type: Boolean,
    required: true,
  }
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;
