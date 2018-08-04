const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const postSchema = new Schema({

  date: {
    type: Date
  },
  title: {
    type: String
  },
  submittedBy: {
    type: String
  },
  body: {
    type: String
  },
  comments: [{type: Schema.Types.ObjectId, ref: Comment}]
});


const commentSchema = new Schema({
  parentPost: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  body: {
    type: String
  },
  submittedBy: {
    type: String
  }
});

var Post = mongoose.model('Post', postSchema);
var Comment = mongoose.model("Comment", commentSchema);
module.exports = {
  Post,
  Comment
}
