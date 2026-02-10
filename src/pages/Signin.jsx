import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react'
import './Auth.css'

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login, loginWithGoogle } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(email, password)
            navigate('/dashboard')
        } catch (err) {
            setError('Failed to sign in. Check your credentials.')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setError('')
        setLoading(true)
        try {
            await loginWithGoogle()
            navigate('/dashboard')
        } catch (err) {
            setError('Google sign in failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-icon">
                        <LogIn size={32} />
                    </div>
                    <h1>Staff Sign In</h1>
                    <p>Access the Akothee Safaris management portal</p>
                </div>

                {error && <div className="auth-error"><AlertCircle size={18} /> {error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label><Mail size={16} /> Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="staff@akotheesafaris.com"
                        />
                    </div>
                    <div className="form-group">
                        <label><Lock size={16} /> Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-separator">
                    <span>OR</span>
                </div>

                <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" width="18" height="18" style={{ marginRight: '8px' }} />
                    Sign in with Google
                </button>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/signup">Apply for Access</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signin
