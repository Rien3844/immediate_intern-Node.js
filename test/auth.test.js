const request = require('supertest');
const app = require('../app.js'); // app.js를 export해야 함

//회원가입 테스트
describe('회원가입 API', () => {
    it('정상적으로 회원가입이 된다.', async () => {
        const res = await request(app)
        .post('/signup')
        .send({
            username: 'testUser',
            password: '12345678',
            nickname: 'tester',
        });
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('username', 'testUser');
        expect(res.body).toHaveProperty('nickname', 'tester');
    });

    it('이미 존재하는 유저는 가입이 안된다.', async () => {
        await request(app).post('/signup').send({
            username: 'duplicateUser',
            password: 'pass1234',
            nickname: 'dup',
        });

        const res = await request(app).post('/signup').send({
            username: 'duplicateUser',
            password: 'pass1234',
            nickname: 'dup',
        });
        
        expect(res.statusCode).toBe(400);
        expect(res.body.error.code).toBe('USER_ALREADY_EXISTS');
    });
});

//로그인 테스트
describe('로그인 API', () => {
    it('정상 로그인 시 토큰을 반환한다.', async () => {
        await request(app).post('/signup').send({
            username: 'loginUser',
            password: 'mypassword',
            nickname: 'logtester',
        });
  
        const res = await request(app).post('/login').send({
            username: 'loginUser',
            password: 'mypassword',
        });
  
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
  
    it('잘못된 로그인은 실패한다.', async () => {
        const res = await request(app).post('/login').send({
            username: 'nonexistent',
            password: 'wrongpass',
        });
  
        expect(res.statusCode).toBe(401);
        expect(res.body.error.code).toBe('INVALID_CREDENTIALS');
    });
});
  
//인증 관련 테스트
describe('JWT 인증 테스트', () => {
    it('토큰 없이 접근 시 에러가 발생한다.', async () => {
        const res = await request(app).get('/protected-route'); // 보호된 라우트 예시
  
        expect(res.statusCode).toBe(401);
        expect(res.body.error.code).toBe('TOKEN_NOT_FOUND');
    });
  
    it('만료된 토큰 사용 시 에러 발생', async () => {
        const expiredToken = 'yourExpiredTokenHere'; // 만료된 토큰 직접 넣거나 mock 처리
  
        const res = await request(app)
        .get('/protected-route')
        .set('Authorization', `Bearer ${expiredToken}`);
  
        expect(res.statusCode).toBe(401);
        expect(res.body.error.code).toBe('TOKEN_EXPIRED');
    });
});