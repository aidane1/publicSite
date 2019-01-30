const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;




const TeacherSchema = new Schema({
    school: {
      type: Schema.Types.ObjectId,
      ref: "School",
    },
    teacherID: {
        type: String,
    },
    code: {
        type: String,
        required: true,
    },
    teacherAccount: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
    },
});





TeacherSchema.statics.authenticate = (ID, code, school) => {
  console.log(ID);
  return new Promise((resolve, reject) => {
    TeacherAccount.findOne({ teacherID: ID }).exec((err, user) => {
      
      if (err) {
        reject(err);
      } else if (!user || user.school != school) {
        reject("teacher not found");
      } else {
        if (code == user.code) {
          resolve(user);
        } else {
          reject("code incorrect");
        }
      }
    });
  })
}
TeacherSchema.pre("save", function(next) {
  if (this.teacherID) {
    this.teacherID = this.teacherID.toLowerCase();
  }
  next();
})


var TeacherAccount = mongoose.model('TeacherAccount', TeacherSchema);
module.exports = TeacherAccount;
