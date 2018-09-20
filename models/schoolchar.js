const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const SchoolSchema = new Schema({
  blockOrder: {
    day1: {
      type: Array,
      default: [["A", 9, 10, 10, 12], ["B", 10, 15, 11, 17], ["Advisory", 11, 19, 11, 29], ["C", 11, 29, 12, 30], ["Lunch", 12, 30, 1, 16], ["D", 13, 16, 14, 18], ["E", 14, 20, 15, 23]]
    },
    day2: {
      type: Array,
      default: [["A", 9, 10, 10, 12], ["B", 10, 15, 11, 17], ["Advisory", 11, 19, 11, 29], ["C", 11, 29, 12, 30], ["Lunch", 12, 30, 1, 16], ["D", 13, 16, 14, 18], ["E", 14, 20, 15, 23]]
    },
    day3: {
      type: Array,
      default: [["A", 9, 10, 10, 12], ["B", 10, 15, 11, 17], ["Advisory", 11, 19, 11, 29], ["C", 11, 29, 12, 30], ["Lunch", 12, 30, 1, 16], ["D", 13, 16, 14, 18], ["E", 14, 20, 15, 23]]
    },
    day4: {
      type: Array,
      default: [["A", 9, 10, 10, 12], ["B", 10, 15, 11, 17], ["Advisory", 11, 19, 11, 29], ["C", 11, 29, 12, 30], ["Lunch", 12, 30, 1, 16], ["D", 13, 16, 14, 18], ["E", 14, 20, 15, 23]]
    },
    day5: {
      type: Array,
      default: [["A", 9, 10, 10, 12], ["B", 10, 15, 11, 17], ["Advisory", 11, 19, 11, 29], ["C", 11, 29, 12, 30], ["Lunch", 12, 30, 1, 16], ["D", 13, 16, 14, 18], ["E", 14, 20, 15, 23]]
    }
  },
  name: {
    type: String
  },
  blockNames: {
    type: Array,
    default: ["A", "B", "C", "D", "E", "Advisory", "Lunch", "Recess"]
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
  }
});

var School = mongoose.model('School', SchoolSchema);
module.exports =School;
