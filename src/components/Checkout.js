import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        const storedDiscount = parseFloat(localStorage.getItem("discount")) || 0;

        setCartItems(storedCart);
        setDiscount(storedDiscount);
    }, []);

    const calculateSubtotal = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const calculateDiscountedTotal = () => {
        const subtotal = calculateSubtotal();
        return subtotal - (subtotal * discount) / 100;
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleConfirmOrder = () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }
        alert("Order confirmed! Thank you for shopping.");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("discount");
        setCartItems([]);
    };

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Order Summary</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty!</p>
            ) : (
                <div className="order-summary">
                    {cartItems.map((item) => (
                        <div key={item.name} className="order-item">
                            <img src={item.image} alt={item.name} className="order-item-image" />
                            <div className="item-details">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-price">Price: ${item.price.toFixed(2)}</p>
                                <p className="item-quantity">Quantity: {item.quantity}</p>
                                <p className="item-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                    <div className="checkout-total">
                        <h3>Subtotal: ${calculateSubtotal().toFixed(2)}</h3>
                        {discount > 0 && <h3>Discount: {discount}%</h3>}
                        <h2>Total: ${calculateDiscountedTotal().toFixed(2)}</h2>
                    </div>
                    <div className="payment-section">
                        <label className="payment-label">Select Payment Method:</label>
                        <select className="payment-input" value={paymentMethod} onChange={handlePaymentChange}>
                            <option value="">Choose Payment Method</option>
                            <option value="credit-card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="cash">Cash on Delivery</option>
                        </select>
                    </div>
                    <button className="checkout-button" onClick={handleConfirmOrder}>
                        Confirm Order
                    </button>
                    <Link to="/cart" className="back-to-cart">Back to Cart</Link>
                </div>
            )}
        </div>
    );
}

export default Checkout;

