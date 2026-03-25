const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  items: [
    {
      name:String,
      price: String,
    
    },
  ],
  date: { type: Date, default: Date.now },
   address: { type: String, required: true }
});

module.exports = mongoose.model("Order", OrderSchema);
