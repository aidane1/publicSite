const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const TextSchema = new Schema({
  date : {
    type: Date
  },
  body : {
    type: String
  },
  submittedBy : {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  createdAt {
    type: Number,
    default: 1
  },
  expiresAfterSeconds: {
    type: Number,
    default: 60
  }
});

var Text = mongoose.model('Text', TextSchema);
module.exports = Text;
