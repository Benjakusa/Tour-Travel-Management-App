import React, { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { Plus, Search, Edit, Trash2, CheckCircle, XCircle, MapPin, DollarSign } from 'lucide-react'
import { db } from '../firebase/config'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import HotelForm from '../components/HotelForm'
import './HotelsModule.css'

const HotelsModule = () => {
    const { data: hotels, loading } = useFirestore('hotels', { orderBy: ['createdAt', 'desc'] })
    const [searchTerm, setSearchTerm] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [selectedHotel, setSelectedHotel] = useState(null)

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this hotel?')) {
            await deleteDoc(doc(db, 'hotels', id))
        }
    }

    const handleToggleStatus = async (item) => {
        const newStatus = item.status === 'published' ? 'draft' : 'published'
        await updateDoc(doc(db, 'hotels', item.id), { status: newStatus })
    }

    return (
        <div className="hotels-module">
            <div className="module-header">
                <h1>Hotel Management</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    <Plus size={18} /> Add New Hotel
                </button>
            </div>

            <div className="module-actions">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search hotels..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="hotels-table-container">
                <table className="hotels-table">
                    <thead>
                        <tr>
                            <th>Hotel Name</th>
                            <th>Location</th>
                            <th>Price/Night</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
                            <tr key={item.id}>
                                <td>
                                    <div className="hotel-cell">
                                        <img src={item.images?.[0] || 'https://via.placeholder.com/100'} alt="" />
                                        <span>{item.name}</span>
                                    </div>
                                </td>
                                <td><MapPin size={14} /> {item.location}</td>
                                <td>KES {Number(item.pricePerNight).toLocaleString()}</td>
                                <td>
                                    <span className={`status-pill ${item.status}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="table-actions">
                                        <button className="btn-icon" title="Toggle Publish" onClick={() => handleToggleStatus(item)}>
                                            {item.status === 'published' ? <XCircle size={18} /> : <CheckCircle size={18} />}
                                        </button>
                                        <button className="btn-icon" title="Edit" onClick={() => { setSelectedHotel(item); setShowForm(true); }}>
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
                {loading && <p className="loading-text">Loading hotels...</p>}
                {!loading && hotels.length === 0 && <p className="empty-text">No hotels found.</p>}
            </div>

            <HotelForm
                isOpen={showForm}
                onClose={() => { setShowForm(false); setSelectedHotel(null); }}
                hotel={selectedHotel}
            />
        </div>
    )
}

export default HotelsModule
