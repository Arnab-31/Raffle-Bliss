const express = require('express')
const userRoutes = require('./routes/userRouter');
const eventRoutes = require('./routes/eventRouter');

const app = express();

app.use(express.json());

app.use(eventRoutes);
app.use(userRoutes);

module.exports = app;