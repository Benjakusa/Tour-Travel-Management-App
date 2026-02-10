import React, { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import DestinationCard from './DestinationCard'
import ServiceDetailModal from './ServiceDetailModal'
import './HotDeals.css'

const HotDeals = () => {
    const { data: hotDeals, loading, error } = useFirestore('packages', {
        where: ['type', '==', 'hot_deal']
    })
    const [selectedItem, setSelectedItem] = useState(null)

    if (error) {
        console.error('HotDeals fetch error:', error)
    }

    // Show exactly 4
    const visibleDeals = hotDeals.slice(0, 4)

    if (loading) return null
    if (visibleDeals.length === 0) return null

    return (
        <section className="hot-deals section container">
            <div className="section-header">
                <span className="deal-badge">Limited Time</span>
                <h2>Hot Deals</h2>
                <p>Unbeatable prices for a limited time only</p>
            </div>

            <div className="mobile-slider hide-scrollbar">
                {visibleDeals.map(item => (
                    <DestinationCard
                        key={item.id}
                        item={{ ...item, displayPrice: `KES ${Number(item.price).toLocaleString()}` }}
                        onViewDetails={setSelectedItem}
                    />
                ))}
            </div>

            <ServiceDetailModal
                item={selectedItem}
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </section>
    )
}

export default HotDeals
