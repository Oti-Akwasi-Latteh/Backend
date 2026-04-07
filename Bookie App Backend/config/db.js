// config/db.js
const mongoose = require("mongoose");
 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://quasilyphae:ZEzy3qvdJOKOYnYQ@cluster0.aj3thcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
 
module.exports = connectDB;