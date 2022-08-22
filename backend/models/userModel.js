const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add an username.'],
    },
    fullname: {
      type: String,
      required: [true, 'Please add full name.'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email.'],
    },
    phonenumber: {
      type: String,
      required: [true, 'Please add an username.'],
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
