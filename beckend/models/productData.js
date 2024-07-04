const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  cost: Number,
  img: { data: Buffer, contentType: String },
  madeBy: String,
  description: String,
  amount: Number,
  tax: Number,
});

const productsModel = mongoose.model("product", productsSchema);

module.exports = productsModel;
