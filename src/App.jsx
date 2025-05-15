import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import { CartProvider } from './functions/CartContext.jsx';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Welcome from "./pages/welcome.jsx";
import Shop from './pages/shop.jsx';
import About from './pages/aboutus.jsx';
import CheckOut from './pages/checkout.jsx';


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const users = [
    { username: "steve@gmail.com", password: "1234" },
    { username: "creeper@gmail.com", password: "0000" },
  ];

  const handleLogin = (event) => {
    event.preventDefault();
    const userExists = users.find(user => user.username === username.toLowerCase());

    if (!userExists) {
      setErrorMessage("The account you entered is not registered.");
      setShowModal(true);
    } else if (userExists.password !== password) {
      setErrorMessage("Please check, Your password may be Incorrect.");
      setShowModal(true);
    } else {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', userExists.username);
      setIsLoggingIn(true);
      setTimeout(() => navigate("/welcome"), 700);
    }
  };

  return (
    <Container fluid className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#fffdf0', minHeight: '100vh', position: 'relative', paddingBottom: '100px' }}>
      <Navbar bg="transparent" className="ps-4 pt-3">
        <Navbar.Brand href="#home" className="d-flex align-items-center justify-content-center justify-content-md-start w-100">
          <Image src="/Images/Logo.webp" width="40" height="40" className="d-inline-block align-top me-2" />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Tenth Life</span>
        </Navbar.Brand>
      </Navbar>
      <Row className="flex-grow-1 align-items-center justify-content-center px-4" style={{ minHeight: '80vh', padding: '0 5rem', marginTop: '-1rem', marginBottom: '7.5rem' }}>
        <Col xs={12} md={6} className="d-flex justify-content-center mt-4 mt-md-0" style={{ marginTop: '-6rem' }}>
          <Card id="card-login" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
            <div style={{ position: 'absolute', top: '-5rem', left: '13rem', zIndex: 1 }}>
              <Image id="design2-image" src="/Images/Design2.png" width="160" />
            </div>
            <Card.Body>
              <Card.Title id="card-title" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Login</Card.Title>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" value={username} className="card-input" onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" value={password} className="card-input" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button id="card-login-button" variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className="mt-5 mt-md-0" style={{ zIndex: 1, marginTop: '-5rem' }}>
          <Card style={{ width: '40rem', backgroundColor: 'transparent', border: 'none', position: 'relative' }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#003344', marginBottom: '1rem' }}>
                Meow-come! <Image src="/Images/PawPrints.png" width="80" height="80" className="ms-3" />
              </Card.Title>
              <Card.Text style={{ fontSize: '1.4rem', color: '#444', lineHeight: '1.8' }}>
                Welcome to our webstore! Here you can find the best cat treats that will
                surely give them the tenth life flavors. Make sure to grab some from our
                new best seller treats!
              </Card.Text>

              <Row className="mt-4">
                <Col xs={12} md={6} className="d-flex align-items-start mb-3 mb-md-0">
                  <Image src="/Images/Phone.png" width="30" height="30" className="me-2" />
                  <div>
                    <h5 style={{ fontWeight: 'bold' }}>Phone</h5>
                    <p style={{ margin: 0 }}>09123456789</p>
                  </div>
                </Col>
                <Col xs={12} md={6} className="d-flex align-items-start">
                  <Image src="/Images/Email.png" width="30" height="30" className="me-2" />
                  <div>
                    <h5 style={{ fontWeight: 'bold' }}>Email</h5>
                    <p style={{ margin: 0 }}>tenthlifefoods@gmail.com</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Cat Image and Decorations */}
      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', marginTop: '-25vh', zIndex: 2, left: "50%", transform: 'translateX(-50%)' }}>
        <Image src="/Images/CatsOrange.png" max-width="1000" height="auto" />
      </div>
      <div style={{ position: 'absolute', top: '20vh', right: '23vh' }}>
        <Image src="/Images/Design1.png" className="design1-image" width="100" height="100"></Image>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '160px', backgroundColor: '#d27749', zIndex: 1 }}>
      </div>

      {/* Error Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Problem!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
