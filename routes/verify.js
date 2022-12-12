const express = require("express");
const User = require("../model/User");
const { check, validationResult } = require("express-validator");
// using express routes
const router = express.Router();

// @route  POST api/verify
// @desc   verify user
// @access Public

router.post(
  "/",
  [
    check("email", "Please enter your valid email").isEmail(),
    check("code", "code is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    try {
      const { email, code } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.verified === true) {
        return res.status(400).json({ message: "User already verified" });
      }
      //check if match

      //   const isMatch = bcrypt.compare(code, user.code);
      const isMatch = compareCode(code, user.code);
      if (!isMatch) {
        return res.status(400).json({
          msg: "Invalid Code",
        });
      }
      await User.findOneAndUpdate(
        { email },
        { verified: true },
        {
          new: true,
        }
      );
      res.status(200).json({
        message: "Verification successful",
        success: true,
      });
    } catch (err) {
      return res.status(400).json({ message: err, status: "failed" });
    }
  }
);
const compareCode = (code, input) => {
  return code === input;
};
module.exports = router;
