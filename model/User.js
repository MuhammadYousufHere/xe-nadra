const mongoose = require('mongoose');
// schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  foreName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  mobileOperater: {
    type: String,
    required: true,
  },
  mobileNum: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
