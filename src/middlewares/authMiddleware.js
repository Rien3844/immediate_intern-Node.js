//인증 미들웨어
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            error: {
                code: "TOKEN_NOT_FOUND",
                message: "토큰이 없습니다."
            }
        });
    }

    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({
            error: {
                code: "TOKEN_NOT_FOUND",
                message: "토큰이 없습니다."
            }
        });
    }

    try{
        //토큰 복호화 진행
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // 인증 성공, 다음 핸들러로 이동
    }catch(err){
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: {
                    code: "TOKEN_EXPIRED",
                    message: "토큰이 만료되었습니다."
                }
            });
        }

        return res.status(401).json({
            error: {
                code: "INVALID_TOKEN",
                message: "토큰이 유효하지 않습니다."
            }
        });
    }
};
