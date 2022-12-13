const express = require("express");
const User = require("../model/User");
const { setEmail } = require("./email");
const { check, validationResult } = require("express-validator");
// using express routes
const router = express.Router();

// @route  post api/forgotPassword
// @desc   Test route
// @access Public

//

router.post(
  "/",
  [check("email", "Please enter your valid email").isEmail()],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // send back bad response json
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // should setup middleware first
    const { email } = req.body;

    try {
      // see if client exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          msg: "Provided Email Address is Not Registered with PAK IDENTITY",
        });
      }
      //CHECK IF varified
      if (!user.verified) {
        return res.status(400).json({
          msg: "Please verify your email address first",
        });
      }
      const Message = `Dear ${user.foreName} ${user.surname},
    Please click the following link to reset your password.

    https://xe-nadra-herokuapp.com/resetpassword/${user._id}
    Please note that this is an auto generated text. Please do not reply to this.

    Regards,
    
    PAK Identity Team,
    NADRA
  `;
      const title = "Reset Your Password";
      setEmail(email, Message, title);

      res.json({
        msg: "Request launched. For further processing, please wait for email/sms",
        msgStatus: 200,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
