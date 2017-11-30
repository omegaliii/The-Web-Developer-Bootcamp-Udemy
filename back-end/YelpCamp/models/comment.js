var mongoose = require("mongoose");

//Set up the campgrounds schema
var commentSchema = new mongoose.Schema({
    text: String,
    author:String
});

module.exports = mongoose.model("Comment", commentSchema);