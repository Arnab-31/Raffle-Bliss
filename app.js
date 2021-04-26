const express = require('express')
const userRoutes = require('./routes/userRouter');
const eventRoutes = require('./routes/eventRouter');

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(eventRoutes);

module.exports = app;