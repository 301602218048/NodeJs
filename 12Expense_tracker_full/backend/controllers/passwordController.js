const User = require("../models/user");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const sendResetLink = async (req, res) => {
  try {
    const { email } = req.body;
    sgMail.setApiKey(process.env.SENDGRID_KEY);

    const msg = {
      to: email,
      from: "abhinav.sharma29032000@gmail.com",
      subject: "Reset Password Link",
      text: "Click on the link to reset your password.",
      html: "<strong>Click on the link to reset your password.</strong>",
    };
    const res = await sgMail.send(msg);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendResetLink,
};
