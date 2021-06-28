const express = require('express');
const app = express();
const userRoutes = require("./routes/usersRoutes.routes")

app.use(userRoutes);

module.exports = app;