import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [promoCode, setPromoCode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const taxRate = 5; // 5% tax

    useEffect(() => {
        // Retrieve cart items, discount, and promo code from localStorage
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        const storedPromoCode = localStorage.getItem("promoCode") || "";
        const storedDiscount = storedPromoCode === "SAVE10" ? 10 : storedPromoCode === "SAVE20" ? 20 : 0;

        setCartItems(storedCart);
        setPromoCode(storedPromoCode);
        setDiscount(storedDiscount);
    }, []);

    // Calculate subtotal (sum of all item prices * quantities)
    const calculateSubtotal = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Calculate tax (5% of subtotal)
    const calculateTax = () => {
        const subtotal = calculateSubtotal();
        return (subtotal * taxRate) / 100;
    };

    // Calculate discounted total (subtotal + tax - discount)
    const calculateDiscountedTotal = () => {
        const subtotal = calculateSubtotal();
        const taxAmount = calculateTax();
        const discountAmount = (subtotal * discount) / 100;
        return subtotal + taxAmount - discountAmount;
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleConfirmOrder = () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }
        setIsProcessing(true);

        setTimeout(() => {
            alert("Order confirmed! Thank you for shopping.");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("promoCode");
            setCartItems([]);
            setIsProcessing(false);
        }, 3000);
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
                                <p className="item-price">Price: ₹{item.price.toFixed(2)}</p>
                                <p className="item-quantity">Quantity: {item.quantity}</p>
                                <p className="item-total">Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                    <div className="checkout-total">
                        <h3>Subtotal: ₹{calculateSubtotal().toFixed(2)}</h3>
                        <h3>Tax (5%): ₹{calculateTax().toFixed(2)}</h3>
                        <h3>Subtotal + Tax: ₹{(calculateSubtotal() + calculateTax()).toFixed(2)}</h3>
                        {discount > 0 && <h3>Discount: {discount}%</h3>}
                        {promoCode && <h3>Promo Code Applied: {promoCode}</h3>}
                        <h2>Grand Total: ₹{calculateDiscountedTotal().toFixed(2)}</h2>
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
                    <button className="checkout-button" onClick={handleConfirmOrder} disabled={isProcessing}>
                        {isProcessing ? "Processing..." : "Confirm Order"}
                    </button>
                    <Link to="/cart" className="back-to-cart">Back to Cart</Link>
                </div>
            )}
        </div>
    );
}

export default Checkout;