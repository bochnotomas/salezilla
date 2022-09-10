const Item = require('../models/itemModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const createItem = asyncHandler(async (req, res) => {
  if (
    !req.body.itemname ||
    !req.body.description ||
    !req.body.price ||
    !req.body.category ||
    !req.body.brand ||
    !req.file ||
    !req.file.filename
  ) {
    res.status(400);
    throw new Error('Please add all required fields!');
  }

  const { itemname, description, price, brand, category } = req.body;
  const photo = req.file.filename;

  const item = await Item.create({
    itemname,
    description,
    photo,
    price,
    brand,
    category,
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
  const { category, brand } = req.query;
  if (category && !brand) {
    const items = await Item.find({ category });
    res.status(200).json(items);
  } else if (brand && !category) {
    const items = await Item.find({ brand });
    res.status(200).json(items);
  } else if (brand && category) {
    const items = await Item.find({ brand, category });
    res.status(200).json(items);
  } else {
    const items = await Item.find();
    res.status(200).json(items);
  }
});

module.exports = {
  createItem,
  getItemsForUser,
  getItems,
  getItemsData,
  sellAnItem,
};
