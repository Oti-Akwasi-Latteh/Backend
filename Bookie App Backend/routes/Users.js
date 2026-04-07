const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/Users");

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      location: email,
      isAdmin: false,
    });

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        location: user.location,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        location: user.location,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ================= GET ALL USERS =================
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select(
      "username email location isAdmin createdAt"
    );

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ================= GET SINGLE USER =================
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "username email location isAdmin createdAt"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// ================= DELETE USER =================
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;