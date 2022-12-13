const express = require('express');
const User = require('../model/User');
const bycrypt = require('bcryptjs');
const { setEmail } = require('./email');
const { check, validationResult } = require('express-validator');
// using express routes
const router = express.Router();

// @route  POST api/verify
// @desc   verify user
// @access Public

router.post(
  '/',
  [
    check('email', 'Please enter your valid email').isEmail(),
    check('password', 'password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      const isMatch = bycrypt.compareSync(password, user.password);
      if (isMatch) {
        return res.status(400).json({
          message:
            'Password can not be old passowrd, Please try again with another password.',
        });
      }
      //Encrypt password
      const salt = await bycrypt.genSalt(10);

      password = await bycrypt.hash(password, salt);
      await User.findOneAndUpdate(
        { email },
        { password },
        {
          new: true,
        }
      );

      res.status(200).json({
        message: 'Password chaneged successfully',
        success: true,
      });
      const messgae = `Your password has been changed successfully.`;
      setEmail(email, messgae, 'Password Changed');
    } catch (err) {
      return res.status(400).json({ message: err, status: 'failed' });
    }
  }
);

module.exports = router;
