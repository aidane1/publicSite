const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const AlertSchema = new Schema({
  type: {
      type: String,
      default: "Notice"
  },
  text: {
      type: String,
      required: true,
  },
  href: {
      type: String,
  },
  date: {
      type: Date,
  },
  expiresOn: {
      type: Date,
  }
});

var Alert = mongoose.model('Alerts', AlertSchema);
module.exports = Alert;
