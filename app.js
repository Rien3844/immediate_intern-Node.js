const express = require('express');
const app = express();
const authRoutes = require('./src/routes/auth.js');
const protectedRoutes = require('./src/routes/protected.js');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js');

require('dotenv').config();

//json파싱 및 api 라우팅 연결
app.use(express.json());
app.use(authRoutes);
app.use(protectedRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
