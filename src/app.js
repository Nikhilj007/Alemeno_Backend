const express = require('express');
const app = express();
require('dotenv').config();

// Import routes
const customerRoutes = require('./routes/customerRoutes');
const loanRoutes = require('./routes/loanRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Credit Approval System API');
});
app.use('/api/customers', customerRoutes);
app.use('/api/loans', loanRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;