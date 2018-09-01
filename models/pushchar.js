const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const PushUsersSchema = new Schema({
  code: {
    type: Object
  },
  user: {
    type: String
  }
});

var Push = mongoose.model('Push', PushUsersSchema);
module.exports = Push;
