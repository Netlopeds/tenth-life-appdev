import React, { useState } from 'react';
import { Container, Row, Col, Button, FormControl } from 'react-bootstrap';
import './shop.css';
import NavigationBar from '../components/Navbar.jsx';
import search from './function.jsx';
import { useCart } from '../functions/CartContext';
import { Modal } from 'react-bootstrap';

// Import images
import catWand from '/Images/Products/cat_wand.webp';
import catFood from '/Images/Products/cat_food.webp';
import catMouse from '/Images/Products/cat_mouse.webp';
import catTreat from '/Images/Products/cat_treat.webp';
import wasteBag from '/Images/Products/waste-bag.webp';
import deodorizationBox from '/Images/Products/deodorization-box.webp';
import garbageBag from '/Images/Products/garbage-bag.jpg';
import catTreats from '/Images/Products/cat-treats.png';
import catFountain from '/Images/Products/cat-fountain.png';
import catLitterCube from '/Images/Products/cat-litter-cube.webp';
import catDryingBox from '/Images/Products/cat-drying-box.png';
import floormat from '/Images/Products/NewPetreeGen2FloormatSquare2_1024x1024.png';

import magnifyingGlass from '/Images/magnifying-glass.png';
import shoppingBag from '/Images/shopping-bag.png';

// Update your products array to use the imported images
const products = [
  { name: "Cat Wand", price: 5.0, image: catWand },
  { name: "Cat Food (M)", price: 10.5, image: catFood },
  { name: "Cat Catnip Chew Toy", price: 15.0, image: catMouse },
  { name: "Cat Treat 5-pack", price: 3.0, image: catTreat },
  { name: "Waste Bag for Petree 2.0 Litter Box", price: 10.0, image: wasteBag },
  { name: "Petree Deodorization Box Smell Remover (Pack of 2)", price: 20.0, image: deodorizationBox },
  { name: "Pet Marvel Waste Bag", price: 5.0, image: garbageBag },
  { name: "Ciao Churu Cat Treats (14g x 20 pcs per pack)", price: 3.0, image: catTreats },
  { name: "Petkit Eversweet 3 Pro Wireless Cat Fountain", price: 80.0, image: catFountain },
  { name: "Pet Marvel Litter Cube", price: 155.0, image: catLitterCube },
  { name: "Redminut Pet Drying Box", price: 250.0, image: catDryingBox },
  { name: "Petree Big Floormat Gen 2", price: 5.5, image: floormat },
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
              <img src={magnifyingGlass} alt="Search" />
            </span>
          </div>
        </div>

        <Container className="shop-inner-container">
          <Row className="g-4">
            {filteredProducts.map((product, idx) => (
              <Col key={idx} md={3} sm={6}>
                <div className="product-item">
                  <img
                    src={product.image}
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
                        <img src={shoppingBag} alt="Add" />
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
                src={selectedProduct.image}
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
