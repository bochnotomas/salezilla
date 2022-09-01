const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const {
  loginUser,
  registerUser,
  getMe,
  getUsersName,
} = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/getme', protect, getMe);
router.get('/:id', getUsersName);

module.exports = router;
