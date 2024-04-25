const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/credit_approval_system',
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Idle client timeout in milliseconds
});

async function connectToDatabase() {
  try {
    await pool.query('SELECT NOW()'); // Check if the connection is successful
    console.log('Connected to the database');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    throw err;
  }
}

module.exports = { pool, connectToDatabase };