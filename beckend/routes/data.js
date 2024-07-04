const express = require("express");
const data = require("../assests/data");
const router = express.Router();
router.get("/api/products", (req, res) => {
  setTimeout(() => {
    return res.json(data);
  }, 500);
});

module.exports = router;
