import { Container, Nav, Navbar, Image, Row, Col, Button, Card } from "react-bootstrap";
import './welcomestyle.css';
import NavigationBar from '../components/Navbar.jsx';
import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="welcome-page">
            <NavigationBar />

            <Container id="welcome-body" fluid className="text-center mt-5">
                <div className="cat-banner">
                    <div className="banner-content text-center">
                        <h1 className="banner-title">MEOW-COME!</h1>
                    </div>
                </div>

                <div className="full-width-banner">
                    <Row className="g-0 align-items-end ps-5" style={{ minHeight: '300px' }}>
                        <Col md={6} sm={12} xs={12} className="left-banner-content">
                            <p className="banner-description">Give them a Paw-Some Time!</p>
                            <Button variant="dark" className="shop-now-btn mt-3" onClick={() => navigate('/shop')}>
                                Shop Now <span className="ms-2"><Image id="shop-arrow" src={`${import.meta.env.BASE_URL}Images/shop_now_arrow.png`} alt="arrow" fluid rounded /></span>
                            </Button>
                            <p className="satisfied-text">Below are some Satisfied Meow-stomers!</p>
                            <Image src={`${import.meta.env.BASE_URL}Images/Big Paw Print.png`} alt="Paw Prints" className="big-paw-print"/>
                        </Col>
                        <Col md={6} sm={12} xs={12} className="p-0"> 
                                <Image src={`${import.meta.env.BASE_URL}Images/cat_cropped.png`} alt="Cat Eating" className="cat-eating-img"/>
                        </Col>
                    </Row>
                </div>

                <Row className="card-row mt-5 justify-content-center">
                    {[
                        {
                            img: `${import.meta.env.BASE_URL}Images/cat playing toy.jpg`,
                            text: "This playful kitty loves chewing on its favorite plush toy! Great for teething relief and endless fun."
                        },
                        {
                            img: `${import.meta.env.BASE_URL}Images/cat playing toy 2.jpg`,
                            text: "Energetic and full of life, this kitten can’t get enough of its colorful feather wand. Ideal for interactive playtime!"
                        },
                        {
                            img: `${import.meta.env.BASE_URL}Images/cat playing toy 3.webp`,
                            text: "Always on the lookout, this curious cat rules its climbing tower kingdom. Perfect for cats that love to perch and pounce."
                        }
                    ].map((card, index) => (
                        <Col md={3} key={index}>
                            <Card className="card h-100 text-center border-0 position-relative">
                                <div className="heart-icon-placeholder">
                                    <Image src={`${import.meta.env.BASE_URL}Images/heart.png`} alt="Heart" width={20} height={20} />
                                </div>
                                <Card.Img variant="top" src={card.img} alt={`Cat ${index + 1}`} />
                                <Card.Body>
                                    <Card.Text className="card-text">
                                        {card.text}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}

                    <Col md={1} className="text-center">
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Button id ="about-btn" variant="outline-dark" style={{ borderRadius: "50%", width: "80px", height: "80px", padding: "0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem"}} onClick={() => navigate('/about')}>
                                <Image src={`${import.meta.env.BASE_URL}Images/About_us_arrow.png`} alt="arrow" fluid rounded />
                            </Button>
                            <div className ="about-btn-text" style={{ marginTop: "8px", fontSize: "1rem", fontWeight: "bold" }}>
                                About Us
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Welcome;
