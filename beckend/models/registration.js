const mongoose = require("mongoose");
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [isEmail, "please enter a valid"],
    },
    password: {
      type: String,
      required: [true, "passsword is required"],
      minlength: [6, "password should be atleast 6 of character"],
    },
  },
  { timestamps: true }
);
const UsersModel = mongoose.model("users", userSchema);
module.exports = UsersModel;
