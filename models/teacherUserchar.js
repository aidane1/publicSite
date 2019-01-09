const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;




const TeacherScema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    teacherAccount: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
    },
});





TeacherScema.statics.authenticate = (name, password, school) => {

  return new Promise((resolve, reject) => {
    TeacherAccount.findOne({ username: name }).exec((err, user) => {
      if (err) {
        reject(err);
      } else if (!user || user.school != school) {
        reject("user not found");
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            resolve(user);
          } else {
            reject("password incorrect");
          }
        });
      }
    });
  })
}

TeacherScema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return (err);
    }
    user.password = hash;
    next();
  })
});

var TeacherAccount = mongoose.model('TeacherAccount', TeacherSchema);
module.exports = TeacherAccount;
