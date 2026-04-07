// models/Student.js  (hostel applications)
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    gender:   { type: String, enum: ["Male", "Female"], required: true },
    hostel:   { type: String, required: true },

    applicationStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Allocated"],
      default: "Pending",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rooms",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", studentSchema);