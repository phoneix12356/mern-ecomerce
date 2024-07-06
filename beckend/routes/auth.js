const express = require("express");
const {
  authenticationMiddleware,
  authenticateToken,
} = require("../middleware/middleware");
const router = express.Router();
const authController = require("../controller/auth");

const cookieParser = require("cookie-parser");

express().use(cookieParser());


router.post("/api/signup", authController.signup);
router.post("/api/login", authenticationMiddleware, authController.login);
router.get("/api/profile", authenticateToken, authController.profile);
router.get("/api/logout", authenticateToken, authController.logout);

module.exports = router;
