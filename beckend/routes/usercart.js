const express = require("express");
const { authenticateToken } = require("../middleware/middleware");
const router = express.Router();
const {
  getUserCart,
  updateUserCart,
  addToUserCart,
  deleteFromUserCart,
} = require("../controller/usercart");

router.get("/api/user", authenticateToken, getUserCart);

router.patch("/api/user", authenticateToken, updateUserCart);

router.post("/api/user", authenticateToken, addToUserCart);

router.delete("/api/user", authenticateToken, deleteFromUserCart);

module.exports = router;
