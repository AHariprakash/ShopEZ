import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, incrementQty, decrementQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/checkout-success');
      } else {
        alert('Order failed: ' + data.message);
      }
    } catch (err) {
      alert('Checkout error: ' + err.message);
    }
  };

  return (
    <div className="p-4 text-gray-900 dark:text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>₹{item.price} × {item.quantity}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decrementQty(item.id)}
                  className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => incrementQty(item.id)}
                  className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-3 px-2 py-1 text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 text-right text-xl font-semibold">
            Total: ₹{total}
          </div>

          <div className="text-right mt-4">
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
