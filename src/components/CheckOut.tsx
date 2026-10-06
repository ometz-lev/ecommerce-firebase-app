// This component simulates a checkout feature by saving the order to Firebase,
// clearing the cart, and displaying a success message.
// It uses Redux to manage the cart state, Firebase to store orders, and React-Bootstrap for styling.

import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import { clearCart } from '../store/cartSlice';
import { useAuth } from '../context/useAuth';
import { createOrder } from '../services/orderService';
import type { Order } from '../types/Order';

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    // Check if user is logged in
    if (!user) {
      setError('Please log in to place an order.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // Calculate total amount
      const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

      // Create order object
      const order: Omit<Order, 'id'> = {
        userId: user.uid,
        userEmail: user.email || 'unknown',
        items: cartItems,
        totalAmount,
        orderDate: new Date().toISOString(),
      };

      // Save order to Firebase
      await createOrder(order);

      // Clear the cart on successful order
      dispatch(clearCart());
      setIsSuccess(true);

      // Navigate to home/dashboard after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Order creation failed:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center mt-5 px-3">
      {!isSuccess ? (
        <>
          <Button
            variant="success"
            size="lg"
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || isLoading || !user}
          >
            {isLoading ? 'Processing...' : 'Continue to checkout'}
          </Button>
          {error && <p className="mt-3 text-danger">{error}</p>}
          {cartItems.length === 0 && (
            <p className="mt-3 text-muted">Your cart is empty.</p>
          )}
          {!user && (
            <p className="mt-3 text-muted">Please log in to checkout.</p>
          )}
        </>
      ) : (
        <Alert variant="success" className="mx-auto" style={{ maxWidth: '600px' }}>
          <h4 className="mb-2">Thank you for your purchase!</h4>
          <p className="mb-0">Your order has been successfully placed, and your cart has been cleared.</p>
        </Alert>
      )}
    </div>
  );
};

export default CheckOut;