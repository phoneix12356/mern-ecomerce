const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/middleware");
const { createOrder, getOrders } = require("../controller/order");

router.post("/api/order", authenticateToken, createOrder);

router.get("/api/order", authenticateToken, getOrders);

module.exports = router;