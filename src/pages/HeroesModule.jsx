import React, { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { Plus, Search, Edit, Trash2, CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react'
import { db } from '../firebase/config'
import { collection, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import HeroForm from '../components/HeroForm'
import './HeroesModule.css'

const HeroesModule = () => {
    const { data: slides, loading } = useFirestore('hero_slides', { orderBy: ['createdAt', 'desc'] })
    const [searchTerm, setSearchTerm] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [editingItem, setEditingItem] = useState(null)

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this hero slide?')) {
            try {
                await deleteDoc(doc(db, 'hero_slides', id))
            } catch (error) {
                console.error('Error deleting hero slide:', error)
            }
        }
    }

    const handleToggleActive = async (item) => {
        try {
            await updateDoc(doc(db, 'hero_slides', item.id), { active: !item.active })
        } catch (error) {
            console.error('Error toggling status:', error)
        }
    }

    const handleEdit = (item) => {
        setEditingItem(item)
        setShowForm(true)
    }

    const handleCloseForm = () => {
        setShowForm(false)
        setEditingItem(null)
    }

    return (
        <div className="heroes-module">
            <div className="module-header">
                <h1>Hero Slider Management</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    <Plus size={18} /> Add New Slide
                </button>
            </div>

            <HeroForm
                isOpen={showForm}
                onClose={handleCloseForm}
                editItem={editingItem}
            />

            <div className="module-actions">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search slides by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="module-table-container">
                <table className="module-table">
                    <thead>
                        <tr>
                            <th>Slide Preview</th>
                            <th>Title</th>
                            <th>Subtitle</th>
                            <th>Status</th>
                            <th>CTA</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slides.filter(s => (s.title || '').toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
                            <tr key={item.id}>
                                <td>
                                    <div className="preview-cell">
                                        <img src={item.image} alt="" onError={(e) => e.target.src = 'https://via.placeholder.com/150x80?text=No+Image'} />
                                    </div>
                                </td>
                                <td><div className="text-truncate">{item.title}</div></td>
                                <td><div className="text-truncate subtitle">{item.subtitle}</div></td>
                                <td>
                                    <span className={`status-pill ${item.active ? 'published' : 'draft'}`}>
                                        {item.active ? 'Active' : 'Hidden'}
                                    </span>
                                </td>
                                <td><small>{item.ctaText}</small></td>
                                <td>
                                    <div className="table-actions">
                                        <button className="btn-icon" title="Toggle Status" onClick={() => handleToggleActive(item)}>
                                            {item.active ? <XCircle size={18} /> : <CheckCircle size={18} />}
                                        </button>
                                        <button className="btn-icon" title="Edit" onClick={() => handleEdit(item)}>
                                            <Edit size={18} />
                                        </button>
                                        <button className="btn-icon delete" title="Delete" onClick={() => handleDelete(item.id)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && <p className="loading-text">Loading hero slides...</p>}
                {!loading && slides.length === 0 && <p className="empty-text">No hero slides found.</p>}
            </div>
        </div>
    )
}

export default HeroesModule
