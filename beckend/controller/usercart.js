const UserCart = require("../models/usercart");

const getUserCart = async (req, res) => {
  try {
    const UserId = req.body.id;
    const cart = await UserCart.find({ UserId });
   
    return res.status(202).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserCart = async (req, res) => {
  const UserId = req.body.id;
  const productid = req.body.pid;
  const quantity = Number(req.body.quantity);
 
  if (!UserId || !productid || !quantity) {
    return res.status(400).json({ error: "koi field khali hai" });
  }
  try {
    const result = await UserCart.findOneAndUpdate(
      { UserId, productid },
      { $set: { quantity } },
      { new: true }
    );
    return res.json(result);
  } catch (error) {
    console.error("Error updating user cart:", error);
    return res.status(500).send("Internal server error");
  }
};

const addToUserCart = async (req, res) => {
  
  const UserId = req.body.id;
  const productid = req.body.pid;
  const quantity = Number(req.body.quantity);
  if (!UserId || !productid || !quantity) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const result = await UserCart.create({
      UserId,
      productid,
      quantity,
    });
    return res.json("SuccessFull");
  } catch (error) {
    console.error("Error inserting user cart item:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFromUserCart = async (req, res) => {
  try {
    const UserId = req.body.id;
    const productid = req.body.pid;
    
    if (!UserId || !productid) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (productid === -1) {
      await UserCart.deleteMany({ UserId });
    } else {
      await UserCart.deleteOne({ UserId, productid });
    }
    res.json({ message: "Successfully deleted" });
  } catch (err) {
    console.error("Error deleting from user cart:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUserCart,
  updateUserCart,
  addToUserCart,
  deleteFromUserCart
};