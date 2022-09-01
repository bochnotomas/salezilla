const Item = require('../models/itemModel');
const asyncHandler = require('express-async-handler');

const createItem = asyncHandler(async (req, res) => {
  if (!req.body.itemname || !req.body.description || !req.file.filename) {
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

const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find();

  res.status(200).json(items);
});

module.exports = {
  createItem,
  getItemsForUser,
  getItems,
};
