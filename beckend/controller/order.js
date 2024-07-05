const OrderModel = require("../models/order");

const createOrder = async (req, res) => {
  const { email, address, name, cost, products, date } = req.body;
  try {
    const response = await OrderModel.create({
      email,
      address,
      name,
      cost,
      products,
      date,
    });
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const email = req.body.email;
    const orderDetail = await OrderModel.find({ email });
    return res.json(orderDetail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
};