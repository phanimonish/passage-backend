const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: String,
  title: String,
  description: String,
  imageUrl: String,
  date: String,
  comments: Number,
  claps: Number,
  category: String
});

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
