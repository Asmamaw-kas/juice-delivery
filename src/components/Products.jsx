import mongodb from '../assets/juices/mongodb.png'
import image22 from '../assets/juices/image22.png'
import threeglass from '../assets/juices/threeglass.png'

const Products = ({ addToCart }) => {
    const products = [
      {
        id: 1,
        name: 'Green Detox',
        description: 'Kale, Spinach, Apple, Lemon, Ginger',
        price: 1.9,
        image: image22
      },
      {
        id: 2,
        name: 'Red Boost',
        description: 'Beetroot, Carrot, Ginger, Orange',
        price: 1.3,
        image: threeglass
      },
      {
        id: 3,
        name: 'Sunshine',
        description: 'Pineapple, Mango, Turmeric, Orange',
        price: 1.22,
        image: mongodb
      },
      {
        id: 4,
        name: 'Purple Power',
        description: 'Blueberry, Blackberry, Apple, Lemon',
        price: 1.9,
        image: image22
      },
      {
        id: 5,
        name: 'Citrus Splash',
        description: 'Orange, Grapefruit, Lemon, Lime',
        price: 1.22,
        image: mongodb
      },
      {
        id: 6,
        name: 'Tropical Bliss',
        description: 'Pineapple, Coconut, Banana, Mango',
        price: 1.3,
        image: threeglass
      }
    ]
  
    const handleAddToCart = (product) => {
      addToCart(product)
      
      // Animation effect
      const button = document.getElementById(`add-to-cart-${product.id}`)
      button.classList.add('clicked')
      setTimeout(() => {
        button.classList.remove('clicked')
      }, 500)
    }
  
    return (
      <section id="products" className="products-section">
        <div className="container">
          <h2>Our Juice Menu</h2>
          <p className="subtitle">Cold-pressed, unpasteurized, and packed with nutrients</p>
          
          <div className="product-grid">
            {products.map(product => (
              <div 
                key={product.id}
                className="product-card"
                style={{ backgroundImage: `url(${product.image})` }}

              >
                <div className="product-overlay">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <span className="price">${product.price.toFixed(2)}</span>
                    <button 
                      id={`add-to-cart-${product.id}`}
                      className="add-to-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default Products
