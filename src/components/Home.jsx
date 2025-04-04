import { useEffect } from 'react'
import image1 from '../assets/juices/image1.jpg'
import image5 from '../assets/juices/image5.jpg'
import threeglass from '../assets/juices/threeglass.png'

const Home = () => {
  useEffect(() => {
    const juices = document.querySelectorAll('.juice-item')
    
    juices.forEach((juice, index) => {
      juice.style.animationDelay = `${index * 0.2}s`
    })
  }, [])

  return (
    <section id="home" className="home-section">
      <div className="hero">
        <div className="hero-content">
          <h2>Fresh, Cold-Pressed Juices</h2>
          <p>Delivered to your door daily</p>
          <button className="cta-button">Order Now</button>
        </div>
      </div>
      
      <div className="featured-juices">
        <h3>Today's Specials</h3>
        <div className="juice-grid">
          <div className="juice-item">
            <div className="juice-image ">
              <img src= {image1} alt="image1.jpg" />
            </div>
            <h4>Green Detox</h4>
            <p>Kale, Spinach, Apple, Lemon</p>
          </div>
          <div className="juice-item">
            <div className="juice-image">
              <img src= {image5} alt="collection2.png" />
            </div>
            <h4>Red Boost</h4>
            <p>Beetroot, Carrot, Ginger, Orange</p>
          </div>
          <div className="juice-item">
            <div className="juice-image ">
              <img src={image5} alt="threeglass.png" />
            </div>
            <h4>Sunshine</h4>
            <p>Pineapple, Mango, Turmeric</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home