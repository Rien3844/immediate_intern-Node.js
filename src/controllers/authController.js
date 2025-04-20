const bcrypt = require('bcrypt');
const userModel = require('../models/user');

exports.signup = async (req, res) => {
    const { username, password, nickname } = req.body;
    const existingUser = userModel.findByUsername(username);

    if (existingUser) {
        return res.status(400).json({
            error: {
                code: "USER_ALREADY_EXISTS",
                message: "이미 가입된 사용자입니다."
            }
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword, nickname };
    userModel.addUser(newUser);

    return res.status(201).json({
        username: newUser.username,
        nickname: newUser.nickname,
    });
};