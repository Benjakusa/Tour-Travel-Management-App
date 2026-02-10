import React from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { BarChart3, PieChart, TrendingUp, Users, DollarSign, Download } from 'lucide-react'
import './ReportsModule.css'

const ReportsModule = () => {
    const { data: bookings } = useFirestore('bookings')
    const { data: inquiries } = useFirestore('inquiries')
    const { data: packages } = useFirestore('packages')

    const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.totalPrice), 0)
    const pendingRevenue = bookings.reduce((sum, b) => sum + Number(b.balance), 0)
    const conversionRate = inquiries.length > 0 ? ((bookings.length / inquiries.length) * 100).toFixed(1) : 0

    const destinationStats = bookings.reduce((acc, curr) => {
        const dest = curr.serviceName || 'Unknown'
        if (!acc[dest]) {
            acc[dest] = { name: dest, bookings: 0, revenue: 0 }
        }
        acc[dest].bookings += 1
        acc[dest].revenue += Number(curr.totalPrice || 0)
        return acc
    }, {})

    const sortedDestinations = Object.values(destinationStats)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)

    return (
        <div className="reports-module">
            <div className="module-header">
                <h1>Performance Reports</h1>
                <button className="btn btn-secondary">
                    <Download size={18} /> Export PDF Report
                </button>
            </div>

            <div className="reports-grid">
                <div className="report-card main">
                    <div className="card-lbl">Financial Overview</div>
                    <div className="rev-stats">
                        <div className="stat">
                            <small>Total Booking Value</small>
                            <h2>KES {totalRevenue.toLocaleString()}</h2>
                        </div>
                        <div className="stat">
                            <small>Outstanding Balances</small>
                            <h2 className="debt">KES {pendingRevenue.toLocaleString()}</h2>
                        </div>
                    </div>
                    <div className="chart-placeholder">
                        <TrendingUp size={48} />
                        <p>Revenue Trends (Visual Chart Placeholder)</p>
                    </div>
                </div>

                <div className="report-side">
                    <div className="report-card small">
                        <div className="card-lbl">Conversion Analysis</div>
                        <div className="stat-big">
                            {conversionRate}%
                            <small>Inquiry to Booking</small>
                        </div>
                    </div>
                    <div className="report-card small">
                        <div className="card-lbl">Inventory Status</div>
                        <div className="stat-big">
                            {packages.length}
                            <small>Total Travel Packages</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="data-table-report">
                <h3>Top Performing Services</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Service/Destination</th>
                            <th>Bookings</th>
                            <th>Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedDestinations.map((dest, idx) => (
                            <tr key={idx}>
                                <td>{dest.name}</td>
                                <td>{dest.bookings}</td>
                                <td>KES {dest.revenue.toLocaleString()}</td>
                            </tr>
                        ))}
                        {sortedDestinations.length === 0 && (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center' }}>No booking data available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReportsModule
