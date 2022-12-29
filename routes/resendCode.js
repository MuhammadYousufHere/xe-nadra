const { Router } = require("express");
const User = require("../model/User");
const router = Router();
const { setEmail } = require("./email");
const { sendSms } = require("./sms");
//check if the user varified
// check if user exists
router.post("/", async function (req, res) {
  const { email } = req.body;
  try {
    // see if client exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User Does not exists, Please try again with another email.",
      });
    }
    if (user.verified === true) {
      return res.status(400).json({ msg: "User already verified" });
    }
    const CODE = Math.floor(100000 + Math.random() * 900000);

    await User.findOneAndUpdate(
      { email },
      { code: CODE },
      {
        new: true,
      }
    );
    const Message = `Dear ${user.foreName} ${user.surname},
    Your VERIFICATION-PIN code generated is: ${CODE}

    Please click the following link to continue with your Registration.
    Continue registration.

    https://xe-nadra-herokuapp.com/verifyuser/${user.id}
    Please note that this is an auto generated text. Please do not reply to this.

    Regards,
    
    PAK Identity Team,
    NADRA
  `;
    const title = "Verification Code";
    //comment out the following line to stop sending sms
    // sendSms(user.mobileNum, Message);
    setEmail(email, Message, title);

    return res.status(200).json({
      msg: "Verification code sent",
      msgStatus: 200,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, msgStatus: 500 });
  }
});

module.exports = router;
