import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus } from 'lucide-react'
import { db } from '../firebase/config'
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import './PackageForm.css'

const VisaForm = ({ isOpen, onClose, visa }) => {
    const [formData, setFormData] = useState({
        country: '',
        type: 'Tourist',
        processingTime: '3-5 Working Days',
        price: '',
        requirements: [''],
        status: 'draft',
        imageUrls: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (visa) {
            setFormData({
                country: visa.country,
                type: visa.type,
                processingTime: visa.processingTime,
                price: visa.price,
                requirements: visa.requirements || [''],
                status: visa.status,
                imageUrls: visa.images ? visa.images.join(', ') : ''
            })
        } else {
            setFormData({
                country: '',
                type: 'Tourist',
                processingTime: '3-5 Working Days',
                price: '',
                requirements: [''],
                status: 'draft',
                imageUrls: ''
            })
        }
    }, [visa])

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleReqChange = (index, value) => {
        const newReqs = [...formData.requirements]
        newReqs[index] = value
        setFormData(prev => ({ ...prev, requirements: newReqs }))
    }

    const addReq = () => setFormData(prev => ({ ...prev, requirements: [...prev.requirements, ''] }))
    const removeReq = (index) => setFormData(prev => ({ ...prev, requirements: prev.requirements.filter((_, i) => i !== index) }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { imageUrls, ...dataToSave } = formData
            const urls = imageUrls
                .split(',')
                .map(url => url.trim())
                .filter(url => url.length > 0)

            if (visa) {
                await updateDoc(doc(db, 'visas', visa.id), {
                    ...dataToSave,
                    images: urls,
                    updatedAt: serverTimestamp()
                })
            } else {
                await addDoc(collection(db, 'visas'), {
                    ...dataToSave,
                    images: urls,
                    createdAt: serverTimestamp()
                })
            }
            onClose()
        } catch (error) {
            console.error('Error saving visa:', error)
            alert('Error saving visa.')
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
                        <h2>{visa ? 'Edit Visa Service' : 'Add New Visa Service'}</h2>
                        <button onClick={onClose}><X /></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Country</label>
                                <input type="text" name="country" required value={formData.country} onChange={handleChange} placeholder="e.g. Dubai, UAE" />
                            </div>
                            <div className="form-group">
                                <label>Visa Type</label>
                                <input type="text" name="type" required value={formData.type} onChange={handleChange} placeholder="e.g. 30 Days Tourist" />
                            </div>
                            <div className="form-group">
                                <label>Processing Time</label>
                                <input type="text" name="processingTime" required value={formData.processingTime} onChange={handleChange} placeholder="e.g. 2-3 Days" />
                            </div>
                            <div className="form-group">
                                <label>Price (KES)</label>
                                <input type="number" name="price" required value={formData.price} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Image URLs</label>
                                <input type="text" name="imageUrls" value={formData.imageUrls} onChange={handleChange} placeholder="Comma-separated URLs" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Requirements</label>
                            {formData.requirements.map((req, idx) => (
                                <div key={idx} className="req-input">
                                    <input type="text" value={req} onChange={(e) => handleReqChange(idx, e.target.value)} />
                                    <button type="button" onClick={() => removeReq(idx)}><Minus size={16} /></button>
                                </div>
                            ))}
                            <button type="button" className="btn-add-req" onClick={addReq}><Plus size={16} /> Add Requirement</button>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Saving...' : (visa ? 'Update Visa' : 'Create Visa')}
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default VisaForm
