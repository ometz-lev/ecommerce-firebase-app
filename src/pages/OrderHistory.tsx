import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { useAuth } from '../context/useAuth';
import { getUserOrders } from '../services/orderService';
import type { Order } from '../types/Order';
import { productStyles } from '../styles/product-styles';

const OrderHistory = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/login');
        return;
      }

      const fetchOrders = async () => {
        try {
          setError('');
          const userOrders = await getUserOrders(user.uid);
          // Sort orders by date (newest first)
          const sortedOrders = userOrders.sort(
            (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          );
          setOrders(sortedOrders);
        } catch (err) {
          console.error(err);
          setError('Failed to load order history.');
        } finally {
          setLoading(false);
        }
      };

      void fetchOrders();
    }
  }, [user, authLoading, navigate]);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (authLoading || loading) {
    return <p style={{ textAlign: 'center', padding: '24px' }}>Loading order history...</p>;
  }

  return (
    <main style={productStyles.page}>
      <h1 style={productStyles.heading}>Order History</h1>

      {error && <p role="alert" style={productStyles.error}>{error}</p>}

      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '32px' }}>
          You haven't placed any orders yet.
        </p>
      ) : (
        <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#111827' }}>
                    Order ID: {order.id}
                  </p>
                  <p style={{ margin: '0 0 8px', color: '#6b7280', fontSize: '0.95rem' }}>
                    Date: {formatDate(order.orderDate)}
                  </p>
                  <p style={{ margin: '0', color: '#6b7280', fontSize: '0.95rem' }}>
                    Items: {order.items.length} product{order.items.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div style={{ textAlign: 'right', minWidth: '150px' }}>
                  <p style={{ margin: '0 0 12px', fontSize: '1.3rem', fontWeight: 700, color: '#2563eb' }}>
                    ${order.totalAmount.toFixed(2)}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleViewDetails(order)}
                    style={{
                      background: '#2563eb',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <p>
                <strong>Order ID:</strong> {selectedOrder.id}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(selectedOrder.orderDate)}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.userEmail}
              </p>

              <hr />

              <h5>Items in Order</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '12px',
                      background: '#f9fafb',
                      borderRadius: '8px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'contain',
                        borderRadius: '6px',
                        background: '#f3f4f6',
                        padding: '4px',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 4px', fontWeight: 600, color: '#111827' }}>
                        {item.title}
                      </p>
                      <p style={{ margin: '0 0 4px', color: '#6b7280', fontSize: '0.9rem' }}>
                        ${item.price.toFixed(2)} x {item.count} = ${(item.price * item.count).toFixed(2)}
                      </p>
                      <p style={{ margin: '0', color: '#6b7280', fontSize: '0.85rem' }}>
                        Category: {item.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <hr />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h5 style={{ margin: '0' }}>Total Amount</h5>
                <p style={{ margin: '0', fontSize: '1.3rem', fontWeight: 700, color: '#2563eb' }}>
                  ${selectedOrder.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default OrderHistory;
