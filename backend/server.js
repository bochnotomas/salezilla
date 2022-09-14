const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { connectDB } = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

//db connection
connectDB();

//initial setup and middlewares for json and url encoded forms
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

//routes
app.use('/api/users/', require('./routes/userRoutes'));
app.use('/api/items/', require('./routes/itemRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production.'));
}

//error middleware
app.use(errorHandler);

//server launch
app.listen(port, () => console.log(`Server listens on the port: ${port}`));
