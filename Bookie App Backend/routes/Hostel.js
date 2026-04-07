const express = require("express");
const router = express.Router();
const Hostel = require("../models/Hostel");

// ================= CREATE HOSTEL =================
router.post("/", async (req, res) => {
  try {
    const hostel = await Hostel.create(req.body);
    res.status(201).json(hostel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET ALL HOSTELS =================
router.get("/", async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= UPDATE HOSTEL =================
router.put("/:id", async (req, res) => {
  try {
    const updatedHostel = await Hostel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedHostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }

    res.json({
      message: "Hostel updated",
      hostel: updatedHostel,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= DELETE HOSTEL =================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Hostel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Hostel not found" });
    }

    res.json({ message: "Hostel deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;