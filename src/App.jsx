import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Destinations from './pages/Destinations'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { useAuth } from './context/AuthContext'
import './App.css'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()
    if (loading) return null
    if (!user) return <Navigate to="/signin" />
    return children
}

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    {/* Public Routes with Navbar/Footer */}
                    <Route path="/*" element={
                        <>
                            <Navbar />
                            <main className="main-content">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/destinations" element={<Destinations />} />
                                    <Route path="/signin" element={<Signin />} />
                                    <Route path="/signup" element={<Signup />} />
                                    <Route path="*" element={<Navigate to="/" />} />
                                </Routes>
                            </main>
                            <Footer />
                        </>
                    } />

                    {/* Protected Dashboard Route */}
                    <Route path="/dashboard/*" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                </Routes>
            </div>
        </Router>
    )
}

export default App
