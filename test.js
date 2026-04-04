const db = require('./server/db');
db.query(`SELECT o.*, u.name as user_name, u.email as user_email,
        COALESCE(
          json_agg(json_build_object(
            'product_id', oi.product_id,
            'product_name', p.name,
            'image_url', p.image_url,
            'quantity', oi.quantity, 
            'price', oi.price
          )) FILTER (WHERE oi.id IS NOT NULL), '[]'
        ) as items
       FROM orders o 
       JOIN users u ON o.user_id = u.id
       LEFT JOIN order_items oi ON o.id = oi.order_id 
       LEFT JOIN products p ON oi.product_id = p.id
       GROUP BY o.id, u.name, u.email
       ORDER BY o.created_at DESC`)
.then(res => { console.log(JSON.stringify(res.rows, null, 2)); process.exit(0) })
.catch(console.error);
