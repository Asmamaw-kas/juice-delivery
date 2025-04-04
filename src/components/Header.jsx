import CartIcon from './CartIcon'

const Header = ({ cart, toggleOrder }) => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Dessie<span>Juice</span></h1>
      
      </div>
      
      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#locations">Locations</a>
        <a href="#contact">Contact</a>
      </nav>
      
      <CartIcon cart={cart} toggleOrder={toggleOrder} />
    </header>
  )
}

export default Header