const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Add favorite
router.post('/', auth, async (req, res) => {
  try {
    const { product_id } = req.body;
    await db.query(
      'INSERT INTO favorites (user_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [req.user.id, product_id]
    );
    res.status(201).json({ message: 'Added to favorites' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get favorites
router.get('/', auth, async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT f.id as favorite_id, p.* 
       FROM favorites f 
       JOIN products p ON f.product_id = p.id 
       WHERE f.user_id = $1`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove favorite (by product_id or favorite_id, let's use product_id for frontend simplicity)
router.delete('/:product_id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM favorites WHERE product_id = $1 AND user_id = $2', [req.params.product_id, req.user.id]);
    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
