const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Appointment = require("../model/Appointment");
const auth = require("../middleware/auth");

// @route  POST api/appointment
// @desc   Register pre appointment
// @access PRIVATE

router.post(
  "/",
  auth,
  [check("cnic", "cnic is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // send back bad response json
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // should setup middleware first
    const { cnic, verifyFor } = req.body;

    try {
      // see if client exists
      let appointment = await Appointment.findOne({ cnic });
      const orignalDate =
        appointment?.submitted_at?.getDate() +
        "-" +
        appointment?.submitted_at?.getMonth();
      if (!appointment) {
        return res.status(404).json({
          msg: "Appointment doesn't exists, Please register first",
          msgStatus: 404,
        });
      }
      if (orignalDate !== verifyFor) {
        return res.status(404).json({
          msg: "Appointment doesn't exists for this day",
          msgStatus: 404,
        });
      }

      res.status(200).json({
        payload: appointment,
        msg: "Appointment verified successfully",
        msgStatus: 200,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({
        msg: "Server Error",
        msgStatus: 500,
      });
    }
  }
);

module.exports = router;
