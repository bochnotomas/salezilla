const Item = require('../models/itemModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const createItem = asyncHandler(async (req, res) => {
  if (
    !req.body.itemname ||
    !req.body.description ||
    !req.file ||
    !req.file.filename
  ) {
    res.status(400);
    throw new Error('Please add all required fields!');
  }

  const { itemname, description } = req.body;
  const photo = req.file.filename;

  const item = await Item.create({
    itemname,
    description,
    photo,
    user: req.user.id,
  });

  if (item) {
    console.log(item);
    res.status(201).json({
      message: 'Item created.',
      data: item,
    });
  } else {
    res.status(400);
    throw new Error('Invalid item data!');
  }
});

const getItemsForUser = asyncHandler(async (req, res) => {
  const items = await Item.find({ user: req.user.id });

  res.status(200).json(items);
});

const getItemsData = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error('Item does not exist!');
  }

  const user = await User.findById(item.user);

  if (!user) {
    res.status(400);
    throw new Error('Item does not have a seller or account was deleted.');
  }

  const response = {
    item,
    user: {
      phonenumber: user.phonenumber,
      email: user.email,
    },
  };

  res.status(200).json(response);
});

const sellAnItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.body.id);

  console.log(item);
  console.log(req.user);

  if (!req.user._id.equals(item.user)) {
    res.status(400);
    throw new Error('This item does not belong to this user!');
  }

  const updatedItem = await Item.findByIdAndUpdate(req.body.id, {
    isSold: !item.isSold,
  });

  res.status(200).json(updatedItem);
});

const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find();

  res.status(200).json(items);
});

module.exports = {
  createItem,
  getItemsForUser,
  getItems,
  getItemsData,
  sellAnItem,
};
