// hostel allocation

const express = require("express");
const router = express.Router();

const Allocation = require("../models/Hostel_Allocations");
const Student = require("../models/Applications");

router.put("/allocate", async (req, res) => {
  const { studentId, roomId } = req.body;

  if (!studentId || !roomId) {
    return res.status(400).json({
      error: "studentId and roomId required",
    });
  }

  try {
    const student = await Student.findById(studentId);

    if (!student || student.applicationStatus !== "Approved") {
      return res.status(400).json({
        error: "Student not found or not approved",
      });
    }

    let allocation = await Allocation.findOne({ studentId });

    if (allocation) {
      allocation.roomId = roomId;
      await allocation.save();
    } else {
      allocation = await Allocation.create({
        studentId,
        roomId,
      });
    }

    student.applicationStatus = "Allocated";
    await student.save();

    res.json({ message: "Student allocated successfully" });
  } catch (err) {
    console.error("Allocation error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;