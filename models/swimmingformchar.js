const mongoose = require("mongoose");

let FormSchema = new mongoose.Schema({
    coach: {
        type: String,
        default: "Jason",
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "No Description!",
    },
    attendedActivation: {
        type: String,
        default: "N",
    },
    completedActivation: {
        type: String,
        default: "1"
    },
    activationIntention: {
        type: String,
        default: "D",
    },
    attendedSwim: {
        type: String,
        default: "N",
    },
    completedSwim: {
        type: String,
        default: "1"
    },
    swimIntention: {
        type: String,
        default: "D",
    },
    feeling: {
        type: String,
        default: ":("
    },
    soreness: {
        type: String,
        default: ":("
    },
    mood: {
        type: String,
        default: ":("
    },
    customNotes: {
        type: String,
        default: "No Notes!"
    },
    date: {
        type: Date,
        default: new Date()
    },
    practiceDay: {
        type: String,
        default: "Monday",
    },
    practiceSession: {
        type: String,
        default: "AM",
    }
});

let Form = mongoose.model("Form", FormSchema);
module.exports = Form;