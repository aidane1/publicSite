const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const AnnouncementSchema = new Schema({
  urgency: {
      type: String,
      default: "Low",
  },
  grades: {
      type: Array,
      default: [8,9,10,11,12],
  },
  body: {
      type: String,
      required: true,
  },
  date: {
      type: Date,
      default: Date.now(),
  }
});

var Announcement = mongoose.model('Announcements', AnnouncementSchema);
module.exports = Announcement;
