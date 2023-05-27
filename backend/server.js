/* Import libraries */
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");

/* Import middlewares */
const errorHandler = require("./middleware/errorHandler");

/* Import routes */
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

/* Port configuration */
const port = process.env.PORT || 8080;

/* Express Initialization */
const app = express();

/* DB Connection */
connectDB();

/* Cross origin resource sharing */
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

/* Usage of middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Routes */
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

/* Custom error handling middleware */
app.use(errorHandler);

/* Server Configuration */
app.listen(port, () => console.log(`Server started on port ${port}`));
