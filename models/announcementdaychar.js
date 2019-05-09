const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const AnnouncementDaySchema = new Schema({
  date: {
      type: Date,
      default: Date.now(),
  },
  announcements: {
      type: Array,
      required: true,
      default: [],
  }
});

var AnnouncementDay = mongoose.model('AnnouncementDay', AnnouncementDaySchema);
module.exports = AnnouncementDay;
