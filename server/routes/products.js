const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Get best selling products
router.get('/bestsellers', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM products WHERE sold > 0 ORDER BY sold DESC LIMIT 5');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get new arrivals
router.get('/new', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM products ORDER BY created_at DESC LIMIT 4');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { category, pet_type, search, min_price, max_price } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    let values = [];
    let count = 1;

    if (category) {
      query += ` AND category = $${count++}`;
      values.push(category);
    }
    if (pet_type) {
      query += ` AND pet_type = $${count++}`;
      values.push(pet_type);
    }
    if (search) {
      query += ` AND name ILIKE $${count++}`;
      values.push(`%${search}%`);
    }
    if (min_price) {
      query += ` AND price >= $${count++}`;
      values.push(min_price);
    }
    if (max_price) {
      query += ` AND price <= $${count++}`;
      values.push(max_price);
    }

    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin add product with external image URL (JSON body)
router.post('/with-url', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  try {
    const { name, description, price, category, pet_type, image_url, stock } = req.body;
    const { rows } = await db.query(
      'INSERT INTO products (name, description, price, category, pet_type, image_url, stock, sold) VALUES ($1, $2, $3, $4, $5, $6, $7, 0) RETURNING *',
      [name, description, price, category, pet_type, image_url || null, stock !== undefined ? stock : 100]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin add product (with file upload)
router.post('/', auth, upload.single('image'), async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  
  try {
    const { name, description, price, category, pet_type, stock } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    
    const { rows } = await db.query(
      'INSERT INTO products (name, description, price, category, pet_type, image_url, stock, sold) VALUES ($1, $2, $3, $4, $5, $6, $7, 0) RETURNING *',
      [name, description, price, category, pet_type, image_url, stock !== undefined ? stock : 100]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin update product
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

  try {
    const { name, description, price, category, pet_type, stock } = req.body;
    let image_url = null;
    
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
      await db.query(
        'UPDATE products SET name=$1, description=$2, price=$3, category=$4, pet_type=$5, image_url=$6, stock=COALESCE($7, stock) WHERE id=$8',
        [name, description, price, category, pet_type, image_url, stock, req.params.id]
      );
    } else {
      await db.query(
        'UPDATE products SET name=$1, description=$2, price=$3, category=$4, pet_type=$5, stock=COALESCE($6, stock) WHERE id=$7',
        [name, description, price, category, pet_type, stock, req.params.id]
      );
    }
    
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin delete product
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  
  try {
    await db.query('DELETE FROM products WHERE id = $1', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
