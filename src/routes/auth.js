const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

//회원가입 경로 설정(/signup)
router.post('/signup', authController.signup);

//로그인 경로 설정(/login)
router.post('/login', authController.login);

module.exports = router;
