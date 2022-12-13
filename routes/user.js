const express = require('express');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');

const { setEmail } = require('./email');
const { sendSms } = require('./sms');
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const User = require('../model/User');
//

// using express routes
const router = express.Router();

// @route  POST api/user
// @desc   Register user
// @access Public

router.post(
  '/',
  [
    check('foreName', 'foreName is required').not().isEmpty(),
    check('surname', 'surname is required').not().isEmpty(),
    check('country', 'country is required').not().isEmpty(),
    check('mobileNum', 'mobile number is required').not().isEmpty(),
    check('mobileOperater', 'mobile operator is required').not().isEmpty(),
    check('email', 'Please enter your valid email').isEmail(),
    check(
      'password',
      'Password is not correct, it should be 6 or more characters long'
    ).isLength({ min: 6, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // send back bad response json
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // should setup middleware first
    const {
      foreName,
      surname,
      country,
      mobileOperater,
      mobileNum,
      email,
      password,
    } = req.body;

    try {
      // see if client exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          msg: 'User already exists, Please try again with another email.',
        });
      }
      const CODE = Math.floor(100000 + Math.random() * 900000);

      user = new User({
        foreName,
        surname,
        country,
        mobileOperater,
        mobileNum,
        email,
        password,
        code: CODE,
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
        },
      };
      //sms
      const Message = `Dear ${foreName} ${surname},
    Your VERIFICATION-PIN code generated is: ${CODE}

    Please click the following link to continue with your Registration.
    Continue registration.

    https://xe-nadra-herokuapp.com/verifyuser/${user.id}
    Please note that this is an auto generated text. Please do not reply to this.

    Regards,
    
    PAK Identity Team,
    NADRA
  `;
      const title = 'Verification Code';
      sendSms(mobileNum, Message);
      setEmail(email, Message, title);

      jsonwebtoken.sign(
        payload,
        config.get('jwtSecret') || process.env.JWT_SECRET,
        // optional but recommended, set it to 1hr in production build
        { expiresIn: 36000 },
        (error, token) => {
          if (error) throw error;
          // can also send something else like user id
          res.json({
            token,
            foreName: user.foreName,
            surname: user.surname,
            email: user.email,
            msg: 'User successfully created',
            status: 201,
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
