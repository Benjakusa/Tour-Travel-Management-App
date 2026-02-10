import React from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { db } from '../firebase/config'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { Shield, ShieldAlert, Trash2 } from 'lucide-react'
import './StaffModule.css'

const StaffModule = () => {
    const { data: staff, loading } = useFirestore('users')

    const handleRoleChange = async (uid, newRole) => {
        await updateDoc(doc(db, 'users', uid), { role: newRole })
    }

    const handleDelete = async (uid) => {
        if (window.confirm('Remove this staff member?')) {
            await deleteDoc(doc(db, 'users', uid))
        }
    }

    return (
        <div className="staff-module">
            <div className="module-header">
                <h1>Staff Management</h1>
            </div>

            <div className="staff-list">
                <table className="staff-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map(member => (
                            <tr key={member.id}>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>
                                    <span className={`role-badge ${member.role}`}>
                                        {member.role === 'admin' ? <Shield size={14} /> : <ShieldAlert size={14} />}
                                        {member.role}
                                    </span>
                                </td>
                                <td>
                                    <div className="table-actions">
                                        {member.role === 'staff' ? (
                                            <button className="btn-icon" onClick={() => handleRoleChange(member.id, 'admin')} title="Promote to Admin">
                                                <Shield size={18} />
                                            </button>
                                        ) : (
                                            <button className="btn-icon" onClick={() => handleRoleChange(member.id, 'staff')} title="Demote to Staff">
                                                <ShieldAlert size={18} />
                                            </button>
                                        )}
                                        <button className="btn-icon delete" onClick={() => handleDelete(member.id)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StaffModule
