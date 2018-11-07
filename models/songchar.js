const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const SongSchema = new Schema({
  date : {
    type: Date
  },
  song : {
    type: String
  }
});

var Song = mongoose.model('Song', SongSchema);
module.exports = Song;
