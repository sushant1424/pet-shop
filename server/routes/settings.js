const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * Ensure the app_settings table exists.
 * Called once on first request so it works even if the deployed DB
 * was created without running schema.sql manually.
 */
let tableReady = false;
async function ensureTable() {
  if (tableReady) return;
  await db.query(`
    CREATE TABLE IF NOT EXISTS app_settings (
      key   VARCHAR(255) PRIMARY KEY,
      value JSONB NOT NULL
    )
  `);
  tableReady = true;
}

// GET /api/settings  — return all CMS settings as a flat object
router.get('/', async (req, res) => {
  try {
    await ensureTable();
    const { rows } = await db.query('SELECT key, value FROM app_settings');
    const settings = {};
    rows.forEach(row => {
      // pg auto-parses JSONB → JS object; just assign it directly
      settings[row.key] = row.value;
    });
    res.json(settings);
  } catch (err) {
    console.error('GET /settings error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/settings/:key  — upsert a single CMS setting
router.put('/:key', async (req, res) => {
  try {
    await ensureTable();
    const { key } = req.params;
    const value = req.body; // JSON body parsed by express.json()

    // Explicitly stringify so pg stores it as valid JSONB regardless of driver version
    await db.query(
      `INSERT INTO app_settings (key, value)
       VALUES ($1, $2::jsonb)
       ON CONFLICT (key)
       DO UPDATE SET value = EXCLUDED.value`,
      [key, JSON.stringify(value)]
    );
    res.json({ message: 'Setting updated successfully' });
  } catch (err) {
    console.error(`PUT /settings/${req.params.key} error:`, err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
