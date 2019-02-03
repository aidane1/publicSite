const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const CategorySchema = new Schema({
  category: {
      type: String,
      required: true,
  },
  shortCode: {
    type: String,
  },
  school: {
    type : Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
});

var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
