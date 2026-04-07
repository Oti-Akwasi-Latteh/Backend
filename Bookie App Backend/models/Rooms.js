// models/Room.js
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber:  { type: String, required: true, unique: true },
    capacity:    { type: Number, required: true },
    bookedCount: { type: Number, default: 0 },
    status:      { type: String, default: "Available" }, // "Available" | "Booked"
    hostelId:    { type: mongoose.Schema.Types.ObjectId, ref: "Hostel", default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rooms", roomSchema);
