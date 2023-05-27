const jwt = require("jsonwebtoken");

// @desc    Generate JWT
// @access  Private
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { generateToken };
