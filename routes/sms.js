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
      to: '+92' + phone,
    })
    .then(function (res) {
      console.log(res.status);
    })
    .catch(function (err) {
      console.log(err);
    });
}

const phoneNumber = function (user) {
  return '+' + user.mobileNum;
};
module.exports.sendSms = sendSms;
