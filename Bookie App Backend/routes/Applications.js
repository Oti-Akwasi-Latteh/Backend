// routes/Applications.js

const express = require("express");
const router  = express.Router();

const Student = require("../models/Applications");
const Room    = require("../models/Rooms");

// ================= GET ALL STUDENTS/APPLICATIONS (admin dashboard) =================
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("roomId", "roomNumber");
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// ================= GET APPLICATIONS OF A SINGLE USER =================
router.get("/user/:id", async (req, res) => {
  try {
    const apps = await Student.find({ userId: req.params.id }).populate("roomId", "roomNumber");
    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user applications" });
  }
});

// ================= SUBMIT APPLICATION =================
router.post("/", async (req, res) => {
  try {
    const { fullName, gender, hostel, roomNumber, userId } = req.body;

    if (!fullName || !gender || !hostel || !roomNumber || !userId) {
      return res.status(400).json({ error: "All fields required" });
    }

    const dbRoom = await Room.findOne({ roomNumber });
    if (!dbRoom) {
      return res.status(404).json({ error: "Room not found" });
    }

    const existing = await Student.findOne({ userId, roomId: dbRoom._id });
    if (existing) {
      return res.status(400).json({ error: "You have already applied for this room" });
    }

    const student = await Student.create({
      fullName,
      gender,
      hostel,
      userId,
      roomId:            dbRoom._id,
      applicationStatus: "Pending",
    });

    res.status(201).json({ message: "Application submitted", application: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ================= APPROVE APPLICATION =================
router.put("/approve/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { applicationStatus: "Approved" },
      { new: true }
    );
    if (!student) return res.status(404).json({ error: "Application not found" });
    res.json({ message: "Application approved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= REJECT APPLICATION =================
router.put("/reject/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { applicationStatus: "Rejected" },
      { new: true }
    );
    if (!student) return res.status(404).json({ error: "Application not found" });
    res.json({ message: "Application rejected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;