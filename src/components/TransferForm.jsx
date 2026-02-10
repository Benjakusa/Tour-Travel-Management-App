import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { db } from '../firebase/config'
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import './PackageForm.css'

const TransferForm = ({ isOpen, onClose, transfer }) => {
    const [formData, setFormData] = useState({
        title: '',
        destination: '',
        vehicleType: 'Executive Van',
        capacity: '7',
        price: '',
        status: 'draft',
        imageUrls: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (transfer) {
            setFormData({
                title: transfer.title,
                destination: transfer.destination,
                vehicleType: transfer.vehicleType,
                capacity: transfer.capacity,
                price: transfer.price,
                status: transfer.status,
                imageUrls: transfer.images ? transfer.images.join(', ') : ''
            })
        } else {
            setFormData({
                title: '',
                destination: '',
                vehicleType: 'Executive Van',
                capacity: '7',
                price: '',
                status: 'draft',
                imageUrls: ''
            })
        }
    }, [transfer])

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

            if (transfer) {
                await updateDoc(doc(db, 'transfers', transfer.id), {
                    ...dataToSave,
                    images: urls,
                    updatedAt: serverTimestamp()
                })
            } else {
                await addDoc(collection(db, 'transfers'), {
                    ...dataToSave,
                    images: urls,
                    createdAt: serverTimestamp()
                })
            }
            onClose()
        } catch (error) {
            console.error('Error saving transfer:', error)
            alert('Error saving transfer.')
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
                        <h2>{transfer ? 'Edit Transfer Service' : 'Add New Transfer Service'}</h2>
                        <button onClick={onClose}><X /></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Service Title</label>
                                <input type="text" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. Airport Transfer JKIA" />
                            </div>
                            <div className="form-group">
                                <label>Route / Destination</label>
                                <input type="text" name="destination" required value={formData.destination} onChange={handleChange} placeholder="e.g. Nairobi to Naivasha" />
                            </div>
                            <div className="form-group">
                                <label>Vehicle Type</label>
                                <input type="text" name="vehicleType" required value={formData.vehicleType} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Capacity (Pax)</label>
                                <input type="number" name="capacity" required value={formData.capacity} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Base Price (KES)</label>
                                <input type="number" name="price" required value={formData.price} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Image URLs</label>
                                <input type="text" name="imageUrls" value={formData.imageUrls} onChange={handleChange} placeholder="Comma-separated URLs" />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Saving...' : (transfer ? 'Update Transfer' : 'Create Transfer')}
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default TransferForm
