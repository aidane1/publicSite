const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const BlockChar = new Schema({
  name: {
      type: String,
  },
  constant: {
      type: Boolean, 
      default: false,
  }
});

var Block = mongoose.model('Block', BlockChar);
module.exports = Block;
