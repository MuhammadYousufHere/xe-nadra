const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();

const accountSid = process.env.ACCOUNT_SID;

const authToken = process.env.AUTH_TOKEN;
const phonenumber = process.env.PHONE_NUMBER;
const messagingServiceSid = process.env.MESSAGING_SERVICE_SID;

function sendSms(phone, message) {
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: message,
      from: phonenumber,
      to: "+92" + phone,
    })
    .then(function (res) {
      console.log(res.body);
    })
    .catch(function (err) {
      console.log(err);
    });
}
// Create user endpoint
router.post("/", (req, res) => {
  const { email, password, mobileNum, foreName, surname } = req.body;
  console.log(req.body);
  const user = {
    email,
    password,
    mobileNum,
  };

  const welcomeMessage = `Dear ${foreName} ${surname},
    Your VERIFICATION-PIN code generated is: 5933

    Please click the following link to continue with your Registration.
    Continue registration.

    Please note that this is an auto generated email. Please do not reply to this email.

    Regards,
    
    PAK Identity Team,
    NADRA
  `;

  try {
    sendSms(user.mobileNum, welcomeMessage);
    res.status(201).send({
      message:
        "Account created successfully, kindly check your phone to activate your account!",
      data: user,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});
const phoneNumber = function (user) {
  return "+" + user.mobileNum;
};
module.exports = router;
