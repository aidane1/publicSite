const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const postSchema = new Schema({
  _id : {
    type: Schema.types.ObjectId
  },
  date: {
    type: Date
  },
  title: {
    type: String
  },
  submittedBy: {
    type: String
  },
  comments: {
    [{type: Schema.types.ObjectId, ref: Comment}]
  }
});


const commentSchema = new Schema({
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
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
