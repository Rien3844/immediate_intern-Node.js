const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//회원가입 경로 설정(/signup)
router.post('/signup', authController.signup);

module.exports = router;
