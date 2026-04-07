// models/Admin.js
const mongoose = require("mongoose");
 
const adminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true, lowercase: true },
    password:  { type: String, required: true },
    isAdmin:   { type: Boolean, default: true },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model("Admin", adminSchema);