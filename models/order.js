const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  totalPrice: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  description: {
    type: String,
  },
});

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
