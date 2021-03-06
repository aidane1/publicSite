const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const SchoolSchema = new Schema({
  blockOrder: {
    type: Array,
    default: {
      day1: {
        type: Array,
        default: [["A", 9, 10, 10, 12, "changing"], ["B", 10, 15, 11, 17, "changing"], ["Advisory", 11, 19, 11, 29, "constant"], ["C", 11, 29, 12, 30, "changing"], ["Lunch", 12, 30, 1, 16, "constant"], ["D", 13, 16, 14, 18, "changing"], ["E", 14, 20, 15, 23, "changing"]]
      },
      day2: {
        type: Array,
        default: [["A", 9, 10, 10, 12, "changing"], ["B", 10, 15, 11, 17, "changing"], ["Advisory", 11, 19, 11, 29, "constant"], ["C", 11, 29, 12, 30, "changing"], ["Lunch", 12, 30, 1, 16, "constant"], ["D", 13, 16, 14, 18, "changing"], ["E", 14, 20, 15, 23, "changing"]]
      },
      day3: {
        type: Array,
        default: [["A", 9, 10, 10, 12, "changing"], ["B", 10, 15, 11, 17, "changing"], ["Advisory", 11, 19, 11, 29, "constant"], ["C", 11, 29, 12, 30, "changing"], ["Lunch", 12, 30, 1, 16, "constant"], ["D", 13, 16, 14, 18, "changing"], ["E", 14, 20, 15, 23, "changing"]]
      },
      day4: {
        type: Array,
        default: [["A", 9, 10, 10, 12, "changing"], ["B", 10, 15, 11, 17, "changing"], ["Advisory", 11, 19, 11, 29, "constant"], ["C", 11, 29, 12, 30, "changing"], ["Lunch", 12, 30, 1, 16, "constant"], ["D", 13, 16, 14, 18, "changing"], ["E", 14, 20, 15, 23, "changing"]]
      },
      day5: {
        type: Array,
        default: [["A", 9, 10, 10, 12, "changing"], ["B", 10, 15, 11, 17, "changing"], ["Advisory", 11, 19, 11, 29, "constant"], ["C", 11, 29, 12, 30, "changing"], ["Lunch", 12, 30, 1, 16, "constant"], ["D", 13, 16, 14, 18, "changing"], ["E", 14, 20, 15, 23, "changing"]]
      }
    }
  },
  name: {
    type: String
  },
  blockNames: {
    type: Array,
    default: [["A", "changing"], ["B", "changing"], ["C", "changing"], ["D", "changing"], ["E", "changing"], ["Advisory", "constant"], ["Lunch", "constant"], ["Recess", "constant"]]
  },
  courseCodes: {
    type: Object
  },
  masterAccount: {
    type: Schema.Types.ObjectId
  },
  scheduleRollLength: {
    type: Number,
    default: 1,
  },
  constantBlocks: {
    type: Boolean,
    default: false
  },
  constantBlockSchedule: {
    type: Object,
    default: {
      blockSchedule: [[9,10,10,12], [10,15,11,17], [11,19,11,29], [11,29,12,31], [12,31,13,16], [13,16,14,18], [14,21,15,23]],
      schedule : [
        {
          day1: [["A", "changing"], ["B", "changing"], ["Advisory", "constant"], ["C", "changing"], ["Lunch", "constant"], ["D", "changing"], ["E", "changing"]],
          day2: [["A", "changing"], ["B", "changing"], ["Advisory", "constant"], ["C", "changing"], ["Lunch", "constant"], ["D", "changing"], ["E", "changing"]],
          day3: [["A", "changing"], ["B", "changing"], ["Advisory", "constant"], ["C", "changing"], ["Lunch", "constant"], ["D", "changing"], ["E", "changing"]],
          day4: [["A", "changing"], ["B", "changing"], ["Advisory", "constant"], ["C", "changing"], ["Lunch", "constant"], ["D", "changing"], ["E", "changing"]],
          day5: [["A", "changing"], ["B", "changing"], ["Advisory", "constant"], ["C", "changing"], ["Lunch", "constant"], ["D", "changing"], ["E", "changing"]]
        }
      ]
    }
  },
  favicon: {
    type: String
  },
  semesters: {
    type: [{type: Schema.Types.ObjectId, ref: "Semester"}],
  },
  spareName: {
    type: String,
    default: "Spare"
  },
  titleDisplay: {
    type: Number,
    default: 0
  },
  schoolDistrict: {
    type: String
  },
  dayTitles: {
    type: Array,
    default: [{day1: "Monday", day2: "Tuesday", day3: "Wednesday", day4: "Thursday", day5: "Friday"}],
  },
  adminChanges: {
    type: Array,
    default: [],
  },
  schoolId: {
    type: String,
  },
  blockConversion: {
    type: Object,
    default: {
      "02": "A",
      "04": "B",
      "07": "C",
      "09": "D",
      "11": "E",
    },
  },
  courseBlockConversion: {
    type: Object,
    default: {
      "01": "A",
      "03": "B",
      "05": "C",
      "07": "D",
      "09": "E",
    }
  },
  sendAlerts: {
    type: Array,
    default: [],
  },
  startDate: {
    type: Date,
    default: new Date(2018, 08, 1),
  },
  endDate: {
    type: Date,
    default: new Date(2019, 05, 30),
  }
});

var School = mongoose.model('School', SchoolSchema);
module.exports =School;
