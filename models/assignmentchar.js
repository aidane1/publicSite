const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const AssignmentSchema = new Schema({
    submittedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    type: {
        type: String,
        default: "text",
    },
    topic: {
        type: String,
        default: "No Topic",
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    assignment: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        default: "",
    },
    due: {
        type: String,
        default: "",
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
