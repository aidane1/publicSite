const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const NoteSchema = new Schema({
    text: {
        type: String
    },
    writtenBy: {
        type: String
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
