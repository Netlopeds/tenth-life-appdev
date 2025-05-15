import React, { useState } from 'react';
import { Container, Row, Col, Button, FormControl } from 'react-bootstrap';
import './shop.css';
import NavigationBar from '../components/Navbar.jsx';
import search from './function.jsx';
import { useCart } from '../functions/CartContext';
import { Modal } from 'react-bootstrap';


const products = [
  { name: "Cat Wand", price: 5.0, image: "cat_wand.webp" },
  { name: "Cat Food (M)", price: 10.5, image: "cat_food.webp" },
  { name: "Cat Catnip Chew Toy", price: 15.0, image: "cat_mouse.webp" },
  { name: "Cat Treat 5-pack", price: 3.0, image: "cat_treat.webp" },
  { name: "Waste Bag for Petree 2.0 Litter Box", price: 10.0, image: "waste-bag.webp" },
  { name: "Petree Deodorization Box Smell Remover (Pack of 2)", price: 20.0, image: "Deodorization Box.webp" },
  { name: "Pet Marvel Waste Bag", price: 5.0, image: "garbage-bag.jpg" },
  { name: "Ciao Churu Cat Treats (14g x 20 pcs per pack)", price: 3.0, image: "cat-treats.png" },
  { name: "Petkit Eversweet 3 Pro Wireless Cat Fountain", price: 80.0, image: "cat-fountain.png" },
  { name: "Pet Marvel Litter Cube", price: 155.0, image: "cat-litter-cube.webp" },
  { name: "Redminut Pet Drying Box", price: 250.0, image: "cat-drying-box.png" },
  { name: "Petree Big Floormat Gen 2", price: 5.5, image: "NewPetreeGen2FloormatSquare2_1024x1024.png" },
];

function Shop() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProducts = search(products, searchTerm);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  
  return (
    <div className="shop-body">
      <NavigationBar />

      <Container fluid className="shop-container p-4">
        <div id="shop_banner" className="text-center py-5 mt-3 mb-5">
          <h1 id="banner-text" className="fw-bold">Check Out Our Pur-fect Shop</h1>
          <div className="custom-search-bar mt-4 mx-auto">
            <FormControl
              className="search-text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">
              <img src="/Images/magnifying-glass.png" alt="Search" />
            </span>
          </div>
        </div>

        <Container className="shop-inner-container">
          <Row className="g-4">
            {filteredProducts.map((product, idx) => (
              <Col key={idx} md={3} sm={6}>
                <div className="product-item">
                  <img
                    src={`/Images/Products/${product.image}`}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info mt-2">
                    <div className="product-name">{product.name}</div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <span className="product-price">${product.price.toFixed(2)}</span>
                      <Button
                        variant="warning"
                        size="sm"
                        className="add-button"
                        onClick={() => {
                          setSelectedProduct(product);
                          setQuantity(1); 
                          setShowModal(true); 
                        }}
                      >
                        <img src="/Images/shopping-bag.png" alt="Add" />
                        <span className="add-text">ADD</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          {filteredProducts.length === 0 && (
            <div className="text-center mt-5">
              <h4>No products found.</h4>
            </div>
          )}
        </Container>
      </Container>
       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Select Quantity</Modal.Title>
  </Modal.Header>
  <Modal.Body className="text-center">
    {selectedProduct && (
      <>
        <img
          src={`/Images/Products/${selectedProduct.image}`}
          alt={selectedProduct.name}
          style={{
            width: '120px',
            height: '120px',
            objectFit: 'cover',
            borderRadius: '10px',
            marginBottom: '10px',
          }}
        />
        <h5>{selectedProduct.name}</h5>
        <div className="text-muted">Price per item: ${selectedProduct.price.toFixed(2)}</div>
      </>
    )}
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Button variant="secondary" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</Button>
      <span className="mx-4 fs-4">{quantity}</span>
      <Button variant="secondary" onClick={() => setQuantity(q => q + 1)}>+</Button>
    </div>

    {/* Total Price Display */}
    {selectedProduct && (
      <div className="mt-3 fw-bold" style={{ fontSize: '1.2rem' }}>
        Total: ${(selectedProduct.price * quantity).toFixed(2)}
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
    <Button
      variant="warning"
      onClick={() => {
        addToCart(selectedProduct, quantity);
        setShowModal(false);
      }}
    >
      Add {quantity} to Cart
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
}

export default Shop;
