const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const NoteSchema = new Schema({
    noteType: {
        type: String,
        default: "text",
    },
    text: {
        type: String
    },
    writtenBy: {
        type: Schema.Types.ObjectId,
    },
    date: {
        type: Date
    },
    forCourse: {
        type: Schema.Types.ObjectId
    }
});

var Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
