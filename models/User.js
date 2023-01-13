const mongoose = require('mongoose');
const nodemon = require('nodemon');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    loginAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
    logoutAt: {
      type: Date,
      default: Date.now,
    },
    loginDuration: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = user = mongoose.model('user', UserSchema);
