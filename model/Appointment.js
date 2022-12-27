const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNum: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  licenceType: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  counter: {
    type: String,
    required: true,
  },
  tokenNo: {
    type: Number,
    required: true,
  },
  dealingTime: {
    type: String,
    required: true,
  },
  submitted_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
