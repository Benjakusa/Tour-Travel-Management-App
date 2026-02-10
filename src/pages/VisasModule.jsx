import React, { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { Plus, Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react'
import { db } from '../firebase/config'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import VisaForm from '../components/VisaForm'
import './VisasModule.css'

const VisasModule = () => {
    const { data: visas, loading } = useFirestore('visas', { orderBy: ['createdAt', 'desc'] })
    const [searchTerm, setSearchTerm] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [selectedVisa, setSelectedVisa] = useState(null)

    const handleDelete = async (id) => {
        if (window.confirm('Delete this visa service?')) {
            await deleteDoc(doc(db, 'visas', id))
        }
    }

    const handleToggleStatus = async (item) => {
        const newStatus = item.status === 'published' ? 'draft' : 'published'
        await updateDoc(doc(db, 'visas', item.id), { status: newStatus })
    }

    return (
        <div className="visas-module">
            <div className="module-header">
                <h1>Visa Services</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    <Plus size={18} /> Add New Visa
                </button>
            </div>

            <div className="module-actions">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search countries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="visas-table-container">
                <table className="visas-table">
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Type</th>
                            <th>Processing</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visas.filter(v => v.country.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
                            <tr key={item.id}>
                                <td className="country-cell">
                                    <strong>{item.country}</strong>
                                </td>
                                <td>{item.type}</td>
                                <td>{item.processingTime}</td>
                                <td>KES {Number(item.price).toLocaleString()}</td>
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
                                        <button className="btn-icon" title="Edit" onClick={() => { setSelectedVisa(item); setShowForm(true); }}>
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
                {loading && <p className="loading-text">Loading visa services...</p>}
                {!loading && visas.length === 0 && <p className="empty-text">No visa services found.</p>}
            </div>

            <VisaForm
                isOpen={showForm}
                onClose={() => { setShowForm(false); setSelectedVisa(null); }}
                visa={selectedVisa}
            />
        </div>
    )
}

export default VisasModule
