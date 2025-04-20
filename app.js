const express = require('express');
const app = express();
const authRoutes = require('./src/routes/auth.js');
const protectedRoutes = require('./src/routes/protected.js');

require('dotenv').config();

//json파싱 및 api 라우팅 연결
app.use(express.json());
app.use(authRoutes);
app.use(protectedRoutes);

module.exports = app;
