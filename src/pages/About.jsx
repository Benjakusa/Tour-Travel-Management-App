import React, { useState, useEffect } from 'react';
import './About.css';

const About = () => {
    const [activeTab, setActiveTab] = useState('kenya');

    useEffect(() => {
        // Add animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.about-reason, .about-mv-card, .about-service-card, .about-value');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });

        return () => {
            animatedElements.forEach(el => observer.unobserve(el));
        };
    }, []);

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-container">
                    <div className="about-hero-content">
                        <h1>Your Gateway to Extraordinary East African Adventures</h1>
                        <p>Akothee Safaris is a premier, fully licensed travel and events management company based in the heart of Kenya, crafting unforgettable journeys across East Africa since our inception.</p>
                        <a href="#contact" className="about-btn about-btn-secondary">Start Planning Your Journey</a>
                    </div>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="about-who-we-are about-section" id="who-we-are">
                <div className="about-container">
                    <div className="about-section-title">
                        <h2>Who We Are</h2>
                        <p>Discover the passion and expertise behind Akothee Safaris, your trusted partner in East African travel.</p>
                    </div>
                    <div className="about-who-content">
                        <div className="about-who-text">
                            <h3>Creating Tailor-Made African Experiences</h3>
                            <p>We understand that every traveler is unique. That's why our seasoned team of travel consultants and expert local guides work closely with you to design seamless itineraries that perfectly match your interests, preferences, and budget.</p>
                            <p>Whether you're an individual seeking solitude, a family creating memories, corporate groups on retreat, or adventure seekers chasing adrenaline, we build journeys that resonate deeply and create stories that last a lifetime.</p>
                            <p>Our deep-rooted expertise in Africa's tourism landscape ensures meticulous planning and personalized services that cater to the specific needs of each client.</p>
                            <a href="#contact" className="about-btn">Contact Our Team</a>
                        </div>
                        <div className="about-who-image">
                            <img src="https://images.unsplash.com/photo-1587976381365-db1c6f0dfe43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Akothee Safaris Team on Safari" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="about-mission-vision about-section">
                <div className="about-container">
                    <div className="about-section-title">
                        <h2>Our Mission & Vision</h2>
                        <p>Guiding principles that define our commitment to exceptional travel experiences</p>
                    </div>
                    <div className="about-mv-container">
                        <div className="about-mv-card">
                            <i className="fas fa-bullseye"></i>
                            <h3>Our Mission</h3>
                            <p>To provide exceptional and authentic travel experiences through customized, stress-free, and meticulously planned itineraries that showcase the beauty of Africa. We create memorable journeys that connect you with Africa's most stunning destinations, ensuring your comfort, safety, and enjoyment at every step.</p>
                        </div>
                        <div className="about-mv-card">
                            <i className="fas fa-eye"></i>
                            <h3>Our Vision</h3>
                            <p>To be the leading travel and events management company in East Africa, recognized for our unwavering commitment to quality, personalized service, and deep regional expertise. We aim to set new benchmarks in the travel industry by continuously innovating and exceeding expectations.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="about-why-choose-us-section about-section">
                <div className="about-container">
                    <div className="about-section-title">
                        <h2>Why Travel With Us?</h2>
                        <p>Discover what sets Akothee Safaris apart as your premier East African travel partner</p>
                    </div>
                    <div className="about-reasons">
                        <div className="about-reason">
                            <div className="about-reason-icon">
                                <i className="fas fa-map-marked-alt"></i>
                            </div>
                            <h4>Bespoke Itineraries</h4>
                            <p>Your dream trip, designed by you and perfected by us. We specialize in tailoring every detail to reflect your personal travel style.</p>
                        </div>
                        <div className="about-reason">
                            <div className="about-reason-icon">
                                <i className="fas fa-users"></i>
                            </div>
                            <h4>Unmatched Local Expertise</h4>
                            <p>Intimate knowledge of East Africa's hidden gems, cultures, and logistics for authentic experiences you won't find elsewhere.</p>
                        </div>
                        <div className="about-reason">
                            <div className="about-reason-icon">
                                <i className="fas fa-concierge-bell"></i>
                            </div>
                            <h4>Comprehensive Service</h4>
                            <p>Your single point of contact for a flawless journey—from flights and accommodation to visas and transport.</p>
                        </div>
                        <div className="about-reason">
                            <div className="about-reason-icon">
                                <i className="fas fa-award"></i>
                            </div>
                            <h4>Commitment to Excellence</h4>
                            <p>Fully accredited with the highest service standards and commitment to sustainable, responsible tourism.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="about-services-overview about-section">
                <div className="about-container">
                    <div className="about-section-title">
                        <h2>Our Comprehensive Services</h2>
                        <p>End-to-end travel solutions designed for seamless, stress-free experiences</p>
                    </div>
                    <div className="about-services-grid">
                        <div className="about-service-card">
                            <div className="about-service-img">
                                <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Flight Booking" />
                            </div>
                            <div className="about-service-content">
                                <h3>Air Ticketing & Logistics</h3>
                                <p>We handle all flight bookings with flexible options for both business and leisure travelers, ensuring the best schedules and value for your journey.</p>
                                <a href="#contact" className="about-btn">Book Flights</a>
                            </div>
                        </div>
                        <div className="about-service-card">
                            <div className="about-service-img">
                                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Accommodation" />
                            </div>
                            <div className="about-service-content">
                                <h3>Accommodation & Stays</h3>
                                <p>From luxury lodges to boutique hotels, we secure quality accommodations at competitive rates across East Africa.</p>
                                <a href="#contact" className="about-btn">Find Stays</a>
                            </div>
                        </div>
                        <div className="about-service-card">
                            <div className="about-service-img">
                                <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tours & Activities" />
                            </div>
                            <div className="about-service-content">
                                <h3>Tours & Activities</h3>
                                <p>Tailored experiences including wildlife safaris, cultural immersions, adventure activities, and exclusive guided tours.</p>
                                <a href="#contact" className="about-btn">Explore Tours</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="about-core-values about-section">
                <div className="about-container">
                    <div className="about-section-title">
                        <h2>Our Core Values</h2>
                        <p>The principles that guide every journey we create</p>
                    </div>
                    <div className="about-values-container">
                        <div className="about-value">
                            <i className="fas fa-smile"></i>
                            <h4>Customer Satisfaction</h4>
                            <p>We strive to exceed client expectations by delivering exceptional service and unforgettable experiences.</p>
                        </div>
                        <div className="about-value">
                            <i className="fas fa-handshake"></i>
                            <h4>Integrity & Transparency</h4>
                            <p>Honest and clear communication forms the backbone of our business operations and client relationships.</p>
                        </div>
                        <div className="about-value">
                            <i className="fas fa-map"></i>
                            <h4>Local Expertise</h4>
                            <p>Deep knowledge of East Africa's destinations, cultures, and travel logistics to create superior travel solutions.</p>
                        </div>
                        <div className="about-value">
                            <i className="fas fa-leaf"></i>
                            <h4>Sustainability</h4>
                            <p>Committed to responsible tourism that benefits local communities and protects the environment.</p>
                        </div>
                        <div className="about-value">
                            <i className="fas fa-lightbulb"></i>
                            <h4>Innovation</h4>
                            <p>Continuously improving services with creative and unique travel solutions to enhance client experiences.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Destinations */}
            <section className="about-destinations about-section">
                <div className="about-container">
                    <div className="about-section-title">
                        <h2>Explore Our Top Destinations</h2>
                        <p>Discover the breathtaking landscapes and wildlife of East Africa</p>
                    </div>

                    <div className="about-destinations-tabs">
                        <button
                            className={`about-tab-btn ${activeTab === 'kenya' ? 'active' : ''}`}
                            onClick={() => setActiveTab('kenya')}
                        >
                            Kenya
                        </button>
                        <button
                            className={`about-tab-btn ${activeTab === 'uganda' ? 'active' : ''}`}
                            onClick={() => setActiveTab('uganda')}
                        >
                            Uganda
                        </button>
                        <button
                            className={`about-tab-btn ${activeTab === 'beyond' ? 'active' : ''}`}
                            onClick={() => setActiveTab('beyond')}
                        >
                            Beyond Safari
                        </button>
                    </div>

                    <div id="kenya" className={`about-tab-content ${activeTab === 'kenya' ? 'active' : ''}`}>
                        <h3>Kenya - The Cradle of Safari</h3>
                        <p>From the dramatic Great Wildebeest Migration in the Maasai Mara to the serene beaches of Diani and the majestic peaks of Mount Kenya, we offer unparalleled access to Kenya's iconic landscapes and vibrant cultures.</p>

                        <div className="about-destination-highlights">
                            <div className="about-highlight">
                                <i className="fas fa-paw"></i>
                                <div>
                                    <h5>The Masai Mara's Great Migration</h5>
                                    <p>Witness millions of wildebeest and zebras crossing the Mara River in one of nature's most spectacular events.</p>
                                </div>
                            </div>
                            <div className="about-highlight">
                                <i className="fas fa-city"></i>
                                <div>
                                    <h5>Nairobi National Park</h5>
                                    <p>Home to lions, rhinos, giraffes, and other wildlife, set against a backdrop of Nairobi's skyline.</p>
                                </div>
                            </div>
                            <div className="about-highlight">
                                <i className="fas fa-umbrella-beach"></i>
                                <div>
                                    <h5>Pristine Coastal Beaches</h5>
                                    <p>Relax on the stunning beaches of Diani, Lamu, and Watamu with soft white sands and crystal-clear waters.</p>
                                </div>
                            </div>
                            <div className="about-highlight">
                                <i className="fas fa-mountain"></i>
                                <div>
                                    <h5>Great Rift Valley & Mount Kenya</h5>
                                    <p>Explore dramatic landscapes or take on the challenge of climbing Africa's second-highest peak.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="uganda" className={`about-tab-content ${activeTab === 'uganda' ? 'active' : ''}`}>
                        <h3>Uganda - The Pearl of Africa</h3>
                        <p>Experience the profound thrill of gorilla trekking in Bwindi, the mighty Nile at Jinja, and the diverse wildlife of Queen Elizabeth National Park. We create immersive journeys into Uganda's heart.</p>

                        <div className="about-destination-highlights">
                            <div className="about-highlight">
                                <i className="fas fa-otter"></i>
                                <div>
                                    <h5>Gorilla Trekking</h5>
                                    <p>Trek through Bwindi Impenetrable Forest to observe mountain gorillas in their natural habitat.</p>
                                </div>
                            </div>
                            <div className="about-highlight">
                                <i className="fas fa-water"></i>
                                <div>
                                    <h5>White-Water Rafting</h5>
                                    <p>Take on the thrilling rapids of the Nile River in Jinja, one of the world's best rafting experiences.</p>
                                </div>
                            </div>
                            <div className="about-highlight">
                                <i className="fas fa-safari"></i>
                                <div>
                                    <h5>Game Drives</h5>
                                    <p>Explore Murchison Falls & Queen Elizabeth National Parks, home to diverse wildlife.</p>
                                </div>
                            </div>
                            <div className="about-highlight">
                                <i className="fas fa-users"></i>
                                <div>
                                    <h5>Cultural Experiences</h5>
                                    <p>Immerse yourself in Uganda's rich traditions with Buganda & Karamojong communities.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="beyond" className={`about-tab-content ${activeTab === 'beyond' ? 'active' : ''}`}>
                        <h3>Beyond the Expected</h3>
                        <p>Akothee Safaris offers more than traditional safaris. We specialize in creating diverse travel experiences that cater to all types of travelers and interests.</p>

                        <div className="about-destination-highlights">
                            <div className="about-highlight">
                                <i className="fas fa-briefcase"></i>
                                <div>
                                    <h5>Corporate Team-building Retreats</h5>
                                    <p>Immersive retreats that foster team collaboration, productivity, and relaxation in nature or luxury accommodations.</p>
                                </div>
                            </div>
                            <div className="about-highlight">
                                <i className="fas fa-home"></i>
                                <div>
                                    <h5>Family Getaways</h5>
                                    <p>Family vacations that balance adventure, relaxation, and cultural enrichment for all ages.</p>
                                </div>
                            </div>
                            <div className="about-highlight">
                                <i className="fas fa-heart"></i>
                                <div>
                                    <h5>Special Getaways</h5>
                                    <p>From romantic honeymoons to group trips, we craft unique experiences tailored to your interests.</p>
                                </div>
                            </div>
                            <div className="about-highlight">
                                <i className="fas fa-calendar-day"></i>
                                <div>
                                    <h5>Day Trips & Excursions</h5>
                                    <p>Perfect for time-constrained travelers seeking enriching experiences without lengthy commitments.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta" id="contact">
                <div className="about-container">
                    <div className="about-section-title">
                        <h2>Let's Craft Your Journey</h2>
                        <p>Ready to embark on an unforgettable East African adventure with a trusted partner? Contact us today to start planning your personalized safari experience.</p>
                    </div>

                    <div className="about-cta-buttons">
                        <a href="tel:+254707019960" className="about-btn about-btn-secondary">
                            <i className="fas fa-phone-alt"></i> Call Us: +254 707 019 960
                        </a>
                        <a href="mailto:info@akotheesafaris.com" className="about-btn">
                            <i className="fas fa-envelope"></i> Email: info@akotheesafaris.com
                        </a>
                    </div>

                    <div className="about-office-info">
                        <h3>Visit Our Office</h3>
                        <p><i className="fas fa-map-marker-alt"></i> Lavington Mall, 4th Floor, Unit 4C, Nairobi, Kenya</p>
                        <p><i className="fas fa-phone"></i> +254 707 019 960 / +254 748 273 018 / +254 748 106 402</p>
                        <p><i className="fas fa-envelope"></i> info@akotheesafaris.com</p>
                        <p><i className="fas fa-globe"></i> www.akotheesafaris.com</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
