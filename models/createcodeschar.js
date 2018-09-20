const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const CodeSchema = new Schema({
  code: {
    type: Number
  }
});

var Code = mongoose.model('Code', CodeSchema);
module.exports = Code;
