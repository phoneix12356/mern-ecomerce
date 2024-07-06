const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { ConnectionToDatabase } = require("./connections/connection");

require("dotenv").config();


app.use((req, res, next) => {
  
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Middleware
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`${new Date().toISOString()} - Error:`, err);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
  
});

// Connect to Database and Start Server
ConnectionToDatabase(process.env.MONGODB_URL)
  .then(() => console.log(`${new Date().toISOString()} - Database connection successful`))
  .catch((err) => console.error(`${new Date().toISOString()} - Database connection error:`, err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`${new Date().toISOString()} - Server is running on port ${PORT}`);
});