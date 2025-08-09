const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:4000', // your Vite dev URL (change if needed)
  credentials: true
}));

// routes
app.use('/api/auth', authRoutes);



// db connect + start
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log('Server on', PORT));
  })
  .catch(err => {
    console.error('DB connection error:', err.message);
    process.exit(1);
  });
