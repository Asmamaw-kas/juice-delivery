import { useState, useEffect } from 'react'

const OrderPage = ({ cart, updateCart, closeOrder }) => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [orderStatus, setOrderStatus] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const increaseQuantity = (id) => {
    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    updateCart(updatedCart)
  }

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    )
    updateCart(updatedCart)
  }

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id)
    updateCart(updatedCart)
  }

  const placeOrder = () => {
    if (!paymentMethod) {
      alert('Please select a payment method')
      return
    }
    
    setOrderPlaced(true)
    setOrderStatus('preparing')
    
    // Simulate order progress
    setTimeout(() => {
      setOrderStatus('on-the-way')
    }, 3000)
    
    setTimeout(() => {
      setOrderStatus('delivered')
    }, 6000)
  }

  const handleCloseOrder = () => {
    if (orderPlaced) {
      // Clear cart after order is placed
      updateCart([])
    }
    closeOrder()
  }

  useEffect(() => {
    // Reset order status when cart changes
    if (cart.length === 0 && orderPlaced) {
      setOrderPlaced(false)
      setOrderStatus('')
    }
  }, [cart, orderPlaced])

  return (
    <div className="order-page">
      <div className="order-container">
        <button className="close-btn" onClick={handleCloseOrder}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        
        <h2>Your Order</h2>
        
        {!orderPlaced ? (
          <>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.73 22.73L2.77 2.77 2 2l-.73-.73L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.27-1.27zM7.42 15c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2H7.42zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H6.54l9.01 9zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"/>
                </svg>
                <p>Your cart is empty</p>
                <button onClick={handleCloseOrder}>Browse Juices</button>
              </div>
            ) : (
              <>
                <div className="order-items">
                  {cart.map(item => (
                    <div key={item.id} className="order-item">
                      <div className="item-info">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                      </div>
                      <div className="item-controls">
                        <div className="quantity-controls">
                          <button onClick={() => decreaseQuantity(item.id)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => increaseQuantity(item.id)}>+</button>
                        </div>
                        <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                        <button className="remove-btn" onClick={() => removeItem(item.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="order-total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="payment-methods">
                  <h3>Payment Method</h3>
                  <div className="method-options">
                    {['Credit Card', 'PayPal', 'Cash on Delivery'].map(method => (
                      <label 
                        key={method}
                        className={paymentMethod === method ? 'active' : ''}
                      >
                        <input 
                          type="radio" 
                          name="payment" 
                          value={method} 
                          checked={paymentMethod === method}
                          onChange={() => setPaymentMethod(method)}
                        />
                        {method}
                      </label>
                    ))}
                  </div>
                </div>
                
                <button className="place-order-btn" onClick={placeOrder}>
                  Place Order
                </button>
              </>
            )}
          </>
        ) : (
          <div className="order-status">
            <h3>Order Status</h3>
            
            <div className="status-timeline">
              <div className={`status-step ${['preparing', 'on-the-way', 'delivered'].includes(orderStatus) ? 'active' : ''}`}>
                <div className="step-icon">
                  {['preparing', 'on-the-way', 'delivered'].includes(orderStatus) && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  )}
                </div>
                <div className="step-label">Preparing</div>
              </div>
              
              <div className={`timeline-line ${['on-the-way', 'delivered'].includes(orderStatus) ? 'active' : ''}`}></div>
              
              <div className={`status-step ${['on-the-way', 'delivered'].includes(orderStatus) ? 'active' : ''}`}>
                <div className="step-icon">
                  {['on-the-way', 'delivered'].includes(orderStatus) && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  )}
                </div>
                <div className="step-label">On the way</div>
              </div>
              
              <div className={`timeline-line ${orderStatus === 'delivered' ? 'active' : ''}`}></div>
              
              <div className={`status-step ${orderStatus === 'delivered' ? 'active' : ''}`}>
                <div className="step-icon">
                  {orderStatus === 'delivered' && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  )}
                </div>
                <div className="step-label">Delivered</div>
              </div>
            </div>
            
            {orderStatus === 'preparing' && (
              <div className="status-message">
                <p>Your juices are being prepared with care!</p>
                <div className="juice-preparation">
                  {cart.map(item => (
                    <div key={item.id} className="juice-bottle">
                      <div className="bottle"></div>
                      <div className={`juice ${item.name.toLowerCase().replace(' ', '-')}`}></div>
                      <div className="label">{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {orderStatus === 'on-the-way' && (
              <div className="status-message">
                <p>Your order is on its way!</p>
                <div className="delivery-animation">
                  <div className="delivery-bike">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
                    </svg>
                  </div>
                  <div className="road"></div>
                </div>
              </div>
            )}
            
            {orderStatus === 'delivered' && (
              <div className="status-message">
                <p>Your order has been delivered! Enjoy your fresh juices!</p>
                <div className="delivered-animation">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <button className="close-order-btn" onClick={handleCloseOrder}>
                  Close
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderPage