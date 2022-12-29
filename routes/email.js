const nodemailer = require("nodemailer");
require("dotenv").config();
let mailerConfig = {
  host: "smtp.gmail.com",
  secureConnection: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
};

const sendEmail = (config) =>
  new Promise((res, rej) => {
    let transporter = nodemailer.createTransport(mailerConfig);
    transporter.sendMail(config, function (error) {
      if (error) {
        rej(error);
        console.log("error:", error);
      } else {
        res("Sent");
        console.log("good");
      }
    });
  });

const params = (email, text, title) => ({
  from: mailerConfig.auth.user,
  to: email,
  subject: title,
  html: text,
});

const setEmail = (
  emailTo,
  message = template(),
  title = "Thank You For Your Donation!"
) =>
  new Promise(async (res, rej) => {
    try {
      const config = params(emailTo, message, title);
      await sendEmail(config);
    } catch (error) {
      console.log("🚀 ~ file: email.js ~ line 36 ~ setEmail ~ error", error);
    }
  });

module.exports.setEmail = setEmail;
