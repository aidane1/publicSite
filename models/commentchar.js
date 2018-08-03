const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("postchar.js");




const commentSchema = new Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }
});

var Post = mongoose.model('Comment', commentSchema);
module.exports = Comment;
