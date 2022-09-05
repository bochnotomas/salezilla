const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
  {
    itemname: {
      type: String,
      required: [true, 'Please add an item name.'],
    },
    description: {
      type: String,
      required: [true, 'Please add an item description.'],
    },
    photo: {
      type: String,
      required: [true, 'Please add a photo of an item.'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isSold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
