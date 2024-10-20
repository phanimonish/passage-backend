const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    bio: String
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = {userSchema, User};
