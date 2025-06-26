// server/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/orders', orderRoutes);
connectDB();

app.get('/', (req, res) => {
  res.send('ShopEZ API is running 🚀');
});

// ✅ Mount product routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
