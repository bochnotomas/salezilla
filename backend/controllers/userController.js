const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, email, phonenumber, password } = req.body;

  if (!username || !fullname || !email || !phonenumber || !password) {
    res.status(400);
    throw new Error('Please add all required fields!');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists!');
  }

  //has the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    fullname,
    email,
    phonenumber,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      token: generateToken(user.id),
      username,
      fullname,
      email,
      phonenumber,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data!');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please add all required fields!');
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      token: generateToken(user.id),
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      photo: user?.photo,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data!');
  }
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const getUsersName = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });

  if (user) {
    res.status(200).json({ username: user.username });
  } else {
    res.status(400);
    throw new Error('User does not exists!');
  }
});

const updateProfilePicture = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(400);
    throw new Error('User not authorized!');
  }

  if (!req.file || !req.file.filename) {
    res.status(400);
    throw new Error('Image was not found!');
  }

  const photo = req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { photo: photo },
    { new: true }
  );

  res.status(200).json(photo);
});

//gen a JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
  loginUser,
  registerUser,
  getMe,
  getUsersName,
  updateProfilePicture,
};
