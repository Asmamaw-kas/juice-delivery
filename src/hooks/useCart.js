import { useState } from 'react'

const useCart = () => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const updateCart = (updatedCart) => {
    setCart(updatedCart)
  }

  return { cart, addToCart, updateCart }
}

export default useCart