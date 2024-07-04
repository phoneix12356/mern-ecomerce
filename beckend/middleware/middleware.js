const UsersModel = require("../models/registration");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authenticateToken = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, {}, (err, user) => {
      if (err) throw err;
      req.body.id = user.id;
      req.body.username = user.username;
      req.body.email = user.email;
      req.body.password = user.password;
      next();
    });
  } else res.status(400).json(null);
};

const authenticationMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const user = await UsersModel.findOne({ email });

  if (!user) {
    return res.status(400).send("User does not exist");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).send("Password is incorrect");
  }

  req.body.id = user._id;
  req.body.username = user.username;

  next();
};

module.exports = { authenticateToken, authenticationMiddleware };
