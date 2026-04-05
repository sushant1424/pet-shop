const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');

const authRoutes     = require('./routes/auth');
const productRoutes  = require('./routes/products');
const orderRoutes    = require('./routes/orders');
const favoriteRoutes = require('./routes/favorites');
const userRoutes     = require('./routes/users');
const settingsRoutes = require('./routes/settings');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/auth',     authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders',   orderRoutes);
app.use('/api/favorites',favoriteRoutes);
app.use('/api/users',    userRoutes);
app.use('/api/settings', settingsRoutes);

/**
 * Ensure the app_settings table exists on startup.
 * This is a lightweight migration so the deployed DB never errors
 * even if schema.sql was not run manually after the table was added.
 */
async function initDb() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS app_settings (
        key   VARCHAR(255) PRIMARY KEY,
        value JSONB NOT NULL
      )
    `);
    console.log('DB ready: app_settings table ensured.');
  } catch (err) {
    console.error('DB init error:', err.message);
  }
}

const PORT = process.env.PORT || 5000;
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
