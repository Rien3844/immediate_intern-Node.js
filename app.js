const express = require('express');
const app = express();
const authRoutes = require('./src/routes/auth');
require('dotenv').config();

//json파싱 및 api 라우팅 연결
app.use(express.json());
app.use(authRoutes);

module.exports = app;
