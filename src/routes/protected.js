//테스트용 보호 라우트
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');

router.get('/protected', authMiddleware, (req, res) => {
    return res.json({
        message: `환영합니다, ${req.user.username}님!`,
    });
});

module.exports = router;
