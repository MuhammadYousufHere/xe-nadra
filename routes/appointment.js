const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Appointment = require("../model/Appointment");
const auth = require("../middleware/auth");
const { sendSms } = require("./sms");

// @route  POST api/appointment
// @desc   Register pre appointment
// @access PRIVATE

router.post(
  "/",
  auth,
  [
    check("name", "name is required").not().isEmpty(),
    check("mobileNum", "mobile number is required").not().isEmpty(),
    check("cnic", "cnic is required").not().isEmpty(),
    check("branch", "branch is required").not().isEmpty(),
    check("licenceType", "licence type is required").not().isEmpty(),
    check("timeSlot", "time slot is required").not().isEmpty(),
    check("counter", "counter is required").not().isEmpty(),
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
      name,
      mobileNum,
      cnic,
      branch,
      licenceType,
      timeSlot,
      counter,
      dealingTime,
    } = req.body;

    try {
      // see if client exists
      let appointment = await Appointment.findOne({ cnic });
      const orignalDate =
        appointment?.submitted_at?.getDate() +
        "-" +
        appointment?.submitted_at?.getMonth();
      let currentDate = new Date();
      currentDate = currentDate.getDate() + "-" + currentDate.getMonth();
      if (orignalDate === currentDate) {
        return res.status(400).json({
          msg: "Appointment already exists, Can not register again for same day",
          msgStatus: 400,
        });
      }

      // gives 3 digit random number
      const TOKEN = Math.floor(Math.random() * (999 - 100 + 1) + 100);
      appointment = new Appointment({
        name,
        mobileNum,
        cnic,
        branch,
        licenceType,
        timeSlot,
        counter,
        dealingTime,
        tokenNo: TOKEN,
      });
      const message = `Your appointment has been registered successfully. Your token number is ${TOKEN}. Please visit the counter on time.`;
      await appointment.save();
      sendSms(mobileNum, message);

      res.status(200).json({
        msg: "Appointment has been registered successfully",
        msgStatus: 200,
        payload: {
          tokenNo: TOKEN,
          cnic,
          name,
          counter,
          timeSlot,
          licenceType,
          dealingTime,
          branch,
        },
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
