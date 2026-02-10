import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Plus, Minus } from 'lucide-react'
import { db, storage } from '../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import './PackageForm.css'

const PackageForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        destination: '',
        price: '',
        pax: '1',
        type: 'normal',
        description: '',
        requirements: [''],
        imageUrls: '' // Comma-separated URLs
    })
    const [loading, setLoading] = useState(false)

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

            await addDoc(collection(db, 'packages'), {
                ...dataToSave,
                images: urls,
                status: 'draft',
                createdAt: serverTimestamp()
            })

            onClose()
        } catch (error) {
            console.error('Error adding package:', error)
            alert('Error adding package. Check console.')
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
                        <h2>Add New Package</h2>
                        <button onClick={onClose}><X /></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Package Name</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Destination</label>
                                <input type="text" name="destination" required value={formData.destination} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Price (KES)</label>
                                <input type="number" name="price" required value={formData.price} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Max Pax</label>
                                <input type="number" name="pax" required value={formData.pax} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <select name="type" value={formData.type} onChange={handleChange}>
                                    <option value="normal">Normal</option>
                                    <option value="hot_deal">Hot Deal</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Image URLs (Comma-separated)</label>
                                <textarea
                                    name="imageUrls"
                                    rows="2"
                                    value={formData.imageUrls}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="description" rows="4" value={formData.description} onChange={handleChange}></textarea>
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
                            {loading ? 'Creating...' : 'Create Package'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default PackageForm
