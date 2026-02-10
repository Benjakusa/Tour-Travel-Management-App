import React, { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { Search, Mail, Phone, Calendar, MoreVertical } from 'lucide-react'
import { db } from '../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import './InquiriesModule.css'

const InquiriesModule = () => {
    const { data: inquiries, loading } = useFirestore('inquiries', { orderBy: ['createdAt', 'desc'] })
    const [searchTerm, setSearchTerm] = useState('')

    const handleStatusChange = async (id, newStatus) => {
        await updateDoc(doc(db, 'inquiries', id), { status: newStatus })
    }

    return (
        <div className="inquiries-module">
            <div className="module-header">
                <h1>Customer Inquiries</h1>
            </div>

            <div className="module-actions">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search inquiries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="inquiries-list">
                {inquiries.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
                    <div key={item.id} className="inquiry-card-admin">
                        <div className="inquiry-header">
                            <span className={`status-badge ${item.status}`}>{item.status}</span>
                            <small>{item.createdAt?.toDate?.().toLocaleString() || 'Just now'}</small>
                        </div>

                        <div className="inquiry-body">
                            <div className="client-info">
                                <h3>{item.name}</h3>
                                <div className="contact-links">
                                    <span><Mail size={14} /> {item.email}</span>
                                    <span><Phone size={14} /> {item.phone}</span>
                                </div>
                            </div>

                            <div className="service-info">
                                <span className="info-label">Interested in:</span>
                                <span className="info-value">{item.serviceType}</span>
                                {item.travelDate && (
                                    <div className="date-pax">
                                        <span><Calendar size={14} /> {new Date(item.travelDate).toLocaleDateString()}</span>
                                        <span>{item.pax} Pax</span>
                                    </div>
                                )}
                            </div>

                            <div className="message-box">
                                <p>{item.message || 'No additional message.'}</p>
                            </div>
                        </div>

                        <div className="inquiry-actions">
                            <select
                                value={item.status}
                                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                className="status-select"
                            >
                                <option value="new">Mark as New</option>
                                <option value="pending">Mark as Pending</option>
                                <option value="processed">Mark as Processed</option>
                                <option value="cancelled">Mark as Cancelled</option>
                            </select>
                            <button className="btn btn-primary btn-sm">Convert to Booking</button>
                        </div>
                    </div>
                ))}
                {loading && <p>Loading inquiries...</p>}
                {inquiries.length === 0 && !loading && <p>No inquiries found.</p>}
            </div>
        </div>
    )
}

export default InquiriesModule
