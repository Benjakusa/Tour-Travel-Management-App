import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, Image as ImageIcon } from 'lucide-react'
import { db } from '../firebase/config'
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'

const HeroForm = ({ isOpen, onClose, editItem = null }) => {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        image: '',
        ctaText: 'Explore Now',
        ctaLink: '/destinations',
        active: true
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (editItem) {
            setFormData({
                title: editItem.title || '',
                subtitle: editItem.subtitle || '',
                image: editItem.image || '',
                ctaText: editItem.ctaText || 'Explore Now',
                ctaLink: editItem.ctaLink || '/destinations',
                active: editItem.active !== undefined ? editItem.active : true
            })
        } else {
            setFormData({
                title: '',
                subtitle: '',
                image: '',
                ctaText: 'Explore Now',
                ctaLink: '/destinations',
                active: true
            })
        }
    }, [editItem, isOpen])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (editItem) {
                await updateDoc(doc(db, 'hero_slides', editItem.id), {
                    ...formData,
                    updatedAt: serverTimestamp()
                })
            } else {
                await addDoc(collection(db, 'hero_slides'), {
                    ...formData,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                })
            }
            onClose()
        } catch (error) {
            console.error('Error saving hero slide:', error)
            alert('Failed to save hero slide. Please try again.')
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
                    <h2>{editItem ? 'Edit Hero Slide' : 'Add New Hero Slide'}</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Slide Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Adventure Awaits in Kenya"
                            />
                        </div>

                        <div className="form-group">
                            <label>Subtitle / Content</label>
                            <textarea
                                name="subtitle"
                                required
                                rows="3"
                                value={formData.subtitle}
                                onChange={handleChange}
                                placeholder="Describe the highlight... "
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label><ImageIcon size={16} /> Image URL</label>
                            <input
                                type="url"
                                name="image"
                                required
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Paste image link here"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>CTA Button Text</label>
                                <input
                                    type="text"
                                    name="ctaText"
                                    value={formData.ctaText}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>CTA Button Link</label>
                                <input
                                    type="text"
                                    name="ctaLink"
                                    value={formData.ctaLink}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={formData.active}
                                    onChange={handleChange}
                                />
                                Active (Show on Home Page)
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Saving...' : <><Save size={18} /> {editItem ? 'Update Slide' : 'Create Slide'}</>}
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default HeroForm
