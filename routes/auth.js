const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const User = require("../model/User");
const { check, validationResult } = require("express-validator");
// using express routes
const router = express.Router();

// @route  GET api/auth
// @desc   Test route
// @access Public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error :(");
  }
});

//

// @route  POST api/auth
// @desc   Authenticate user and get token
// @access Public

router.post(
  "/",
  [
    check("email", "Please enter your valid email").isEmail(),
    check("password", "Password is required").exists(),
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
    const { email, password } = req.body;

    try {
      // see if client exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          msg: "Invalid Credentials",
        });
      }
      //CHECK IF varified
      if (!user.verified) {
        return res.status(400).json({
          msg: "Please verify your email address",
        });
      }
      //check if match

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          msg: "Invalid Credentials",
        });
      }

      // return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
        },
      };
      jsonwebtoken.sign(
        payload,
        process.env.JWT_SECRET,
        // optional but recommended
        { expiresIn: "30d" },
        (error, token) => {
          if (error) throw error;
          // can also send somerhing else like user id
          res.json({
            token,
            foreName: user.foreName,
            surname: user.surname,
            email: user.email,
            isAuthenticated: user.verified,
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
