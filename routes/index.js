const router = require('express').Router();
const dotenv = require('dotenv');
dotenv.config();

const accountSid = process.env.ACCOUNT_SID;

const authToken = process.env.AUTH_TOKEN;
const phonenumber = process.env.PHONE_NUMBER;

function sendSms(phone, message) {
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: message,
      from: phonenumber,
      to: phone,
    })
    .then((message) => console.log(message.sid));
}
// Create user endpoint
router.post('/', (req, res) => {
  const { email, password, mobileNum } = req.body;
  console.log(req.body);
  const user = {
    email,
    password,
    mobileNum,
  };

  const welcomeMessage = 'Your verification code is 54875';

  try {
    sendSms(user.mobileNum, welcomeMessage);
    res.status(200).send({
      message:
        'Account created successfully, kindly check your phone to activate your account!',
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

module.exports = router;
