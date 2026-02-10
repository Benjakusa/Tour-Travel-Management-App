import React, { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import DestinationCard from './DestinationCard'
import ServiceDetailModal from './ServiceDetailModal'

const TransfersSection = () => {
    const { data: transfers, loading, error } = useFirestore('transfers', {
        where: ['status', '==', 'published']
    })
    const [selectedItem, setSelectedItem] = useState(null)

    if (error) {
        console.error('Transfers fetch error:', error)
    }

    // Show exactly 4
    const visibleTransfers = transfers.slice(0, 4)

    if (loading) return null
    if (visibleTransfers.length === 0) return null

    return (
        <section className="transfers-section section container">
            <div className="section-header">
                <h2>Reliable Transfers</h2>
                <p>Comfortable and safe transportation across the region</p>
            </div>

            <div className="mobile-slider hide-scrollbar">
                {visibleTransfers.map(item => (
                    <DestinationCard
                        key={item.id}
                        item={{
                            ...item,
                            name: item.title,
                            pax: `${item.capacity} Seats`
                        }}
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

export default TransfersSection
