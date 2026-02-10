import React from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { MessageSquare, Package, Calendar, TrendingUp } from 'lucide-react'
import './DashboardHome.css'

const DashboardHome = () => {
    const { data: inquiries } = useFirestore('inquiries')
    const { data: packages } = useFirestore('packages')
    const { data: bookings } = useFirestore('bookings')

    const totalRevenue = bookings.reduce((acc, curr) => acc + Number(curr.totalPrice || 0), 0)

    const stats = [
        { title: 'New Inquiries', value: inquiries.filter(i => i.status === 'new').length, icon: <MessageSquare />, color: '#3b82f6' },
        { title: 'Active Packages', value: packages.filter(p => p.status === 'published').length, icon: <Package />, color: '#10b981' },
        { title: 'Confirmed Bookings', value: bookings.length, icon: <Calendar />, color: '#f59e0b' },
        { title: 'Total Revenue', value: `KES ${totalRevenue.toLocaleString()}`, icon: <TrendingUp />, color: '#8b5cf6' }
    ]

    return (
        <div className="dashboard-home">
            <div className="stats-grid">
                {stats.map((stat, idx) => (
                    <div key={idx} className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <h3>{stat.title}</h3>
                            <p className="stat-value">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="recent-activity">
                <h2>Recent Inquiries</h2>
                <div className="activity-list">
                    {inquiries.slice(0, 5).map(item => (
                        <div key={item.id} className="activity-item">
                            <div className="item-info">
                                <strong>{item.name}</strong>
                                <span>{item.serviceType} enquiry</span>
                            </div>
                            <div className="item-meta">
                                <span className={`status-badge ${item.status}`}>{item.status}</span>
                                <small>{item.createdAt?.toDate?.().toLocaleDateString() || 'Just now'}</small>
                            </div>
                        </div>
                    ))}
                    {inquiries.length === 0 && <p className="no-data">No inquiries yet.</p>}
                </div>
            </div>
        </div>
    )
}

export default DashboardHome
