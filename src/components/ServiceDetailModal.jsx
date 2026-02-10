import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Users, MapPin, Calendar, CheckCircle2 } from 'lucide-react'
import InquiryModal from './InquiryModal'
import './ServiceDetailModal.css'

const ServiceDetailModal = ({ item, isOpen, onClose }) => {
    const [showInquiry, setShowInquiry] = useState(false)
    const [activeImage, setActiveImage] = useState(0)

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="detail-overlay" onClick={onClose}>
                <motion.div
                    className="detail-modal"
                    onClick={e => e.stopPropagation()}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                >
                    <button className="detail-close" onClick={onClose}><X /></button>

                    <div className="detail-layout">
                        <div className="detail-media">
                            <div className="main-image">
                                <img src={item.images?.[activeImage] || 'https://via.placeholder.com/800x600'} alt={item.name} />
                            </div>
                            {item.images?.length > 1 && (
                                <div className="thumbnails">
                                    {item.images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`thumb ${activeImage === idx ? 'active' : ''}`}
                                            onClick={() => setActiveImage(idx)}
                                        >
                                            <img src={img} alt="" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="detail-info">
                            <div className="detail-header">
                                {item.type === 'hot_deal' && <span className="hot-badge">Hot Deal</span>}
                                <h1>{item.name}</h1>
                                <div className="detail-meta">
                                    <span><MapPin size={18} /> {item.destination}</span>
                                    {item.pax && <span><Users size={18} /> up to {item.pax} Pax</span>}
                                </div>
                            </div>

                            <div className="detail-description">
                                <h3>Overview</h3>
                                <p>{item.description || 'No description available for this package.'}</p>
                                {item.requirements && (
                                    <div className="requirements">
                                        <h3>Requirements</h3>
                                        <ul>
                                            {item.requirements.map((req, i) => (
                                                <li key={i}><CheckCircle2 size={16} /> {req}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="detail-footer">
                                <div className="price-tag">
                                    <span className="label">Total Price</span>
                                    <span className="amount">{item.displayPrice}</span>
                                </div>
                                <button className="btn btn-accent" onClick={() => setShowInquiry(true)}>
                                    Book / Enquire Now
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {showInquiry && (
                <InquiryModal
                    isOpen={showInquiry}
                    onClose={() => setShowInquiry(false)}
                    serviceType={item.serviceType || 'Package'}
                    serviceId={item.id}
                />
            )}
        </AnimatePresence>
    )
}

export default ServiceDetailModal
