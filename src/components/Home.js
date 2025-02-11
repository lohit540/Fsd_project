import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Home.css';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Home = () => {
  const [showOffers, setShowOffers] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showBookTableForm, setShowBookTableForm] = useState(false);
  const [showAboutUsMessage, setShowAboutUsMessage] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const savedBookingData = localStorage.getItem('bookingData');
    if (savedBookingData) {
      setBookingData(JSON.parse(savedBookingData));
    }
  }, []);

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
    setShowOffers(false);
    setShowBookTableForm(false);
    setShowAboutUsMessage(false);
  };

  const toggleSpecialOffers = () => {
    setShowOffers(!showOffers);
    setShowContactForm(false);
    setShowBookTableForm(false);
    setShowAboutUsMessage(false);
  };

  const toggleBookTableForm = () => {
    setShowBookTableForm(!showBookTableForm);
    setShowContactForm(false);
    setShowOffers(false);
    setShowAboutUsMessage(false);
  };

  const toggleAboutUsMessage = () => {
    setShowAboutUsMessage(!showAboutUsMessage);
  };

  // ✅ Format Time to AM/PM
  const formatAMPM = (hour, minute) => {
    let hours = parseInt(hour, 10);
    const minutes = parseInt(minute, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // '0' should be '12'
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  };

  // ✅ Format Date with Month Name (e.g., "February 7, 2025")
  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // ✅ Handle Booking Submission
  const handleTableBookingSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const numberOfGuests = event.target.guests.value;
    const date = event.target.date.value;
    const time = event.target.time.value;

    const formattedDate = formatDate(date);
    const [hour, minute] = time.split(':');
    const formattedTime = formatAMPM(hour, minute);

    const newBookingData = { name, numberOfGuests, date: formattedDate, time: formattedTime };
    localStorage.setItem('bookingData', JSON.stringify(newBookingData));

    alert(`✅ Table Booking Successful!\n\n📌 Name: ${name}\n👥 Guests: ${numberOfGuests}\n📅 Date: ${formattedDate}\n⏰ Time: ${formattedTime}`);
  };

  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Welcome to Gourmet Delights</h1>
        <p>Experience the finest flavors crafted with love. Fresh ingredients, exceptional taste, and unforgettable moments.</p>
      </div>

      <div className="about-us">
        <button className="about-us-btn" onClick={toggleAboutUsMessage}>About Us</button>
        {showAboutUsMessage && (
          <div className="about-us-message">
            <p>At Gourmet Delights, we bring you a fusion of traditional and modern flavors. Our chefs are dedicated to serving mouthwatering dishes made from the freshest ingredients.</p>
          </div>
        )}
      </div>

      <div className="cta-container">
        <h2>Craving Something Delicious?</h2>
        <p>Explore our menu and treat yourself to a delightful meal.</p>
        <Link to="/menu">
          <button className="cta-button">Browse Menu</button>
        </Link>
        <button className="cta-button" onClick={toggleContactForm}>Contact Us</button>
        <button className="cta-button" onClick={toggleSpecialOffers}>Special Offers</button>
        <button className="cta-button" onClick={toggleBookTableForm}>Book a Table</button>
      </div>

      {showOffers && (
        <div className="special-offers">
          <h3>Today's Specials ✨</h3>
          <ul>
            <li>🎉 Buy 1 Get 1 Free on All Pizzas!</li>
            <li>🔥 20% Off on Orders Above $50!</li>
            <li>🥤 Free Drink with Every Burger!</li>
          </ul>
        </div>
      )}

      {/* ✅ Book a Table Form (Updated Output) */}
      {showBookTableForm && (
        <div className="book-a-table-form">
          <h3>Book a Table</h3>
          <form onSubmit={handleTableBookingSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="number" name="guests" placeholder="Number of Guests" required />
            <div className="date-time-container">
              <input type="date" name="date" required style={{ marginRight: '10px' }} />
              <input type="time" name="time" required />
            </div>
            <button type="submit">Reserve Table</button>
          </form>
        </div>
      )}

      {/* Contact Form (Kept Same) */}
      {showContactForm && (
        <div className="contact-form">
          <h3>Contact Us</h3>
          <form onSubmit={(event) => {
            event.preventDefault();
            alert("Your message has been submitted successfully! We will contact you soon.");
            setShowContactForm(false);
          }}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="4" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      )}

      <div className="social-links">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon facebook" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon instagram" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon twitter" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
