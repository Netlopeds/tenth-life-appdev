import { Navbar, Nav, Image, Button, Dropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../functions/CartContext';

function NavigationBar() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, decreaseQuantity, increaseQuantity } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('cartItems');
    window.location.href = '/'; // redirect to login
  };

  return (
    <Navbar bg="transparent" expand="lg" className="px-4 pt-3 position-relative">
      <Navbar.Brand as={Link} to="/welcome" className="d-flex align-items-center">
        <Image src="/Images/Logo.webp" width="40" height="40" className="d-inline-block align-top me-2" />
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Tenth Life</span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="position-absolute top-50 start-50 translate-middle">
          <Nav.Link as={NavLink} to="/welcome" className="nav-item mx-3">Welcome</Nav.Link>
          <Nav.Link as={NavLink} to="/shop" className="nav-item mx-3">Shop</Nav.Link>
          <Nav.Link as={NavLink} to="/about" className="nav-item mx-3">About Us</Nav.Link>
        </Nav>

        <div className="d-flex align-items-center ms-auto gap-3">
          <Button
            variant="outline-dark"
            style={{ borderRadius: "30px", padding: "5px 20px", fontWeight: "bold" }}
            onClick={() => navigate('/checkout')}
          >
            Check-Out
          </Button>

          {/* Cart Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" className="p-0 border-0 bg-transparent">
              <Image src="/Images/shopcart.png" alt="Shopping Cart" width="30" height="30" />
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ minWidth: '300px' }}>
          <Dropdown.Header>Your Cart</Dropdown.Header>
  
          {cartItems.length === 0 ? (
            <Dropdown.ItemText className="text-muted">Cart is empty</Dropdown.ItemText>
          ) : (
    <>
      {/* SCROLLABLE CONTAINER FOR ITEMS */}
      <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
        {cartItems.map((item, index) => (
          <Dropdown.ItemText key={index} className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Image
                src={`/Images/Products/${item.image}`}
                width={40}
                height={40}
                className="me-2"
                style={{ objectFit: 'cover', borderRadius: '5px' }}
              />
              <div>
                <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                <small>Qty: {item.quantity} | ${(item.price * item.quantity).toFixed(2)}</small>
              </div>
            </div>
              <div className="d-flex gap-2">
                <Button variant="primary" size="sm" onClick={() => increaseQuantity(item.name)}>+</Button>
                <Button variant="secondary" size="sm" onClick={() => decreaseQuantity(item.name)}>-</Button>
                <Button variant="danger" size="sm" onClick={() => removeFromCart(item.name)}>✕</Button>
              </div>
              </Dropdown.ItemText>
              ))}
              </div>

                {/* Footer Info */}
                <Dropdown.Divider />
                <Dropdown.ItemText className="fw-bold d-flex justify-content-between">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </Dropdown.ItemText>
                <Dropdown.Item className="text-center">
                  <Button variant="dark" size="sm" onClick={() => navigate('/checkout')}>
                    Go to Checkout
                  </Button>
                </Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>

          </Dropdown>

          {/* Profile Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" className="p-0 border-0 bg-transparent">
              <Image src="/Images/profile.png" alt="Profile Icon" width="30" height="30" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>{username || 'Guest'}</Dropdown.Header>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
