require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UsersModel = require("../models/registration");

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isStrongPassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  return passwordRegex.test(password);
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  if (username.length < 3) {
    return res
      .status(400)
      .json({ error: "Username must contain at least three characters" });
  }
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }
  if (!isStrongPassword(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }

  const userExists = await UsersModel.findOne({ username });
  if (userExists) {
    return res.status(400).json({
      error: "Username already taken",
    });
  }

  const emailExists = await UsersModel.findOne({ email });
  if (emailExists) {
    return res.status(400).json({
      error: "Email already registered",
    });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await UsersModel.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    return res.status(200).json({ message: "Sign up successful" });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred during sign up" });
  }
};

exports.login = (req, res) => {
  const { email, username, password, id } = req.body;

  const token = jwt.sign(
    {
      id: id,
      username: username,
      password: password,
      email: email,
    },
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: "2d" }
  );
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({ message: "Login successful" });
};

exports.profile = (req, res) => {
  const user = req.body;
  return res.json(user);
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.json({ message: "Logout successful" });
};
