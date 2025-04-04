import { useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import Products from './components/Products'
import Locations from './components/Locations'
import Footer from './components/Footer'
import OrderPage from './components/OrderPage'
import useCart from './hooks/useCart'

function App() {
  const { cart, addToCart, updateCart } = useCart()
  const [showOrderPage, setShowOrderPage] = useState(false)

  const toggleOrderPage = () => {
    setShowOrderPage(!showOrderPage)
  }

  return (
    <div className="app-container">
      <Header cart={cart} toggleOrder={toggleOrderPage} />
      
      {!showOrderPage ? (
        <main>
          <Home />
          <Products addToCart={addToCart} />
          <Locations />
          <Footer />
        </main>
      ) : (
        <OrderPage 
          cart={cart} 
          updateCart={updateCart}
          closeOrder={toggleOrderPage}
        />
      )}
    </div>
  )
}

export default App