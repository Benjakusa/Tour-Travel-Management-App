import React from 'react'
import './PassportBanner.css'

const PassportBanner = ({ onApply }) => {
    return (
        <section className="passport-banner section">
            <div className="container">
                <div className="passport-content">
                    <h2>Need a Passport?</h2>
                    <p>We handle all the paperwork and appointments for your new passport application or renewal.</p>
                    <button className="btn btn-accent" onClick={() => onApply('Passport')}>
                        Apply for Passport
                    </button>
                </div>
            </div>
        </section>
    )
}

export default PassportBanner
