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
  teachers: {
    type: Array
  },
  masterAccount: {
    type: Schema.Types.ObjectId
  },
  categories: {
    type: Array
  },
  scheduleType: {
    type: Number,
    default: 0
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
  spareName: {
    type: String,
    default: "Spare"
  },
  titleDisplay: {
    type: Number,
    default: 0
  }
});

var School = mongoose.model('School', SchoolSchema);
module.exports =School;
