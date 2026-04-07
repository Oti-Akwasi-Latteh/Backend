// models/User.js
const mongoose = require("mongoose");
 
const userSchema = new mongoose.Schema(
  {
    username:  { type: String, required: true },
    email:     { type: String, required: true, unique: true, lowercase: true },
    password:  { type: String, required: true },
    isAdmin:   { type: Boolean, default: false },
    location:  { type: String, default: "" },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model("Users", userSchema);