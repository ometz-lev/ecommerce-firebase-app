//This is the ShoppingCart component that displays the items in the user's shopping cart.
//It allows users to adjust quantities, remove items, and proceed to checkout.
//The component also handles image loading errors and provides a modal for confirming item removal or clearing the cart.
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import type { RootState } from '../store';
import { removeFromCart, updateCount, clearCart } from '../store/cartSlice';
import { useImageFallback } from '../hooks/useImageFallback';
import { productStyles } from '../styles/product-styles';

const ShoppingCart: React.FC = () => {
  const items = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleImageError, hasFailed } = useImageFallback();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [showClearCartModal, setShowClearCartModal] = useState(false);

  const selectedItem = items.find((item) => item.id === selectedItemId) ?? null;

  // Handler for when the user clicks the "Remove" button on an item
  const handleRemoveClick = (id: string) => {
    setSelectedItemId(id);
  };

  const confirmRemove = () => {
    if (selectedItemId !== null) {
      dispatch(removeFromCart(selectedItemId));
      setSelectedItemId(null);
    }
  };

  // Adjust the quantity of an item in the cart by a specified change (positive or negative)
  const adjustQuantity = (id: string, change: number) => {
    const currentItem = items.find((item) => item.id === id);
    if (!currentItem) return;

    const nextQty = Math.max(1, currentItem.count + change);
    dispatch(updateCount({ id, count: nextQty }));
  };

  // Handler for changing the quantity of an item directly via input
  const handleChange = (id: string, value: string) => {
    const count = parseInt(value, 10) || 1;
    dispatch(updateCount({ id, count: Math.max(1, count) }));
  };

  // Handler for clearing the entire cart
  const handleClearCart = () => {
    dispatch(clearCart());
    setShowClearCartModal(false);
  };

  // Calculate the total price of all items in the cart
  const total = items.reduce((sum, i) => sum + i.price * i.count, 0).toFixed(2);

  return (
    <div style={productStyles.cartPage}>
      <h3 style={productStyles.cartHeading}>Shopping Cart</h3>

      {items.length === 0 ? (
        <div style={productStyles.emptyCart}>Your cart is empty.</div>
      ) : (
        <div style={productStyles.cartContent}>
          <div style={productStyles.cartList}>
            {items.map((item) => {
              const itemTotal = (item.price * item.count).toFixed(2);

              return (
                <div key={item.id} style={productStyles.cartCard}>
                  <img
                    src={hasFailed(item.id) ? 'https://via.placeholder.com/90x90?text=No+Image' : item.image}
                    alt={item.title}
                    style={productStyles.cartImage}
                    onError={() => handleImageError(item.id)}
                  />

                  <div style={productStyles.cartBody}>
                    <div style={productStyles.cartHeader}>
                      <div>
                        <h6 style={productStyles.cartTitle}>{item.title}</h6>
                        <p style={productStyles.cartPrice}>${item.price}</p>
                      </div>

                      <strong style={productStyles.cartSubtotal}>Subtotal: ${itemTotal}</strong>
                    </div>

                    <div style={productStyles.cartControls}>
                      <div style={productStyles.qtyControls}>
                        <button
                          type="button"
                          onClick={() => adjustQuantity(item.id, -1)}
                          style={productStyles.qtyButton}
                        >
                          −
                        </button>

                        <input
                          type="number"
                          min={1}
                          value={item.count}
                          onChange={(e) => handleChange(item.id, e.target.value)}
                          style={productStyles.qtyInput}
                        />

                        <button
                          type="button"
                          onClick={() => adjustQuantity(item.id, 1)}
                          style={productStyles.qtyButton}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveClick(item.id)}
                        style={productStyles.removeButton}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside style={productStyles.summaryCard}>
            <h5 style={productStyles.summaryTitle}>Order Summary</h5>
            <div style={productStyles.summaryRow}>
              <span>Items</span>
              <span>{items.reduce((sum, item) => sum + item.count, 0)}</span>
            </div>
            <div style={productStyles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr />
            <div style={productStyles.totalRow}>
              <span>Total</span>
              <span style={productStyles.summaryTotal}>${total}</span>
            </div>

            <div style={productStyles.summaryActions}>
              <button type="button" style={productStyles.checkoutButton} onClick={() => navigate('/checkout')}>
                Checkout
              </button>
              <button type="button" style={productStyles.clearButton} onClick={() => setShowClearCartModal(true)}>
                Clear Cart
              </button>
            </div>
          </aside>
        </div>
      )}

      <Modal show={selectedItemId !== null} onHide={() => setSelectedItemId(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Remove item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem ? `Are you sure you want to remove "${selectedItem.title}" from your cart?` : 'Are you sure you want to remove this product from your cart?'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedItemId(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showClearCartModal} onHide={() => setShowClearCartModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Clear cart?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will remove all products from your cart. Continue?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClearCartModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
