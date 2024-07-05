const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { ConnectionToDatabase } = require("./connections/connection");

require("dotenv").config();

// Middleware
app.use(cors({
  origin: 'https://your-frontend-url.https://mern-ecomerce-33cc-5fsf02016-kartikay-agarwals-projects.vercel.app/', // Replace with your actual frontend URL
  credentials: true
}));
app.use("/assests", express.static(path.join(__dirname, "assests")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// Routes
const AuthRoute = require("./routes/auth");
const DataRoute = require("./routes/data");
const CartRoute = require("./routes/usercart");
const OrderRoute = require("./routes/order");

app.use("/", AuthRoute);
app.use("/data", DataRoute);
app.use("/cart", CartRoute);
app.use("/orders", OrderRoute);

// Connect to Database and Start Server
ConnectionToDatabase(process.env.MONGODB_URL)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is working at port ${PORT}`);
});
