import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload } from 'lucide-react'
import { db, storage } from '../firebase/config'
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import './PackageForm.css' // Reusing common form styles

const HotelForm = ({ isOpen, onClose, hotel }) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        pricePerNight: '',
        description: '',
        status: 'draft',
        imageUrls: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (hotel) {
            setFormData({
                name: hotel.name,
                location: hotel.location,
                pricePerNight: hotel.pricePerNight,
                description: hotel.description || '',
                status: hotel.status,
                imageUrls: hotel.images ? hotel.images.join(', ') : ''
            })
        } else {
            setFormData({
                name: '',
                location: '',
                pricePerNight: '',
                description: '',
                status: 'draft',
                imageUrls: ''
            })
        }
    }, [hotel])

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

            if (hotel) {
                await updateDoc(doc(db, 'hotels', hotel.id), {
                    ...dataToSave,
                    images: urls,
                    updatedAt: serverTimestamp()
                })
            } else {
                await addDoc(collection(db, 'hotels'), {
                    ...dataToSave,
                    images: urls,
                    createdAt: serverTimestamp()
                })
            }

            onClose()
        } catch (error) {
            console.error('Error saving hotel:', error)
            alert('Error saving hotel.')
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
                        <h2>{hotel ? 'Edit Hotel' : 'Add New Hotel'}</h2>
                        <button onClick={onClose}><X /></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Hotel Name</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input type="text" name="location" required value={formData.location} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Price Per Night (KES)</label>
                                <input type="number" name="pricePerNight" required value={formData.pricePerNight} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Image URLs (Comma-separated)</label>
                                <textarea
                                    name="imageUrls"
                                    rows="1"
                                    value={formData.imageUrls}
                                    onChange={handleChange}
                                    placeholder="https://example.com/hotel.jpg"
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="description" rows="4" value={formData.description} onChange={handleChange}></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Saving...' : (hotel ? 'Update Hotel' : 'Create Hotel')}
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default HotelForm
