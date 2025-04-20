/**
 * @swagger
 * /signup:
 *   post:
 *     summary: 회원가입
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               nickname:
 *                 type: string
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             example:
 *               token: "abcd1234"
 *       400:
 *         description: 에러
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: "INVALID_CREDENTIALS"
 *                 message: "아이디 또는 비밀번호가 올바르지 않습니다."
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
 *       400:
 *         description: 로그인 실패
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: "INVALID_CREDENTIALS"
 *                 message: "아이디 또는 비밀번호가 올바르지 않습니다."
 */

/**
 * @swagger
 * components:
 *   responses:
 *     TokenExpiredError:
 *       description: 토큰이 만료됨
 *       content:
 *         application/json:
 *           example:
 *             error:
 *               code: "TOKEN_EXPIRED"
 *               message: "토큰이 만료되었습니다."

 *     TokenNotFoundError:
 *       description: 토큰이 없음
 *       content:
 *         application/json:
 *           example:
 *             error:
 *               code: "TOKEN_NOT_FOUND"
 *               message: "토큰이 없습니다."

 *     InvalidTokenError:
 *       description: 토큰이 유효하지 않음
 *       content:
 *         application/json:
 *           example:
 *             error:
 *               code: "INVALID_TOKEN"
 *               message: "토큰이 유효하지 않습니다."
 */
