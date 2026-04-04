const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

const VALID_STATUSES = ['pending', 'processing', 'deployed', 'completed', 'cancelled'];

// Create order — decrements stock only; sold is NOT touched (only incremented on completion)
router.post('/', auth, async (req, res) => {
  try {
    const { items, total_amount } = req.body;
    
    await db.query('BEGIN');
    
    const orderRes = await db.query(
      "INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, 'pending') RETURNING id",
      [req.user.id, total_amount]
    );
    const orderId = orderRes.rows[0].id;

    for (const item of items) {
      await db.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.product_id, item.quantity, item.price]
      );
      
      // Decrement stock only — sold incremented only when order is marked completed
      await db.query(
        'UPDATE products SET stock = GREATEST(stock - $1, 0) WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }

    await db.query('COMMIT');
    res.status(201).json({ message: 'Order created', orderId });
  } catch (err) {
    await db.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user orders (with product name for display)
router.get('/', auth, async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT o.*, 
        json_agg(json_build_object(
          'product_id', oi.product_id,
          'product_name', p.name,
          'image_url', p.image_url,
          'quantity', oi.quantity, 
          'price', oi.price
        )) as items 
       FROM orders o 
       LEFT JOIN order_items oi ON o.id = oi.order_id 
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.user_id = $1 
       GROUP BY o.id 
       ORDER BY o.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin get all orders
router.get('/all', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  
  try {
    const { rows } = await db.query(
      `SELECT o.*, u.name as user_name, u.email as user_email,
        COALESCE(
          json_agg(json_build_object(
            'product_id', oi.product_id,
            'product_name', p.name,
            'image_url', p.image_url,
            'quantity', oi.quantity, 
            'price', oi.price
          )) FILTER (WHERE oi.id IS NOT NULL), '[]'::json
        ) as items
       FROM orders o 
       JOIN users u ON o.user_id = u.id
       LEFT JOIN order_items oi ON o.id = oi.order_id 
       LEFT JOIN products p ON oi.product_id = p.id
       GROUP BY o.id, u.name, u.email
       ORDER BY o.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin update order status — increments sold on completion, decrements if moving away from completed
router.put('/:id/status', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  
  const { status } = req.body;
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    await db.query('BEGIN');

    // Get current status
    const current = await db.query('SELECT status FROM orders WHERE id = $1', [req.params.id]);
    if (current.rows.length === 0) {
      await db.query('ROLLBACK');
      return res.status(404).json({ error: 'Order not found' });
    }
    const prevStatus = current.rows[0].status;

    // Update the order status
    await db.query('UPDATE orders SET status = $1 WHERE id = $2', [status, req.params.id]);

    // Handle sold count transitions
    const itemsRes = await db.query('SELECT * FROM order_items WHERE order_id = $1', [req.params.id]);

    if (status === 'completed' && prevStatus !== 'completed') {
      // Increment sold for each item
      for (const item of itemsRes.rows) {
        await db.query(
          'UPDATE products SET sold = sold + $1 WHERE id = $2',
          [item.quantity, item.product_id]
        );
      }
    } else if (prevStatus === 'completed' && status !== 'completed') {
      // Moving away from completed — undo sold increment
      for (const item of itemsRes.rows) {
        await db.query(
          'UPDATE products SET sold = GREATEST(sold - $1, 0) WHERE id = $2',
          [item.quantity, item.product_id]
        );
      }
    }

    await db.query('COMMIT');
    res.json({ message: 'Order status updated' });
  } catch (err) {
    await db.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// User cancel order — only allowed if status is 'pending'; restores stock only (sold wasn't touched)
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const orderRes = await db.query(
      "SELECT * FROM orders WHERE id = $1 AND user_id = $2 AND status = 'pending'",
      [req.params.id, req.user.id]
    );
    
    if (orderRes.rows.length === 0) {
      return res.status(400).json({ error: 'Order cannot be cancelled. Only pending orders can be cancelled.' });
    }

    await db.query('BEGIN');
    await db.query('UPDATE orders SET status = $1 WHERE id = $2', ['cancelled', req.params.id]);

    // Restore stock only (sold was never incremented)
    const itemsRes = await db.query('SELECT * FROM order_items WHERE order_id = $1', [req.params.id]);
    for (const item of itemsRes.rows) {
      await db.query(
        'UPDATE products SET stock = stock + $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }

    await db.query('COMMIT');
    res.json({ message: 'Order cancelled successfully' });
  } catch (err) {
    await db.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
