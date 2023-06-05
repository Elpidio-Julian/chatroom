const { Pool } = require('pg');
// remember to open and close connections on queries when using pool
const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/chat-storage';

const client = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;