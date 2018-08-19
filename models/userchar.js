const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;




const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,

  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  courses: {
    type: [Schema.Types.ObjectId],
  },
  reputation: {
    type: Number,
    default: 0,
  },
  banned: {
    type: Boolean,
    default: false,
  },
  texts: {
    type: Array
  },
  suggestions: {
    type: Array,
    default: [["", new Date()]]
  },
  permissions: {
    type: String,
    default: "user"
  },
  alerts: {
    type: Array,
    default: []
  },
  colors: {
    bgColor: {type: String, default: "#FC7753"},
    textColor: {type: String, default: "#F2EFEA"},
    infoColor: {type: String, defualt: "#403D58"},
    buttonColor: {type: String, default: "#66D7D1"},
    borderColor: {type: String, default: ""}
  },
  order: {
    block1: {type: String, default: "Courses"},
    block2: {type: String, default: "LC"},
    block3: {type: String, default: "Calendar"},
    block4: {type: String, default: "Schedule"},
    block5: {type: String, default: "Resources"}
  }

});



// UserSchema.statics.authenticate = function(name, password, callback) {
//   User.findOne({ username: name }).exec(function(err, user) {
//     if (err) {
//       return callback(err, "unknown error");
//     } else if (!user) {
//       var err = new Error('User not found.');
//       callback(err, "this is a test");
//     }
//     bcrypt.compare(password, user.password, function (err, result) {
//       if (result === true) {
//         return callback(null, user);
//       } else {
//         var err = new Error("username or password incorrect");
//         return callback(err, "not found");
//       }
//     });
//   });
// }

UserSchema.statics.authenticate = (name, password) => {

  return new Promise((resolve, reject) => {
    User.findOne({ username: name }).exec((err, user) => {
      if (err) {
        reject(err);
      } else if (!user) {
        reject("user not found");
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            resolve(user);
          } else {
            console.log("dicks");
            reject("password incorrect");
          }
        });
      }
    });
  })
}

UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return (err);
    }
    user.password = hash;
    next();
  })
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
