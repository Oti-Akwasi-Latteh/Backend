// server.js
const express    = require("express");
const cors       = require("cors");
const connectDB  = require("./config/db");
const dotenv = require('dotenv')

// ── Route files ──────────────────────────────────────────────
const userRoutes       = require("./routes/Users");
const adminRoutes      = require("./routes/Admin");
const hostelRoutes     = require("./routes/Hostel");
const roomRoutes       = require("./routes/Rooms");
const studentRoutes    = require("./routes/Applications");
const allocationRoutes = require("./routes/Hostel_Allocations");

const app = express();
dotenv.config()

// ── Mount routes ──────────────────────────────────────────────
app.use(cors({
  origin: [
    "https://bookie-hostel.netlify.app",
    "htttps://127.0.0.1:5501"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

connectDB();


app.use("/api/users",      userRoutes);
app.use("/api/admin",      adminRoutes);
app.use("/api/hostels",    hostelRoutes);
app.use("/api/rooms",      roomRoutes);
app.use("/api/students",   studentRoutes);
app.use("/api/allocation", allocationRoutes);

// ── Health check ──────────────────────────────────────────────
app.get("/", (_req, res) => res.json({ status: "Bookie API running" }));

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
