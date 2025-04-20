const bcrypt = require('bcrypt');
const userModel = require('../models/user');

exports.signup = async (req, res) => {
    const { username, password, nickname } = req.body;
    const existingUser = userModel.findByUsername(username);

    //이미 가입된 사용자일 경우 400 에러와 메시지 반환
    if (existingUser) {
        return res.status(400).json({
            error: {
                code: "USER_ALREADY_EXISTS",
                message: "이미 가입된 사용자입니다."
            }
        });
    }

    //bcrypt사용. 비밀번호 해시 처리 및 저장
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword, nickname };
    userModel.addUser(newUser);

    //비밀번호를 제외한 회원가입 완료 사용자 정보 반환
    return res.status(201).json({
        username: newUser.username,
        nickname: newUser.nickname,
    });
};