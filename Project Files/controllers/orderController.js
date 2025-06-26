// server/controllers/orderController.js
import Order from '../models/Order.js';

export const placeOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    const order = new Order({ items, total });
    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
};
