const express = require('express');
const app = express();
const authRoutes = require('./src/routes/auth');
require('dotenv').config();

app.use(express.json());
app.use(authRoutes);

module.exports = app;
