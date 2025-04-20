//테스트용 보호 라우트
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');

//authMiddleware 통과했을때만 해당 라우트 접근 가능.
router.get('/protected', authMiddleware, (req, res) => {
    return res.json({
        message: `환영합니다, ${req.user.username}님!`,
    });
});

module.exports = router;
