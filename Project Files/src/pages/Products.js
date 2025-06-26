import React, { useEffect, useState } from 'react'; // ✅ This line is important!
import { useCart } from '../context/CartContext';

export default function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div className="p-4 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">🛍 Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow bg-white dark:bg-gray-800"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
            <p className="text-sm">{product.description}</p>
            <p className="mt-1 font-bold">₹{product.price}</p>
            <button
              onClick={() =>
                addToCart({
                  id: product._id,
                  name: product.name,
                  price: product.price,
                })
              }
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
