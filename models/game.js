const mongoose = require('mongoose')
const gameSchema = new mongoose.Schema({
    title: String,
    creator: String,
    width: Number,
    height: Number,
    fileName: String,
    thumbnailFile: String
});

module.exports = mongoose.model("Game", gameSchema);