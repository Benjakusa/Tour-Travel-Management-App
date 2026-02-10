import React from 'react'
import { Plane, Hotel, Car } from 'lucide-react'
import './BookingEntryPoints.css'

const BookingEntryPoints = ({ onInquiry }) => {
    const options = [
        { title: 'Flight Booking', icon: <Plane />, type: 'Flight' },
        { title: 'Hotel Booking', icon: <Hotel />, type: 'Hotel' },
        { title: 'Transfers', icon: <Car />, type: 'Transfer' }
    ]

    return (
        <section className="booking-entries section container">
            <div className="entries-grid">
                {options.map((opt, idx) => (
                    <div key={idx} className="entry-card" onClick={() => onInquiry(opt.type)}>
                        <div className="entry-icon">{opt.icon}</div>
                        <h3>{opt.title}</h3>
                        <p>Direct inquiries for the best rates and availability.</p>
                        <span className="entry-cta">Enquire Now</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BookingEntryPoints
