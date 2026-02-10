import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const { user, logout } = useAuth()

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src="/akotheelogo.png" alt="Akothee Safaris" />
                </Link>

                <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                    <NavLink to="/" onClick={() => setIsOpen(false)} end>Home</NavLink>
                    <NavLink to="/destinations" onClick={() => setIsOpen(false)}>Destinations</NavLink>
                    <NavLink to="/about" onClick={() => setIsOpen(false)}>About Us</NavLink>

                    {user ? (
                        <>
                            <NavLink to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</NavLink>
                            <button onClick={logout} className="navbar-logout">
                                <LogOut size={18} /> Sign Out
                            </button>
                        </>
                    ) : (
                        <Link to="/signin" className="navbar-signin" onClick={() => setIsOpen(false)}>
                            <User size={18} />
                            Staff Sign In
                        </Link>
                    )}
                </div>

                <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>
        </nav>
    )
}

export default Navbar
