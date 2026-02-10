import React, { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { Plus, Search, Edit, Trash2, CheckCircle, XCircle, Car, MapPin } from 'lucide-react'
import { db } from '../firebase/config'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import TransferForm from '../components/TransferForm'
import './TransfersModule.css'

const TransfersModule = () => {
    const { data: transfers, loading } = useFirestore('transfers', { orderBy: ['createdAt', 'desc'] })
    const [searchTerm, setSearchTerm] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [selectedTransfer, setSelectedTransfer] = useState(null)

    const handleDelete = async (id) => {
        if (window.confirm('Delete this transfer service?')) {
            await deleteDoc(doc(db, 'transfers', id))
        }
    }

    const handleToggleStatus = async (item) => {
        const newStatus = item.status === 'published' ? 'draft' : 'published'
        await updateDoc(doc(db, 'transfers', item.id), { status: newStatus })
    }

    return (
        <div className="transfers-module">
            <div className="module-header">
                <h1>Transfer Services</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    <Plus size={18} /> Add New Transfer
                </button>
            </div>

            <div className="module-actions">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search destination..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="transfers-table-container">
                <table className="transfers-table">
                    <thead>
                        <tr>
                            <th>Service Title</th>
                            <th>Destination</th>
                            <th>Vehicle</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transfers.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.destination.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
                            <tr key={item.id}>
                                <td>
                                    <div className="transfer-cell">
                                        <Car size={18} />
                                        <span>{item.title}</span>
                                    </div>
                                </td>
                                <td><MapPin size={14} /> {item.destination}</td>
                                <td>{item.vehicleType}</td>
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
                                        <button className="btn-icon" title="Edit" onClick={() => { setSelectedTransfer(item); setShowForm(true); }}>
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
                {loading && <p className="loading-text">Loading transfers...</p>}
                {!loading && transfers.length === 0 && <p className="empty-text">No transfer services found.</p>}
            </div>

            <TransferForm
                isOpen={showForm}
                onClose={() => { setShowForm(false); setSelectedTransfer(null); }}
                transfer={selectedTransfer}
            />
        </div>
    )
}

export default TransfersModule
