const express = require('express');
require('dotenv').config(`${__dirname}\\.env`);
const morgan = require('morgan');
const cors = require('cors');

// Server
const app = express();

// Cors
app.use(cors());

// Public
app.use(express.static('public'));

// Content-type
app.use(express.json());

// Middleware
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/operations', require('./src/routes/operations'));

// Port listening
app.listen(process.env.PORT, () => {
	console.log(`Listening http://localhost:${process.env.PORT}`);
});
