const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const CategorySchema = new Schema({
  category: {
      type: String,
  },
  shortCode: {
    type: String,
  },
  school: {
    type : Schema.Types.ObjectId,
    ref: "School",
  },
});

var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
