import React from 'react'
import { ShieldCheck, Clock, Award, Headphones } from 'lucide-react'
import './WhyChooseUs.css'

const WhyChooseUs = () => {
    const features = [
        { icon: <ShieldCheck size={32} />, title: 'Secure Booking', desc: 'Secure payment systems and verified partners.' },
        { icon: <Clock size={32} />, title: '24/7 Support', desc: 'Our team is always available to help you.' },
        { icon: <Award size={32} />, title: 'Best Prices', desc: 'We negotiate the best deals for our clients.' },
        { icon: <Headphones size={32} />, title: 'Local Expertise', desc: 'In-depth knowledge of all our destinations.' }
    ]

    return (
        <section className="why-choose-us section container">
            <div className="section-header">
                <h2>Why Choose Us</h2>
                <p>Providing the best travel experiences since 2010</p>
            </div>
            <div className="mobile-slider hide-scrollbar">
                {features.map((f, i) => (
                    <div key={i} className="feature-card">
                        <div className="feature-icon">{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default WhyChooseUs
