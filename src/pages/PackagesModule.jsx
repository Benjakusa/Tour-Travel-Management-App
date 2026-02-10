import React, { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { Plus, Search, MoreVertical, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react'
import { db } from '../firebase/config'
import { collection, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import PackageForm from '../components/PackageForm'
import './PackagesModule.css'

const PackagesModule = () => {
    const { data: packages, loading } = useFirestore('packages', { orderBy: ['createdAt', 'desc'] })
    const [searchTerm, setSearchTerm] = useState('')
    const [showForm, setShowForm] = useState(false)

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            await deleteDoc(doc(db, 'packages', id))
        }
    }

    const handleToggleStatus = async (item) => {
        const newStatus = item.status === 'published' ? 'draft' : 'published'
        await updateDoc(doc(db, 'packages', item.id), { status: newStatus })
    }

    return (
        <div className="packages-module">
            <div className="module-header">
                <h1>Travel Packages</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    <Plus size={18} /> Add New Package
                </button>
            </div>

            <PackageForm isOpen={showForm} onClose={() => setShowForm(false)} />

            <div className="module-actions">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search packages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="packages-table-container">
                <table className="packages-table">
                    <thead>
                        <tr>
                            <th>Package Name</th>
                            <th>Destination</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
                            <tr key={item.id}>
                                <td>
                                    <div className="package-cell">
                                        <img src={item.images?.[0]} alt="" />
                                        <span>{item.name}</span>
                                    </div>
                                </td>
                                <td>{item.destination}</td>
                                <td>KES {Number(item.price).toLocaleString()}</td>
                                <td>
                                    <span className={`status-pill ${item.status}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>{item.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}</td>
                                <td>
                                    <div className="table-actions">
                                        <button className="btn-icon" title="Toggle Publish" onClick={() => handleToggleStatus(item)}>
                                            {item.status === 'published' ? <XCircle size={18} /> : <CheckCircle size={18} />}
                                        </button>
                                        <button className="btn-icon" title="Edit">
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
                {loading && <p className="loading-text">Loading packages...</p>}
                {packages.length === 0 && !loading && <p className="empty-text">No packages found. Click "Add New" to create one.</p>}
            </div>
        </div>
    )
}

export default PackagesModule
