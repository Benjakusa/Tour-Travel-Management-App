import React from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, Calendar, MessageSquare, Users, Settings, LogOut, ChevronRight, Hotel, Plane, FileText, Globe, Truck, Image } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import DashboardHome from './DashboardHome'
import HeroesModule from './HeroesModule'
import PackagesModule from './PackagesModule'
import HotelsModule from './HotelsModule'
import FlightsModule from './FlightsModule'
import InquiriesModule from './InquiriesModule'
import BookingsModule from './BookingsModule'
import StaffModule from './StaffModule'
import VisasModule from './VisasModule'
import TransfersModule from './TransfersModule'
import ReportsModule from './ReportsModule'
import SettingsModule from './SettingsModule'
import { seedData } from '../services/seedService'
import './Dashboard.css'

const Dashboard = () => {
    const { user, logout, role } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/signin')
    }

    return (
        <div className="dashboard-container">
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <img src="/akotheelogo.png" alt="Akothee Safaris" className="sidebar-logo" />
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/dashboard" end>
                        <LayoutDashboard size={20} /> Overview
                    </NavLink>
                    <NavLink to="/dashboard/heroes">
                        <Image size={20} /> Hero Slides
                    </NavLink>
                    <NavLink to="/dashboard/packages">
                        <Package size={20} /> Packages
                    </NavLink>
                    <NavLink to="/dashboard/hotels">
                        <Hotel size={20} /> Hotels
                    </NavLink>
                    <NavLink to="/dashboard/flights">
                        <Plane size={20} /> Flights
                    </NavLink>
                    <NavLink to="/dashboard/visas">
                        <Globe size={20} /> Visas
                    </NavLink>
                    <NavLink to="/dashboard/transfers">
                        <Truck size={20} /> Transfers
                    </NavLink>
                    <NavLink to="/dashboard/inquiries">
                        <MessageSquare size={20} /> Inquiries
                    </NavLink>
                    <NavLink to="/dashboard/bookings">
                        <Calendar size={20} /> Bookings
                    </NavLink>
                    <NavLink to="/dashboard/reports">
                        <FileText size={20} /> Reports
                    </NavLink>

                    {role === 'admin' && (
                        <>
                            <div className="nav-divider">Admin</div>
                            <NavLink to="/dashboard/staff">
                                <Users size={20} /> Staff Management
                            </NavLink>
                            <NavLink to="/dashboard/settings">
                                <Settings size={20} /> Site Settings
                            </NavLink>
                        </>
                    )}
                </nav>

                <div className="sidebar-footer">
                    {role === 'admin' && (
                        <div className="admin-tools">
                            <button className="btn-seed" onClick={() => seedData()}>
                                Seed Sample Data
                            </button>
                        </div>
                    )}
                    <div className="user-info">
                        <div className="user-avatar">{user?.name?.charAt(0)}</div>
                        <div className="user-details">
                            <span>{user?.name}</span>
                            <small>{role}</small>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="btn-logout">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-topbar">
                    <div className="breadcrumb">
                        Dashboard <ChevronRight size={16} /> {window.location.pathname.split('/').pop()}
                    </div>
                    <div className="topbar-actions">
                        <span>Welcome, {user?.name}</span>
                    </div>
                </header>

                <div className="dashboard-content">
                    <Routes>
                        <Route path="/" element={<DashboardHome />} />
                        <Route path="/heroes" element={<HeroesModule />} />
                        <Route path="/packages" element={<PackagesModule />} />
                        <Route path="/hotels" element={<HotelsModule />} />
                        <Route path="/flights" element={<FlightsModule />} />
                        <Route path="/visas" element={<VisasModule />} />
                        <Route path="/transfers" element={<TransfersModule />} />
                        <Route path="/inquiries" element={<InquiriesModule />} />
                        <Route path="/bookings" element={<BookingsModule />} />
                        <Route path="/staff" element={<StaffModule />} />
                        <Route path="/reports" element={<ReportsModule />} />
                        <Route path="/settings" element={<SettingsModule />} />
                    </Routes>
                </div>
            </main>
        </div>
    )
}

export default Dashboard
