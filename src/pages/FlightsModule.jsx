import React, { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { Plus, Search, Edit, Trash2, CheckCircle, XCircle, PlaneTakeoff, PlaneLanding } from 'lucide-react'
import { db } from '../firebase/config'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import FlightForm from '../components/FlightForm'
import './FlightsModule.css'

const FlightsModule = () => {
    const { data: flights, loading } = useFirestore('flights', { orderBy: ['createdAt', 'desc'] })
    const [searchTerm, setSearchTerm] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [selectedFlight, setSelectedFlight] = useState(null)

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this flight?')) {
            await deleteDoc(doc(db, 'flights', id))
        }
    }

    const handleToggleStatus = async (item) => {
        const newStatus = item.status === 'published' ? 'draft' : 'published'
        await updateDoc(doc(db, 'flights', item.id), { status: newStatus })
    }

    return (
        <div className="flights-module">
            <div className="module-header">
                <h1>Flight Management</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    <Plus size={18} /> Add New Flight Route
                </button>
            </div>

            <div className="module-actions">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search flights..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flights-table-container">
                <table className="flights-table">
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Price Range</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.filter(f => f.from.toLowerCase().includes(searchTerm.toLowerCase()) || f.to.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
                            <tr key={item.id}>
                                <td><PlaneTakeoff size={14} /> {item.from}</td>
                                <td><PlaneLanding size={14} /> {item.to}</td>
                                <td>{item.priceRange}</td>
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
                                        <button className="btn-icon" title="Edit" onClick={() => { setSelectedFlight(item); setShowForm(true); }}>
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
                {loading && <p className="loading-text">Loading flights...</p>}
                {!loading && flights.length === 0 && <p className="empty-text">No flights found.</p>}
            </div>

            <FlightForm
                isOpen={showForm}
                onClose={() => { setShowForm(false); setSelectedFlight(null); }}
                flight={selectedFlight}
            />
        </div>
    )
}

export default FlightsModule
