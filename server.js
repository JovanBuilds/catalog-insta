const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'products.json');
  }
}

// Helper function to write data
async function writeData(data) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
}

// API Routes

// Get all active products (public)
app.get('/api/products', async (req, res) => {
  try {
    const data = await readData();
    const activeProducts = data.products.filter(p => p.active);
    res.json({ products: activeProducts, config: data.config });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Get all products (admin)
app.get('/api/admin/products', async (req, res) => {
  try {
    const password = req.headers['x-admin-password'];
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const data = await readData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Create product (admin)
app.post('/api/admin/products', async (req, res) => {
  try {
    const password = req.headers['x-admin-password'];
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const data = await readData();
    const newProduct = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };

    data.products.push(newProduct);
    await writeData(data);

    res.json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
});

// Update product (admin)
app.put('/api/admin/products/:id', async (req, res) => {
  try {
    const password = req.headers['x-admin-password'];
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const data = await readData();
    const productId = parseInt(req.params.id);
    const index = data.products.findIndex(p => p.id === productId);

    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    data.products[index] = {
      ...data.products[index],
      ...req.body,
      id: productId
    };

    await writeData(data);
    res.json({ success: true, product: data.products[index] });
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
});

// Delete product (admin)
app.delete('/api/admin/products/:id', async (req, res) => {
  try {
    const password = req.headers['x-admin-password'];
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const data = await readData();
    const productId = parseInt(req.params.id);
    data.products = data.products.filter(p => p.id !== productId);

    await writeData(data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
});

// Update config (admin)
app.put('/api/admin/config', async (req, res) => {
  try {
    const password = req.headers['x-admin-password'];
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const data = await readData();
    data.config = { ...data.config, ...req.body };

    await writeData(data);
    res.json({ success: true, config: data.config });
  } catch (error) {
    res.status(500).json({ error: 'Error updating config' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📱 Catálogo público: http://localhost:${PORT}`);
  console.log(`⚙️  Panel admin: http://localhost:${PORT}/admin.html`);
});
