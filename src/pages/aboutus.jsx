import { Carousel } from "react-bootstrap";
import './aboutus.css';
import NavigationBar from '../components/Navbar.jsx';
import { useState } from "react";

function About() {
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    return (
        <div className="about-body">
            <NavigationBar />
            <div className="about-header">
                <p className="subtitle">GET TO KNOW US!</p>
                <h2 className="title">About the Team <span className="underline"></span></h2>
            </div>

            <Carousel indicators={true} controls={true} interval={null} className="about-carousel">
                

                {/* Slide 1 */}
                <Carousel.Item>
                    <div className="cards-wrapper">
                        {/* Card 1 */}
                        <div
                            className={`testimonial-card-side ${hoveredCard !== null && hoveredCard !== 4 ? 'blurred' : ''}`}
                            onMouseEnter={() => handleMouseEnter(4)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="quote-icon">❝</div>
                            <p className="testimonial-text">
                                Cats are like humans to others. That's why we make sure to give a life worth meowing for.
                            </p>
                            <div className="profile">
                                <img src={`${import.meta.env.BASE_URL}Images/Members/KelvinPFP.jpg`} className="profile-pic" alt="Kelvin" />
                                <div className="profile-name">
                                    <span className="last-name">GUILLERMO,</span>
                                    <span className="first-name">Kelvin Yuan M.</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 - Middle */}
                        <div
                            className={`testimonial-card middle ${hoveredCard !== null && hoveredCard !== 5 ? 'blurred' : ''}`}
                            onMouseEnter={() => handleMouseEnter(5)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="quote-icon">❝</div>
                            <p className="testimonial-text">
                                Dedicated to seeing cat owners and their pets to create wonderful and memorable meow-ments together.
                            </p>
                            <div className="profile">
                                <img src={`${import.meta.env.BASE_URL}Images/Members/Perez.PNG`} className="profile-pic" alt="Neil" />
                                <div className="profile-name">
                                    <span className="last-name">PEREZ,</span>
                                    <span className="first-name">Neil Sam R.</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div
                            className={`testimonial-card-side ${hoveredCard !== null && hoveredCard !== 6 ? 'blurred' : ''}`}
                            onMouseEnter={() => handleMouseEnter(6)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="quote-icon">❝</div>
                            <p className="testimonial-text">
                                I joined this project to ensure that cats receive the care, love, and attention they deserve.
                            </p>
                            <div className="profile">
                                <img src={`${import.meta.env.BASE_URL}Images/Members/Marco.jpg`} className="profile-pic" alt="Marco" />
                                <div className="profile-name">
                                    <span className="last-name">ARANTE,</span>
                                    <span className="first-name">Marco C.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="cards-wrapper">
                        {/* Card 4 */}
                        <div
                            className={`testimonial-card-side ${hoveredCard !== null && hoveredCard !== 1 ? 'blurred' : ''}`}
                            onMouseEnter={() => handleMouseEnter(1)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="quote-icon">❝</div>
                            <p className="testimonial-text">
                               I joined this project to ensure that cats receive the care, love, and attention they deserve.
                            </p>
                            <div className="profile">
                                <img src={`${import.meta.env.BASE_URL}Images/Members/Marco.jpg`} className="profile-pic" alt="Marco" />
                                <div className="profile-name">
                                    <span className="last-name">ARANTE,</span>
                                    <span className="first-name">Marco C.</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 5 - Middle */}
                        <div
                            className={`testimonial-card middle ${hoveredCard !== null && hoveredCard !== 2 ? 'blurred' : ''}`}
                            onMouseEnter={() => handleMouseEnter(2)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="quote-icon">❝</div>
                            <p className="testimonial-text">
                                Dedicated to make a difference, one purr at a time to provide cats and their owners love and warmth.
                            </p>
                            <div className="profile">
                                <img src={`${import.meta.env.BASE_URL}Images/Members/IMG_1809.JPG`} className="profile-pic" alt="Audrey" />
                                <div className="profile-name">
                                    <span className="last-name">BUGAYONG,</span>
                                    <span className="first-name">Mikhaella Audrey G.</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 6 */}
                        <div
                            className={`testimonial-card-side ${hoveredCard !== null && hoveredCard !== 3 ? 'blurred' : ''}`}
                            onMouseEnter={() => handleMouseEnter(3)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="quote-icon">❝</div>
                            <p className="testimonial-text">
                                Cats should be seen as family, and they should be treated as such by all cat owners.
                            </p>
                            <div className="profile">
                                <img src={`${import.meta.env.BASE_URL}Images/Members/GambePFP.jpg`} className="profile-pic" alt="Gabriel" />
                                <div className="profile-name">
                                    <span className="last-name">GAMBE,</span>
                                    <span className="first-name">Gabriel Paul Auren Z.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>

            <img src={`${import.meta.env.BASE_URL}Images/squigly about.png`} alt="bot left squigly" className="bot-left-squig" />
            <img src={`${import.meta.env.BASE_URL}Images/loop about.png`} alt="bot right loop" className="bot-right-loop" />
        </div>
    );
}

export default About;
