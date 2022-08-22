const express = require('express');
const dotenv = require('dotenv').config();
const { connectDB } = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const { urlencoded } = require('express');
const port = process.env.PORT || 5000;

//db connection
connectDB();

//initial setup and middlewares for json and url encoded forms
const app = express();
app.use(express.json());
app.use(express.urlencoded());

//routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/', (req, res) => {
  res.status(200).json({ message: 'hello' });
});

//error middleware
app.use(errorHandler);

//server launch
app.listen(port, () => console.log(`Server listens on the port: ${port}`));
