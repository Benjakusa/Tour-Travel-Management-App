import React, { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import DestinationCard from './DestinationCard'
import ServiceDetailModal from './ServiceDetailModal'

const HotelsSection = () => {
    const { data: hotels, loading, error } = useFirestore('hotels', {
        where: ['status', '==', 'published']
    })
    const [selectedItem, setSelectedItem] = useState(null)

    if (error) {
        console.error('Hotels fetch error:', error)
    }

    // Show exactly 4
    const visibleHotels = hotels.slice(0, 4)

    if (loading) return null
    if (visibleHotels.length === 0) return null

    return (
        <section className="hotels-section section container">
            <div className="section-header">
                <h2>Featured Hotels</h2>
                <p>Relax in our curated selection of top-rated hotels</p>
            </div>

            <div className="mobile-slider hide-scrollbar">
                {visibleHotels.map(item => (
                    <DestinationCard
                        key={item.id}
                        item={{
                            ...item,
                            destination: item.location,
                            price: item.pricePerNight,
                            pax: 'Room'
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

export default HotelsSection
