import React from 'react';
import { useCheckout } from '../../../context/CheckoutContext';
import { X, Calendar, MapPin, Package } from 'lucide-react';

export const CustomerOrdersModal: React.FC = () => {
  const { isOrdersModalOpen, closeOrdersModal, orders } = useCheckout();

  if (!isOrdersModalOpen) return null;

  return (
    <div
      className="checkout-modal-overlay"
      onClick={closeOrdersModal}
      role="dialog"
      aria-modal="true"
      aria-label="My Orders History"
    >
      <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-modal-header">
          <h2 className="checkout-modal-title">My Orders</h2>
          <button
            type="button"
            className="checkout-modal-close"
            onClick={closeOrdersModal}
            aria-label="Close orders modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="checkout-modal-body">
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 12px', color: '#777' }}>
              <Package size={40} style={{ margin: '0 auto 12px auto', color: '#B5AA9B' }} />
              <p style={{ margin: 0, fontSize: '15px' }}>No orders found yet.</p>
            </div>
          ) : (
            orders.map((order) => {
              const formattedDate = new Date(order.created_at).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div key={order.order_id} className="checkout-order-history-card">
                  <div className="checkout-order-history-header">
                    <div>
                      <strong style={{ fontSize: '15px', color: '#1A1816' }}>
                        {order.order_number}
                      </strong>
                      <div
                        style={{
                          fontSize: '12px',
                          color: '#7D756A',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginTop: '2px',
                        }}
                      >
                        <Calendar size={13} />
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                    <span className={`checkout-order-badge ${order.order_status}`}>
                      {order.order_status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Items */}
                  <div style={{ margin: '12px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {order.items.map((it, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '13px',
                        }}
                      >
                        <span style={{ color: '#2C2621' }}>
                          {it.name} <span style={{ color: '#888' }}>× {it.quantity}</span>
                        </span>
                        <span style={{ fontWeight: 600, color: '#1A1816' }}>{it.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Address & Total */}
                  <div
                    style={{
                      borderTop: '1px solid #ECE4D8',
                      paddingTop: '10px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      fontSize: '12.5px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#666', maxWidth: '70%' }}>
                      <MapPin size={13} style={{ flexShrink: 0 }} />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {order.delivery_address.formattedAddress}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1A1816' }}>
                        ₹{order.total.toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '11px', color: '#888' }}>Cash on Delivery</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
