const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const {
  loginUser,
  registerUser,
  getMe,
  getUsersName,
  updateProfilePicture,
} = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/getme', protect, getMe);
router.get('/:id', getUsersName);
router.post(
  '/updatepfp',
  protect,
  upload.single('photo'),
  updateProfilePicture
);

module.exports = router;
