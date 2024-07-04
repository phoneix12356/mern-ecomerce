const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  products: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("Order", OrderSchema);