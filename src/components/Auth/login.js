import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import './RestaurantAuth.css'; // We'll create this CSS file

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="restaurant-auth-bg">
      {/* Animated background elements */}
      <div className="floating-plate"></div>
      <div className="floating-utensil"></div>
      <div className="floating-herb"></div>
      
      <div className={`restaurant-auth-container ${shake ? 'shake' : ''}`}>
        <div className="restaurant-auth-box">
          {/* Logo/Header Section */}
          <div className="restaurant-logo">
            <svg viewBox="0 0 24 24" className="chef-icon">
              <path d="M12 2C14.21 2 16 3.79 16 6c0 1.1-.45 2.1-1.17 2.83C15.55 9.9 16 10.9 16 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.1.45-2.1 1.17-2.83C8.45 8.1 8 7.1 8 6c0-2.21 1.79-4 4-4zm7 12c.34 0 .67.04 1 .09V15c0 2.76-2.24 5-5 5H9c-2.76 0-5-2.24-5-5v-1.91c.33-.05.66-.09 1-.09 1.1 0 2.9.45 3.5 1.5.55-.95 1.91-1.5 3-1.5s2.45.55 3 1.5c.6-1.05 2.4-1.5 3.5-1.5z" />
            </svg>
            <h2>Restaurant Portal</h2>
          </div>
          
          <form onSubmit={handleLogin} className="restaurant-auth-form">
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
                className="restaurant-input"
              />
              <label className="input-label">Email</label>
              <span className="input-highlight"></span>
            </div>
            
            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
                className="restaurant-input"
              />
              <label className="input-label">Password</label>
              <span className="input-highlight"></span>
            </div>
            
            <button 
              type="submit" 
              className="restaurant-auth-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                "Login to Dashboard"
              )}
            </button>
          </form>
          
          <div className="restaurant-auth-footer">
            <p>New to our system? <Link to="/signup" className="auth-link">Create account</Link></p>
            <Link to="/forgot-password" className="auth-link">Forgot password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLogin;