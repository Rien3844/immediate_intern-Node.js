const swaggerJSDoc = require('swagger-jsdoc');

// 문서 상단의 기본 정보 정의
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'JWT Auth API',
            version: '1.0.0',
            description: '회원가입, 로그인, 인증 API 문서',
        },
        servers: [
            {
                url: 'http://0.0.0.0:3000',
            },
        ],
    },
    apis: ['./src/swagger/*.js'], // API 주석을 포함할 파일 경로
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
