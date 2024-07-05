require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { ConnectionToDatabase } = require("./connections/connection");
const path = require("path");

const AuthRoute = require("./routes/auth");
const DataRoute = require("./routes/data");
const CartRoute = require("./routes/usercart");
const OrderRoute = require("./routes/order");
const cookieParser = require("cookie-parser");
const passport = require("passport");

ConnectionToDatabase(
  "mongodb+srv://kartikayagarwal41:0Bp4WKHFUJ2EiK9z@cluster0.6lulj6j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));

app.use("/assests", express.static(path.join(__dirname, "assests")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/", AuthRoute);
app.use("/data", DataRoute);
app.use("/cart", CartRoute);
app.use("/orders", OrderRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`server is woriking at port ${process.env.PORT}`);
});
