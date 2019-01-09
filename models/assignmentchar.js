const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const AssignmentSchema = new Schema({
    submittedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    confirmed: {
        type: Boolean,
    },
    assignment: {
        type: String,
    },
    notes: {
        type: String,
    },
    due: {
        type: String,
    },
    date: {
        type: Date,
    },
    forCourse: {
        type: Schema.Types.ObjectId,
        ref: "Course",
    },
});

var Assignment = mongoose.model('Assignment', AssignmentSchema);
module.exports = Assignment;
