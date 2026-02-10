import React, { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import DestinationCard from './DestinationCard'
import ServiceDetailModal from './ServiceDetailModal'

const FlightsSection = () => {
    const { data: flights, loading, error } = useFirestore('flights', {
        where: ['status', '==', 'published']
    })
    const [selectedItem, setSelectedItem] = useState(null)

    if (error) {
        console.error('Flights fetch error:', error)
    }

    // Show exactly 4
    const visibleFlights = flights.slice(0, 4)

    if (loading) return null
    if (visibleFlights.length === 0) return null

    return (
        <section className="flights-section section container">
            <div className="section-header">
                <h2>Featured Flights</h2>
                <p>Great deals on domestic and international flights</p>
            </div>

            <div className="mobile-slider hide-scrollbar">
                {visibleFlights.map(item => (
                    <DestinationCard
                        key={item.id}
                        item={{
                            ...item,
                            name: `${item.from} to ${item.to}`,
                            destination: item.to,
                            price: item.priceRange, // DestinationCard handles number/string differently, but we'll adapt
                            pax: item.type === 'return' ? 'Return' : 'One-way'
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

export default FlightsSection
