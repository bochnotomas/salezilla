const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

const {
  createItem,
  getItemsForUser,
} = require('../controllers/itemController');

router.get('/getItemsForUser', protect, getItemsForUser);
router.post('/', protect, upload.single('photo'), createItem);

module.exports = router;
