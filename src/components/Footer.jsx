import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <img src="/akotheelogo.png" alt="Akothee Safaris" className="footer-logo" />
                    <p>Your ultimate partner for unforgettable travel experiences across Africa and beyond.</p>
                    <div className="footer-social">
                        <Facebook size={20} />
                        <Instagram size={20} />
                        <Twitter size={20} />
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/destinations">Destinations</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/signin">Staff Login</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <ul className="footer-contact">
                        <li><Phone size={16} /> +254 707 019 960</li>
                        <li><Phone size={16} /> +254 748 273 028</li>
                        <li><Phone size={16} /> +254 748 106 402</li>
                        <li><Mail size={16} /> inquiries@akotheesafaris.co.ke</li>
                        <li><MapPin size={16} /> akotheesafaris.co.ke</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Akothee Safaris. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
