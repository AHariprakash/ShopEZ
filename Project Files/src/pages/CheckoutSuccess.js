import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CheckoutSuccess() {
  const { cart, setCart } = useCart();
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    // Clear cart and generate fake order ID
    setCart([]);
    setOrderId('ORD' + Math.floor(100000 + Math.random() * 900000));
    
    // Auto redirect after 8 seconds
    const timer = setTimeout(() => {
      navigate('/products');
    }, 8000);

    return () => clearTimeout(timer);
  }, [setCart, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="bg-green-500 text-white rounded-full p-4 mb-4"
      >
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-2"
      >
        Order Placed Successfully!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-center mb-4"
      >
        Thank you for shopping with <span className="font-semibold">ShopEZ</span>.
      </motion.p>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 text-sm w-full max-w-md text-center">
        <p><span className="font-semibold">Order ID:</span> {orderId}</p>
        <p><span className="font-semibold">Total Paid:</span> ₹{total}</p>
        <p><span className="font-semibold">Estimated Delivery:</span> 3-5 Business Days</p>
      </div>

      <Link
        to="/products"
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Continue Shopping
      </Link>

      <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">Redirecting in 8 seconds...</p>
    </div>
  );
}
