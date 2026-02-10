import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { UserPlus, Mail, Lock, User, Phone, Key, AlertCircle } from 'lucide-react'
import './Auth.css'

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        secretCode: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signup } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match')
        }

        setLoading(true)
        try {
            await signup(formData.email, formData.password, formData.name, formData.phone, formData.secretCode)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Failed to create account')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card signup">
                <div className="auth-header">
                    <div className="auth-icon">
                        <UserPlus size={32} />
                    </div>
                    <h1>Staff Signup</h1>
                    <p>Enter your details and the secret authorization code</p>
                </div>

                {error && <div className="auth-error"><AlertCircle size={18} /> {error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label><User size={16} /> Full Name</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label><Mail size={16} /> Email</label>
                            <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label><Phone size={16} /> Phone</label>
                            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label><Lock size={16} /> Password</label>
                            <input type="password" name="password" required value={formData.password} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label><Lock size={16} /> Confirm</label>
                            <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label><Key size={16} /> Secret Code</label>
                        <input
                            type="text"
                            name="secretCode"
                            required
                            value={formData.secretCode}
                            onChange={handleChange}
                            placeholder="Staff (#FikaPlaces) or Admin code"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/signin">Sign In</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup
