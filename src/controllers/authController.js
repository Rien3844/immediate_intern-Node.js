const bcrypt = require('bcrypt');
const userModel = require('../models/user.js');
const jwt = require('jsonwebtoken');

//회원가입
exports.signup = async (req, res) => {
    const {username, password, nickname} = req.body;
    const existingUser = userModel.findByUsername(username);

    //이미 가입된 사용자일 경우 400 에러와 메시지 반환
    if(existingUser){
        return res.status(400).json({
            error: {
                code: "USER_ALREADY_EXISTS",
                message: "이미 가입된 사용자입니다."
            }
        });
    }

    //bcrypt사용. 비밀번호 해시 처리 및 저장
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {username, password: hashedPassword, nickname};
    userModel.addUser(newUser);

    //비밀번호를 제외한 회원가입 완료 사용자 정보 반환
    return res.status(201).json({
        username: newUser.username,
        nickname: newUser.nickname,
    });
};

//로그인
exports.login = async (req, res) => {
    const{username, password} = req.body;
    const user = userModel.findByUsername(username);
  
    if(!user){
        return res.status(401).json({
            error: {
            code: "INVALID_CREDENTIALS",
            message: "아이디 또는 비밀번호가 올바르지 않습니다."
            }
        });
    }

    //비밀번호와 해시처리된 비밀번호 비교.(불일치시 로그인 실패 처리)
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({
            error: {
            code: "INVALID_CREDENTIALS",
            message: "아이디 또는 비밀번호가 올바르지 않습니다."
            }
        });
    }
  
    //jwt 토큰 발급
    const token = jwt.sign(
        {username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );
  
    return res.status(200).json({token});
  };