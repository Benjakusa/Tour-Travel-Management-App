import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { db } from '../firebase/config'
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import './PackageForm.css'

const FlightForm = ({ isOpen, onClose, flight }) => {
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        priceRange: '',
        type: 'one-way',
        status: 'draft',
        imageUrls: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (flight) {
            setFormData({
                from: flight.from,
                to: flight.to,
                priceRange: flight.priceRange,
                type: flight.type || 'one-way',
                status: flight.status,
                imageUrls: flight.images ? flight.images.join(', ') : ''
            })
        } else {
            setFormData({
                from: '',
                to: '',
                priceRange: '',
                type: 'one-way',
                status: 'draft',
                imageUrls: ''
            })
        }
    }, [flight])

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { imageUrls, ...dataToSave } = formData
            const urls = imageUrls
                .split(',')
                .map(url => url.trim())
                .filter(url => url.length > 0)

            if (flight) {
                await updateDoc(doc(db, 'flights', flight.id), {
                    ...dataToSave,
                    images: urls,
                    updatedAt: serverTimestamp()
                })
            } else {
                await addDoc(collection(db, 'flights'), {
                    ...dataToSave,
                    images: urls,
                    createdAt: serverTimestamp()
                })
            }
            onClose()
        } catch (error) {
            console.error('Error saving flight:', error)
            alert('Error saving flight.')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="modal-overlay" onClick={onClose}>
                <motion.div
                    className="modal-content form-modal"
                    onClick={e => e.stopPropagation()}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <div className="form-header">
                        <h2>{flight ? 'Edit Flight Path' : 'Add New Flight Path'}</h2>
                        <button onClick={onClose}><X /></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Origin (From)</label>
                                <input type="text" name="from" required value={formData.from} onChange={handleChange} placeholder="e.g. Nairobi" />
                            </div>
                            <div className="form-group">
                                <label>Destination (To)</label>
                                <input type="text" name="to" required value={formData.to} onChange={handleChange} placeholder="e.g. Mombasa" />
                            </div>
                            <div className="form-group">
                                <label>Price Range</label>
                                <input type="text" name="priceRange" required value={formData.priceRange} onChange={handleChange} placeholder="e.g. KES 8,000 - 12,000" />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <select name="type" value={formData.type} onChange={handleChange}>
                                    <option value="one-way">One Way</option>
                                    <option value="return">Return</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Image URLs</label>
                                <input type="text" name="imageUrls" value={formData.imageUrls} onChange={handleChange} placeholder="Comma-separated URLs" />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Saving...' : (flight ? 'Update Flight' : 'Create Flight')}
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default FlightForm
