const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const postSchema = new Schema({
  shown: {
    type: Boolean,
    default: true,
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
  anonymous: {
    type: Boolean
  },
  body: {
    type: String
  },
  tags: {
    type: Array,
    default: [],
  },
  attachments: {
    type: Array,
    default: [],
  },
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
});


const commentSchema = new Schema({
  parentPost: {
    type: Schema.Types.ObjectId,
  },
  parents: [{type: Schema.Types.ObjectId}],
  children: [{type: Schema.Types.ObjectId, ref: "Comment"}],
  body: {
    type: String,
  },
  depth: {
    type: Number,
    default: 0,
  },
  submittedBy: {
    type: String
  },
  treeChildren: {
    type: Array,
    default: [],
  },
  
});

var Post = mongoose.model('Post', postSchema);
var Comment = mongoose.model("Comment", commentSchema);
module.exports = {
  Post,
  Comment
}
