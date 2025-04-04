import { useState } from 'react'

const Footer = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const submitForm = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setIsLoading(false)
      setForm({ name: '', email: '', message: '' })
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    }, 1500)
  }

  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About FreshJuice</h3>
          <p>We're committed to providing the freshest, most nutritious cold-pressed juices delivered straight to your door.</p>
          <div className="socials">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
        
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#locations">Locations</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
        
        <div className="footer-section contact-form">
          <h3>Contact Us</h3>
          {!submitted ? (
            <form onSubmit={submitForm}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name" 
                  required
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email" 
                  required
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message" 
                  required
                  className="input-field"
                ></textarea>
              </div>
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {!isLoading ? (
                  'Send Message'
                ) : (
                  <span className="loading">
                    <span className="loading-dot"></span>
                    <span className="loading-dot"></span>
                    <span className="loading-dot"></span>
                  </span>
                )}
              </button>
            </form>
          ) : (
            <div className="success-message">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <p>Thank you for your message! We'll get back to you soon.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 DessieJuice. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer