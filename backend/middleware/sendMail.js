const nodeMailer = require("nodemailer");
const generator = require("generate-password");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const password = generator.generate({
  length: 10,
  numbers: true,
});

const html = `<p>Your new password is: <strong>${password}</strong></p>`;

const sendMail = async (mailID, id) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL_ID,
      to: mailID,
      subject: "New Password Generated",
      html: html,
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(id, {
      password: hashedPassword,
    });
    if (updatedUser) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
