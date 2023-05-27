const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/users/register");
const loginUser = require("../controllers/users/login");
const forgotPassword = require("../controllers/users/forgotPassword");

router
  .post("/login", loginUser)
  .post("/register", registerUser)
  .post("/forgot-password", forgotPassword);

module.exports = router;
