import React from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { Calendar, User, DollarSign, CheckCircle, Clock } from 'lucide-react'
import './BookingsModule.css'

const BookingsModule = () => {
    const { data: bookings, loading } = useFirestore('bookings', { orderBy: ['createdAt', 'desc'] })

    return (
        <div className="bookings-module">
            <div className="module-header">
                <h1>Travel Bookings</h1>
            </div>

            <div className="bookings-grid">
                {bookings.map(book => (
                    <div key={book.id} className="booking-card">
                        <div className="booking-card-header">
                            <span className={`booking-status ${book.travelStatus}`}>
                                {book.travelStatus}
                            </span>
                            <span className="booking-id">#{book.id.slice(-6)}</span>
                        </div>

                        <div className="booking-card-body">
                            <div className="booking-section">
                                <User size={16} />
                                <div>
                                    <h4>{book.clientName}</h4>
                                    <p>{book.email}</p>
                                </div>
                            </div>

                            <div className="booking-section">
                                <Calendar size={16} />
                                <div>
                                    <h4>{book.serviceName}</h4>
                                    <p>{book.travelDate}</p>
                                </div>
                            </div>

                            <div className="booking-section">
                                <DollarSign size={16} />
                                <div className="payment-info">
                                    <span className="total-price">KES {Number(book.totalPrice).toLocaleString()}</span>
                                    <span className={`payment-status ${book.paymentStatus}`}>
                                        {book.paymentStatus === 'paid' ? <CheckCircle size={14} /> : <Clock size={14} />}
                                        {book.paymentStatus}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="booking-footer">
                            <div className="balance-info">
                                <span>Balance:</span>
                                <strong className={book.balance > 0 ? 'debt' : 'clear'}>
                                    KES {Number(book.balance).toLocaleString()}
                                </strong>
                            </div>
                            <button className="btn btn-secondary btn-sm">Manage Payment</button>
                        </div>
                    </div>
                ))}
                {loading && <p>Loading bookings...</p>}
                {bookings.length === 0 && !loading && (
                    <div className="no-bookings">
                        <p>No confirmed bookings yet. Inquiries can be converted to bookings once payments are initiated.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookingsModule
