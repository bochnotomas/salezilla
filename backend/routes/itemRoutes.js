const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

const {
  createItem,
  getItemsForUser,
  getItems,
  getItemsData,
} = require('../controllers/itemController');

router.get('/getItemsForUser', protect, getItemsForUser);
router.get('/:id', getItemsData);
router
  .route('/')
  .get(getItems)
  .post(protect, upload.single('photo'), createItem);

module.exports = router;
