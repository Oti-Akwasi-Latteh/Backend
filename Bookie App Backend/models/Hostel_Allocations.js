// models/Allocation.js
const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      unique: true, // one allocation per student
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Allocations", allocationSchema);
