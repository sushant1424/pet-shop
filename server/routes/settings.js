const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all settings
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT key, value FROM app_settings');
    const settings = {};
    rows.forEach(row => {
      settings[row.key] = row.value;
    });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a specific setting
router.put('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const value = req.body; // Expect JSON body
    
    await db.query(
      `INSERT INTO app_settings (key, value) VALUES ($1, $2) 
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
      [key, value]
    );
    res.json({ message: 'Setting updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
