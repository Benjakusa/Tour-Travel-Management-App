import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle } from 'lucide-react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import './InquiryModal.css'

const InquiryModal = ({ isOpen, onClose, serviceType, serviceId = 'general' }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        travelDate: '',
        pax: '1',
        message: ''
    })
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await addDoc(collection(db, 'inquiries'), {
                ...formData,
                serviceType,
                serviceId,
                status: 'new',
                source: 'Website',
                createdAt: serverTimestamp()
            })
            setSubmitted(true)
            setTimeout(() => {
                setSubmitted(false)
                onClose()
            }, 3000)
        } catch (error) {
            console.error('Error submitting inquiry:', error)
            alert('Failed to submit inquiry. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="modal-overlay" onClick={onClose}>
                <motion.div
                    className="modal-content"
                    onClick={e => e.stopPropagation()}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    <button className="modal-close" onClick={onClose}><X /></button>

                    {submitted ? (
                        <div className="modal-success">
                            <CheckCircle size={64} color="var(--secondary)" />
                            <h2>Thank You!</h2>
                            <p>Your inquiry for <strong>{serviceType}</strong> has been received. Our team will contact you shortly.</p>
                        </div>
                    ) : (
                        <>
                            <h2>Enquire About {serviceType}</h2>
                            <p>Fill in the details below and we'll get back to you with a custom quote.</p>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Preferred Travel Date</label>
                                        <input type="date" name="travelDate" required value={formData.travelDate} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Number of Pax</label>
                                        <input type="number" name="pax" min="1" value={formData.pax} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Additional Message</label>
                                    <textarea name="message" rows="3" value={formData.message} onChange={handleChange}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                    {loading ? 'Submitting...' : <><Send size={18} /> Send Inquiry</>}
                                </button>
                            </form>
                        </>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default InquiryModal
