const express = require("express");
const data = require("../assests/data");
const router = express.Router();
router.get("/api/products", (req, res) => {
  console.log("New Request ", req);
  return res.json(data);
});

module.exports = router;
