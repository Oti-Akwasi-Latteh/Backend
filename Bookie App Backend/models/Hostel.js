// models/Hostel.js
const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    description: { type: String, required: true },
    location:    { type: String, required: true },
    contactInfo: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hostels", hostelSchema);
