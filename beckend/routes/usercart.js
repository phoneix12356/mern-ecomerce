const express = require("express");
const { authenticateToken } = require("../middleware/middleware");
const router = express.Router();
const UserCart = require("../models/usercart");

router.get("/api/user", authenticateToken, async (req, res) => {
  try {
    const UserId = req.body.id;
    const cart = await UserCart.find({ UserId });
    console.log("user cart get request ke andar ");
    return res.status(202).json(cart);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/api/user", authenticateToken, async (req, res) => {
  const UserId = req.body.id;
  const productid = req.body.pid;
  const quantity = Number(req.body.quantity);
  console.log("user cart patch request ke andar", UserId, productid, quantity);
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
});

router.post("/api/user", authenticateToken, async (req, res) => {
  console.log("post request ke andar");
  const UserId = req.body.id;
  const productid = req.body.pid;
  const quantity = Number(req.body.quantity);
  if (!UserId || !productid || !quantity) {
    return res.status(400).send(error);
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
});

router.delete("/api/user", authenticateToken, async (req, res) => {

  try {
    const UserId = req.body.id;
    const productid = req.body.pid;
   
    if (!UserId || !productid) {
      return res.status(400).send(error);
    }
    if (productid === -1) await UserCart.deleteMany({ UserId });
    else {
      await UserCart.deleteOne({ UserId, productid });
    }
  } catch (err) {
 
  }
});

module.exports = router;
