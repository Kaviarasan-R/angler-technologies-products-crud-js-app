const asynchandler = require("express-async-handler");
const sendMail = require("../../middleware/sendMail");
const User = require("../../models/user");

// @desc    Forgot Password
// @router  POST /api/user/forgot-password
// @access  Public
const forgotPassword = asynchandler(async (req, res) => {
  const mailID = req.query.mail;
  const user = await User.findOne({ email: mailID });
  if (!user) {
    res.status(400);
    throw new Error(
      "We couldn't find a matching email address in our database."
    );
  }
  try {
    const result = await sendMail(mailID, user._id);
    if (result) {
      res.status(200).json({
        message: "Successfully password updated",
      });
    } else {
      res.status(400);
      throw new Error("Unable to update password");
    }
  } catch (error) {
    throw new Error("Unable to send mail");
  }
});

module.exports = forgotPassword;
