const mongoose = require("mongoose");

const userCartSchema = new mongoose.Schema({
  UserId: { type: String, required: true },
  productid: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const UserCartModel = mongoose.model("UserCartModel", userCartSchema);

module.exports = UserCartModel;
