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
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  courses: {
    type: [{type: Schema.Types.ObjectId, ref: "Course"}],
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
    borderColor: {type: String, default: "000000"}
  },
  order: {
    block1: {type: String, default: "Courses"},
    block2: {type: String, default: "LC"},
    block3: {type: String, default: "Calendar"},
    block4: {type: String, default: "Schedule"},
    block5: {type: String, default: "Resources"}
  },
  addedEvents: {
    type: Array
  },
  font: {
    type: String,
    default: "/public/fonts/LANENAR_.ttf"
  },
  schoolUsername: {
    type: String
  },
  grade: {
    type: Number
  },
  planner: {
    type: Array
  },
  weeklySchedule: {
    day0: {type: Array},
    day1: {type: Array},
    day2: {type: Array},
    day3: {type: Array},
    day4: {type: Array},
    day5: {type: Array},
    day6: {type: Array}
  },
  school: {
    type : Schema.Types.ObjectId
  },
  blockNames: {
    type : Object,
    default: {}
  },
  scheduleColours : {
    type: Object,
    default: {},
  },
  anonPosts: {
    type: Array,
  },
  studentID: {
    type: String,
    default: "",
  },
  completedAssignments: {
    type: [{type: Schema.Types.ObjectId, ref: "Assignments"}],
    default: [],
  },
  completedNotes: {
    type: [{type: Schema.Types.ObjectId, ref: "Notes"}],
    default: [],
  }
});





UserSchema.statics.authenticate = (name, password, school) => {

  return new Promise((resolve, reject) => {
    User.findOne({ username: name }).exec((err, user) => {
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
