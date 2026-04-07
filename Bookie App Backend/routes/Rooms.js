const express = require("express");
const router  = express.Router();

const Room    = require("../models/Rooms");
const Student = require("../models/Applications");

// ================= GET ALL ROOMS (admin) =================
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find(); // all rooms, not just Available
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET SINGLE ROOM BY ID =================
// ⚠️ This was missing — confirmBooking.js needs it to resolve room details
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json(room);
  } catch (err) {
    console.error("Get room error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================= ADD ROOM (admin) =================
router.post("/", async (req, res) => {
  try {
    const { roomNumber, capacity, status, hostelId } = req.body;

    if (!roomNumber || !capacity) {
      return res.status(400).json({ error: "roomNumber and capacity are required" });
    }

    const existing = await Room.findOne({ roomNumber });
    if (existing) {
      return res.status(400).json({ error: `Room "${roomNumber}" already exists` });
    }

    const room = await Room.create({
      roomNumber,
      capacity:    parseInt(capacity),
      status:      status || "Available",
      hostelId:    hostelId || null,
      bookedCount: 0,
    });

    res.status(201).json(room);
  } catch (err) {
    console.error("Add room error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================= UPDATE ROOM (admin) =================
router.put("/:id", async (req, res) => {
  try {
    const { roomNumber, capacity, status, hostelId } = req.body;

    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { roomNumber, capacity: parseInt(capacity), status, hostelId: hostelId || null },
      { new: true, runValidators: true }
    );

    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json(room);
  } catch (err) {
    console.error("Update room error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================= DELETE ROOM (admin) =================
router.delete("/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    console.error("Delete room error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================= BOOK ROOM (user) =================
router.post("/book/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const { fullName, gender, hostel, userId } = req.body;

    if (!fullName || !gender || !hostel || !userId) {
      return res.status(400).json({ error: "All fields required" });
    }

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: "Room not found" });

    if (room.bookedCount >= room.capacity) {
      room.status = "Booked";
      await room.save();
      return res.status(400).json({ error: "Room is fully booked" });
    }

    const existing = await Student.findOne({ userId, roomId: room._id });
    if (existing) {
      return res.status(400).json({ error: "You have already applied for this room" });
    }

    const student = await Student.create({
      fullName,
      gender,
      hostel,
      userId,
      roomId:            room._id,
      applicationStatus: "Pending",
    });

    room.bookedCount += 1;
    if (room.bookedCount >= room.capacity) room.status = "Booked";
    await room.save();

    res.status(201).json({ message: "Application submitted", student });
  } catch (err) {
    console.error("Book room error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;