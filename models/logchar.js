const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const LogSchema = new Schema({
    school: {
        type: Schema.Types.ObjectId,
        ref: "School",
    },
    dateString: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now(),
    }
});

var Log = mongoose.model('Log', LogSchema);
module.exports = Log;
