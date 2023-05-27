const bcrypt = require("bcryptjs");
const asynchandler = require("express-async-handler");
const { generateToken } = require("./generateToken");
const User = require("../../models/user");

// @desc    Login
// @router  POST /api/user/login
// @access  Public
const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check for user email & password
  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({
      _id: user.id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

module.exports = loginUser;
