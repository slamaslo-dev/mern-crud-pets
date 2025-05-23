// Load Environment Variables
const dotenv = require('dotenv');
dotenv.config();

// Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const petRouter = require('./controllers/pets.js');
const testJwtRouter = require('./controllers/test-jwt');
const authRouter = require('./controllers/auth');
const userRouter = require('./controllers/users.js')

// Initialize App
const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
// app.use(cors());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/pets', petRouter);
app.use('/auth', authRouter);
app.use('/test', testJwtRouter);
app.use('/users', userRouter);


// Start Server
app.listen(PORT, () => {
  console.log('The express app is ready!');
});
