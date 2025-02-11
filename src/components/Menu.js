import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = ({ cartItems, setCartItems }) => {
    const [category, setCategory] = useState("pizzas");
    const [subCategory, setSubCategory] = useState("veg");
    const [cartMessage, setCartMessage] = useState("");

    useEffect(() => {
        const storedMessage = localStorage.getItem("cartMessage");
        if (storedMessage) {
            showCartNotification(storedMessage);
        }
    }, []);

    const showCartNotification = (message) => {
        setCartMessage(message);
        localStorage.setItem("cartMessage", message);

        const notification = document.getElementById("cart-notification");
        if (notification) {
            notification.classList.add("show");

            setTimeout(() => {
                notification.classList.remove("show");
                localStorage.removeItem("cartMessage");
                setCartMessage("");
            }, 3000);
        }
    };

    const addToCart = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
        if (existingItem) {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                )
            );
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }

        showCartNotification(`${item.name} added to cart!`);
    };

    const menuItems = {
        pizzas: {
            veg: [
                { name: "Margherita Pizza", price: 10, image: "/images/margherita.jpg" },
                { name: "Veggie Delight Pizza", price: 12, image: "/images/veggievegandelight.webp" },
                { name: "Paneer Pizza", price: 13, image: "/images/paneer_pizza.jpg" },
                { name: "Mushroom Pizza", price: 14, image: "/images/mushroom.jpeg" },
                { name: "Corn Pizza", price: 11, image: "/images/corn.jpeg" },
                { name: "Cheese Burst Pizza", price: 16, image: "/images/cheese burst.jpeg" },
                { name: "Spinach Pizza", price: 15, image: "/images/spinach pizza.webp" }
            ],
            nonveg: [
                { name: "Pepperoni Pizza", price: 14, image: "/images/Pepperoni Pizza.png" },
                { name: "Chicken Supreme Pizza", price: 16, image: "/images/Chicken.png" },
                { name: "Chicken Tikka Pizza", price: 18, image: "/images/Chicken Tikka Pizza.png" },
                { name: "BBQ Chicken Pizza", price: 17, image: "images/BBQ Chicken Pizza.png" },
                { name: "Beef Pizza", price: 20, image: "/images/Beef Pizza.png" },
                { name: "Meat Lovers Pizza", price: 19, image: "/images/Meat Lovers Pizza.png" },
                { name: "Spicy Chicken Pizza", price: 16, image: "/images/Spicy Chicken Pizza.png" }
            ],
        },
        burgers: {
            classic: [
                { name: "Classic Burger", price: 10, image: "/images/Classic Burger.png" },
                { name: "Cheeseburger", price: 12, image: "/images/Cheeseburger.png" },
                { name: "Double Cheese Burger", price: 14, image: "/images/Double Cheese Burger.png" },
                { name: "Bacon Burger", price: 15, image: "/images/Bacon Burger.png" },
                { name: "BBQ Burger", price: 16, image: "/images/BBQ Burger.png" },
                { name: "Mushroom Burger", price: 13, image: "/images/Mushroom Burger.png" },
                { name: "Egg Burger", price: 14, image: "/images/Egg Burger.png" }
            ],
            gourmet: [
                { name: "Mushroom Swiss Burger", price: 15, image: "/images/Mushroom Swiss Burger.png" },
                { name: "Spicy Jalapeno Burger", price: 14, image: "/images/Spicy Jalapeno Burger.png" },
                { name: "Truffle Burger", price: 18, image: "/images/Truffle Burger.png" },
                { name: "Blue Cheese Burger", price: 17, image: "/images/Blue Cheese Burger.png" },
                { name: "Wagyu Beef Burger", price: 25, image: "/images/Wagyu Beef Burge.png" },
                { name: "BBQ Pulled Pork Burger", price: 20, image: "/images/BBQ Pulled Pork Burger.png" },
                { name: "Lamb Burger", price: 22, image: "/images/Lamb Burger.png" }
            ],
        },
        biriyanis: {
            veg: [
                { name: "Veg Biryani", price: 12, image: "images/vegetablebiryani.jpg" },
                { name: "Paneer Biryani", price: 14, image: "images/panner biriyani.jpg" },
                { name: "Mushroom Biryani", price: 15, image: "images/Mushroom-Biryani.webp" },
                { name: "Vegetable Pulao", price: 11, image: "images/vegetable pulao.jpg" },
                { name: "Lemon Rice", price: 10, image: "images/lemon-rice.jpg" },
                { name: "Coriander Rice", price: 13, image: "images/CORIANDER-RICE.jpg" },
                { name: "Tomato Rice", price: 12, image: "images/tomato-rice.jpg" }
            ],
            nonveg: [
                { name: "Chicken Biryani", price: 16, image: "images/Chicken-Biryani.jpg" },
                { name: "Mutton Biryani", price: 18, image: "images/Mutton Biryani.jpg" },
                { name: "Fish Biryani", price: 20, image: "images/fish biriyani.jpg" },
                { name: "Prawn Biryani", price: 22, image: "images/Prawn-Biryani.jpg" },
                { name: "Chicken 65 Biryani", price: 19, image: "images/Chicken-65-Biryani.jpg" },
                { name: "Kebab Biryani", price: 21, image: "images/kebab biriyani.jpg" },
                { name: "Tandoori Chicken Biryani", price: 23, image: "images/tandoori chicken biriyani.webp" }
            ],
        },
        Beverages: {
            mojitos: [
                { name: "Mint Mojito", price: 5, image: "images/mint mojito.jpg" },
                { name: "Strawberry mojito", price: 5, image: "images/strawberry mojito.webp" },
                { name: "blue lagoon mojito", price: 6, image: "/images/blue lagoon mojiti.webp" },
                { name: "Blueberry Mojito", price: 6, image: "images/Blueberry-Mojito.jpg" },
                { name: "Coconut Mojito", price: 6, image: "/images/coconut mojito.jpeg" },
                { name: "Kiwi Mojito", price: 6, image: "images/kiwi mojito.jpeg" },
                { name: "Peach Mojito", price: 7, image: "/images/Peach-Mojito.jpg" }
            ],
            SoftDrink: [
                
                    { name: "Thums Up", price: 5, image: "/images/Thumbs up.jpg" },
                    { name: "Sprite", price: 4, image: "/images/sprite.jpeg" },
                    { name: "Apple Fizz", price: 6, image: "/images/Apple fizz.jpeg" },
                    { name: "Mountain Dew", price: 5, image: "/images/mountain dew.jpg" },
                    { name: "Diet Coke", price: 5, image: "/images/diet coke.jpeg" },
                    { name: "Red Bull", price: 5, image: "/images/Red bull.jpeg" },
                    { name: "Fanta", price: 5, image: "/images/Fanta.jpeg" }
                ]          
                
            
        },
        desserts: {
            icecream: [
                { name: "Vanilla Ice Cream", price: 4, image: "/images/vanillaa.jpeg" },
                { name: "Chocolate Ice Cream", price: 5, image: "images/choco ice creamm.jpeg" },
                { name: "Strawberry Ice Cream", price: 5, image: "images/strawberry ice cream.jpeg" },
                { name: "Mint Chocolate Chip", price: 6, image: "images/mint chco chip.jpeg" },
                { name: "Black Current Ice Cream", price: 6, image: "images/black currentt ice.jpeg" },
                { name: "Mango Sorbet", price: 5, image: "images/mango ice creamm.jpeg" },
                { name: "Peach Ice Cream", price: 6, image: "/images/peach ice cream.jpeg" }
            ],
            Cakes: [
                { name: "Chocolate Cake", price: 6, image: "/images/chocolate_cake.webp" },
                { name: "Red Velvet Cake", price: 7, image: "/images/red velvet cake.jpg" },
                { name: "Lemon Tart", price: 5, image: "/images/lemon tart.jpeg" },
                { name: "Blueberry Cheesecake", price: 7, image: "images/blueberry-cheesecake.jpg" },
                { name: "Brownie", price: 5, image: "/images/brownie.jpg" },
                { name: "Apple Pie", price: 6, image: "/images/Apple-Pie.jpg" },
                { name: "Ice cream Cake", price: 6, image: "images/Ice_Cream_Cake.webp" }
            ]
        },
    };

    return (
        <div className="menu-container">
            <h2 className="menu-title">Explore Our Menu</h2>

            {/* Cart Notification */}
            <div id="cart-notification" className="cart-notification">
                {cartMessage}
            </div>

            <div className="menu-categories">
                {Object.keys(menuItems).map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setCategory(cat);
                            setSubCategory(Object.keys(menuItems[cat])[0]);
                        }}
                        className={category === cat ? "active" : ""}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            <div className="subcategory-buttons">
                {Object.keys(menuItems[category]).map((sub) => (
                    <button
                        key={sub}
                        onClick={() => setSubCategory(sub)}
                        className={subCategory === sub ? "active" : ""}
                    >
                        {sub.charAt(0).toUpperCase() + sub.slice(1)}
                    </button>
                ))}
            </div>

            <div className="menu-items">
                {menuItems[category][subCategory]?.map((item, index) => (
                    <div key={index} className="menu-item">
                        <img src={item.image} alt={item.name} className="menu-item-image" />
                        <h3>{item.name}</h3>
                        <p className="price">${item.price}</p>
                        <button className="order-button" onClick={() => addToCart(item)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart-button">
                <Link to="/cart">
                    <button className="cta-button">Go to Cart</button>
                </Link>
            </div>
        </div>
    );
};

export default Menu;
