import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    // Send form data to backend (this will be handled by your backend)
    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert("There was an error submitting your form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    }
  };

  return (
    <div className="App">
      {/* Hero Section */}
      <header className="App-header">
        <div className="hero">
          <h1>Welcome to Career Bloom</h1>
          <p>Your career growth starts here</p>
          <button className="cta-btn">Get Started</button>
        </div>
      </header>

      {/* About Section */}
      <section className="About">
        <h2>About Us</h2>
        <p>We help you find the best career opportunities and improve your professional skills.</p>
      </section>

      {/* Services Section */}
      <section className="Services">
        <h2>Our Services</h2>
        <ul>
          <li>Job Placement</li>
          <li>Resume Building</li>
          <li>Interview Preparation</li>
          <li>Career Coaching</li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <section className="Testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial">
          <p>"Career Bloom helped me land my dream job! Their coaching and resume tips made all the difference."</p>
          <span>- Sarah K.</span>
        </div>
        <div className="testimonial">
          <p>"The team at Career Bloom is fantastic! I received personalized support that truly transformed my career."</p>
          <span>- John D.</span>
        </div>
      </section>

      {/* Contact Form Section */}
      {formSubmitted ? (
        <section className="ThankYou">
          <h2>Thank You for Contacting Us!</h2>
          <p>We will get back to you shortly.</p>
        </section>
      ) : (
        <section className="Contact">
          <h2>Contact Us</h2>

          {/* Google Map */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21729.50773943592!2d-4.4361197!3d55.8478708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48884fe73b9ff2ab%3A0x80e57bc1c9d09c4e!2sPaisley%2C%20UK!5e0!3m2!1sen!2suk!4v1712345678901!5m2!1sen!2suk"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>

            
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your Message"
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>

          {/* Contact Info */}
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>Email: <a href="mailto:contact@careerbloom.com">contact@careerbloom.com</a></p>
            <p>Phone: <a href="tel:+1234567890">+1 234-567-890</a></p>
          </div>
        </section>
      )}

      {/* Footer Section */}
      <footer className="App-footer">
        <p>&copy; 2024 Career Bloom. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

