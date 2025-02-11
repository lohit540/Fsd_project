import React, { useState, useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

const cartReducer = (state, action) => {
    switch (action.type) {
        case "REMOVE_ITEM":
            return state.filter((item) => item.name !== action.payload);
        case "UPDATE_QUANTITY":
            return state.map((item) =>
                item.name === action.payload.name
                    ? { ...item, quantity: Math.max(1, action.payload.quantity) }
                    : item
            );
        case "CLEAR_CART":
            return [];
        case "SET_CART":
            return action.payload;
        case "ADD_ITEM":
            return [...state, action.payload];
        case "UPDATE_NOTE":
            return state.map((item) =>
                item.name === action.payload.name ? { ...item, note: action.payload.note } : item
            );
        default:
            return state;
    }
};

function Cart({ cartItems, setCartItems }) {
    const navigate = useNavigate();
    const [cartState, dispatch] = useReducer(cartReducer, cartItems);
    const [discount, setDiscount] = useState(0);
    const [promoCode, setPromoCode] = useState("");
    const [removedItem, setRemovedItem] = useState(null);
    const taxRate = 5; // 5% Tax

    useEffect(() => {
        setCartItems(cartState);
        localStorage.setItem("cartItems", JSON.stringify(cartState));
    }, [cartState, setCartItems]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cartItems"));
        if (savedCart) {
            dispatch({ type: "SET_CART", payload: savedCart });
        }
    }, []);

    const removeItem = (item) => {
        setRemovedItem(item);
        dispatch({ type: "REMOVE_ITEM", payload: item.name });

        setTimeout(() => {
            setRemovedItem(null);
        }, 5000); // Undo option available for 5 seconds
    };

    const undoRemove = () => {
        if (removedItem) {
            dispatch({ type: "ADD_ITEM", payload: removedItem });
            setRemovedItem(null);
        }
    };

    const updateQuantity = (name, quantity) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { name, quantity } });
    };

    const updateNote = (name, note) => {
        dispatch({ type: "UPDATE_NOTE", payload: { name, note } });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    const calculateSubtotal = () =>
        cartState.reduce((total, item) => total + item.price * item.quantity, 0);

    const calculateTax = () => {
        return (calculateSubtotal() * taxRate) / 100;
    };

    const calculateDiscountedTotal = () => {
        const subtotal = calculateSubtotal();
        const taxAmount = calculateTax();
        let finalDiscount = 0;

        if (promoCode === "SAVE10") {
            finalDiscount = 10;
        } else if (promoCode === "SAVE20") {
            finalDiscount = 20;
        } else {
            finalDiscount = discount;
        }

        const discountAmount = (subtotal * finalDiscount) / 100;
        return subtotal + taxAmount - discountAmount;
    };

    const handleApplyDiscount = () => {
        const enteredCode = prompt("Enter discount code or percentage:", promoCode);
        if (enteredCode === "SAVE10" || enteredCode === "SAVE20") {
            setPromoCode(enteredCode);
            alert(`Promo code "${enteredCode}" applied!`);
        } else {
            const enteredDiscount = parseFloat(enteredCode);
            if (!isNaN(enteredDiscount) && enteredDiscount >= 0 && enteredDiscount <= 100) {
                setDiscount(enteredDiscount);
                localStorage.setItem("discount", enteredDiscount);
            } else {
                alert("Invalid discount. Enter a number (0-100) or a valid promo code.");
            }
        }
    };

    const handleCheckout = () => {
        if (cartState.length === 0) {
            alert("Your cart is empty. Please add items before checking out.");
            return;
        }

        localStorage.setItem("cartItems", JSON.stringify(cartState));
        localStorage.setItem("discount", discount);
        localStorage.setItem("promoCode", promoCode);

        navigate("/checkout");
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Cart ({cartState.length} items)</h2>

            {removedItem && (
                <div className="undo-notification">
                    <p>{removedItem.name} removed! </p>
                    <button onClick={undoRemove} className="undo-button">
                        Undo
                    </button>
                </div>
            )}

            {cartState.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty!</p>
                    <Link to="/menu" className="continue-shopping-link">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="cart-items">
                    {cartState.map((item) => (
                        <div key={item.name} className="cart-item">
                            <img src={item.image} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-price">${item.price}</p>
                                <div className="quantity-control">
                                    <button onClick={() => updateQuantity(item.name, item.quantity - 1)}>−</button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => updateQuantity(item.name, parseInt(e.target.value) || 1)}
                                    />
                                    <button onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</button>
                                </div>
                                <textarea
                                    className="item-note"
                                    placeholder="Add a special request..."
                                    value={item.note || ""}
                                    onChange={(e) => updateNote(item.name, e.target.value)}
                                />
                                <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <button className="remove-button" onClick={() => removeItem(item)}>Remove</button>
                        </div>
                    ))}

                    <div className="cart-total">
                        <h3 className="subtotal">Subtotal: ${calculateSubtotal().toFixed(2)}</h3>
                        <h3 className="tax">Tax (5%): ${calculateTax().toFixed(2)}</h3>
                        <div className="discount-section">
                            <button onClick={handleApplyDiscount} className="apply-discount">Apply Discount</button>
                            {discount > 0 && <p className="discount-message">Discount: {discount}%</p>}
                            {promoCode && <p className="promo-code">Promo Code: {promoCode}</p>}
                        </div>
                        <h3 className="total">Grand Total: ${calculateDiscountedTotal().toFixed(2)}</h3>
                        <div className="checkout-buttons">
                            <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                            <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>
                            <Link to="/menu" className="continue-shopping-link">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );

    
}

export default Cart;
