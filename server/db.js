const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ...(isProduction && { ssl: { rejectUnauthorized: false } })
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
