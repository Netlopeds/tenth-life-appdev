import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form, InputGroup, Alert, Navbar, Image, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../functions/CartContext';

function CheckoutPage() {
  const { cartItems, removeFromCart, decreaseQuantity, increaseQuantity } = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const finalTotal = (totalPrice - discountAmount).toFixed(2);
  const isCardDetailsComplete = cardNumber.length === 19 && expDate.length === 5 && cvv.length === 3;
  const isContinueEnabled = paymentMethod || isCardDetailsComplete;

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const handlePayment = (method) => {
    setPaymentMethod(method);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCardNumberChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, '').slice(0, 16);
    let formattedValue = rawValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formattedValue);
  };

  const handleExpDateChange = (e) => {
    let value = e.target.value.replace(/[^0-9/]/g, '');
    if (value.length === 2 && !value.includes('/')) {
      value = value + '/';
    }
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    setExpDate(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(value);
  };

  const applyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    if (voucherApplied) {
      setShowVoucherModal(true);
      return;
    }
    if (code === "TENTHLIFE10") {
      setDiscountAmount(totalPrice * 0.10);
      setVoucherApplied(true);
    } else if (code === "PAWPATROL30") {
      setDiscountAmount(totalPrice * 0.30);
      setVoucherApplied(true);
    } else {
      setDiscountAmount(0);
      setVoucherApplied(false);
    }
  };

  const cancelDiscount = () => {
    setDiscountAmount(0);
    setVoucherApplied(false);
    setDiscountCode('');
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: '#faf8f2', minHeight: '100%' }}>
      <Navbar bg="transparent" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/welcome" className="d-flex align-items-center">
            <Image src={`${import.meta.env.BASE_URL}Images/Logo.webp`} width="40" height="40" className="me-2" />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000' }}>Tenth Life</span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Row className="mb-5 justify-content-center">
        {['Payment', 'Delivery', 'Review & Order'].map((step, index) => (
          <Col key={step} xs={4} className="d-flex flex-column align-items-center position-relative">
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#000', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', zIndex: 1 }}>{index + 1}</div>
            <div style={{ fontWeight: 'bold', color: '#333', marginTop: '5px' }}>{step}</div>
            {index < 2 && (<div style={{ position: 'absolute', top: '20px', right: '-50%', width: '100%', height: '2px', backgroundColor: '#000', zIndex: 0 }} />)}
          </Col>
        ))}
      </Row>

      {confirmed && (
        <Row className="justify-content-center mb-4">
          <Col md={6}><Alert variant="success" className="text-center fw-bold">✅ Payment Confirmed!</Alert></Col>
        </Row>
      )}
      {cartItems.length === 0 && (
        <Row className="justify-content-center mb-4">
          <Col md={6}><Alert variant="danger" className="text-center fw-bold">🚫 You can not proceed to payment. Please select at least one product.</Alert></Col>
        </Row>
      )}

      <Row className="justify-content-center align-items-start">
        <Col lg={6} md={12} className="mb-4">
          <Card className="p-4 shadow-sm w-100" style={{ borderRadius: '15px', minHeight: '320px' }}>
            <h2 className="mb-4" style={{ fontWeight: 'bold', color: '#023047' }}>Check-Out</h2>
            <p style={{ fontWeight: 'bold', color: '#333' }}>Pay with:</p>
            <Row className="mb-3">
              <Col>
                <Button variant="light" className="w-100 border d-flex justify-content-center align-items-center gap-2" onClick={() => handlePayment('QRPAY')} disabled={cartItems.length === 0}>
                  <img src={`${import.meta.env.BASE_URL}Images/QR PH.png`} alt="QRPAY" style={{ height: '24px' }} />
                </Button>
              </Col>
              <Col>
                <Button variant="primary" className="w-100 d-flex justify-content-center align-items-center gap-2" onClick={() => handlePayment('GCASH')} disabled={cartItems.length === 0}>
                  <img src={`${import.meta.env.BASE_URL}Images/GCASH.png`} alt="Gcash" style={{ height: '24px' }} /><span>GCASH</span>
                </Button>
              </Col>
              <Col>
                <Button variant="dark" className="w-100 d-flex justify-content-center align-items-center gap-2" onClick={() => handlePayment('GPAY')} disabled={cartItems.length === 0}>
                  <img src={`${import.meta.env.BASE_URL}Images/Gpay.png`} alt="Gpay" style={{ height: '24px' }} />
                </Button>
              </Col>
            </Row>
            <div className="text-center mb-3"><strong style={{ color: '#666' }}>OR</strong></div>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#555' }}>Credit Card Number</Form.Label>
                <Form.Control type="text" style={{ borderRadius: '8px' }} value={cardNumber} onChange={handleCardNumberChange} maxLength={19} placeholder="1111 2222 3333 4444" />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#555' }}>EXP Date</Form.Label>
                    <Form.Control type="text" style={{ borderRadius: '8px' }} value={expDate} onChange={handleExpDateChange} maxLength={5} placeholder="MM/YY" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#555' }}>CVV2</Form.Label>
                    <Form.Control type="text" style={{ borderRadius: '8px' }} value={cvv} onChange={handleCvvChange} maxLength={3} placeholder="CVV" />
                  </Form.Group>
                </Col>
              </Row>
              <Form style={{ paddingBottom: '80px', position: 'relative' }}>
                <Button variant="dark" style={{ position: 'absolute', bottom: '20px', right: '20px', borderRadius: '10px', fontWeight: 'bold', fontSize: '1.1rem', padding: '12px 20px' }} onClick={handleConfirm} disabled={!isContinueEnabled || cartItems.length === 0}>Continue to Shipping</Button>
              </Form>
            </Form>
          </Card>
        </Col>

        <Col lg={4} md={12}>
          <Card className="p-4 shadow-sm w-100" style={{ borderRadius: '15px', backgroundColor: '#fff' }}>
            <h3 className="mb-4" style={{ fontWeight: 'bold', color: '#023047' }}>ITEMS:</h3>
            {cartItems.length === 0 ? (
              <div className="text-muted">Your cart is empty.</div>
            ) : (
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {cartItems.map((item, index) => (
                  <div key={index} className="mb-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <img src={`${import.meta.env.BASE_URL}Images/Products/${item.image}`} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', marginRight: '10px' }} />
                      <div>
                        <strong>{item.name}</strong>
                        <div>Qty: {item.quantity}</div>
                        <div>${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <Button variant="primary" size="sm" onClick={() => increaseQuantity(item.name)}>+</Button>
                      <Button variant="secondary" size="sm" onClick={() => decreaseQuantity(item.name)}>-</Button>
                      <Button variant="danger" size="sm" onClick={() => removeFromCart(item.name)}>✕</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <InputGroup className="mt-4">
            <Form.Control placeholder="Gift cards or Store code" style={{ borderRadius: '8px', fontSize: '1.1rem' }} value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
            <Button variant="secondary" style={{ borderRadius: '8px', fontSize: '1.1rem' }} onClick={applyDiscount}>APPLY</Button>
          </InputGroup>

          {voucherApplied && (
            <Button variant="danger" className="mt-2 w-100" onClick={cancelDiscount}>Cancel Voucher</Button>
          )}

          <div className="mt-4 px-3" style={{ fontWeight: 'bold', color: '#000' }}>
            <div className="d-flex justify-content-between mb-2" style={{ fontSize: '1.6rem' }}>
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="d-flex justify-content-between mb-2" style={{ fontSize: '1.6rem', color: 'red' }}>
                <span>Discount:</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="d-flex justify-content-between mb-2" style={{ fontSize: '1.6rem' }}>
              <span>Shipping:</span>
              <span>$0.00</span>
            </div>

            <div style={{ borderTop: '3px solid #000000', margin: '1rem 0', opacity: 1 }} />

            <div className="d-flex justify-content-between mt-3" style={{ fontSize: '1.8rem' }}>
              <span>TOTAL:</span>
              <span>${finalTotal}</span>
            </div>
          </div>

          <Modal show={showModal} onHide={closeModal} centered>
            <Modal.Body className="text-center">✅ Successfully Paid!</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={closeModal}>Continue to Shipping</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    {/* Voucher Modal */}
      <Modal show={showVoucherModal} onHide={() => setShowVoucherModal(false)} centered>
        <Modal.Body className="text-center">⚠️ Only 1 voucher can be applied at a time</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowVoucherModal(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CheckoutPage;
