import React, { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import DestinationCard from './DestinationCard'
import ServiceDetailModal from './ServiceDetailModal'
import './VisaServices.css'

const VisaServices = () => {
    const { data: visas, loading, error } = useFirestore('visas', {
        where: ['status', '==', 'published']
    })
    const [selectedItem, setSelectedItem] = useState(null)

    if (error) {
        console.error('VisaServices fetch error:', error)
    }

    // Show exactly 4
    const visibleVisas = visas.slice(0, 4)

    if (loading) return null
    if (visibleVisas.length === 0) return null

    return (
        <section className="visa-services section container">
            <div className="section-header">
                <h2>Visa Services</h2>
                <p>Hassle-free visa processing for your international travels</p>
            </div>

            <div className="mobile-slider hide-scrollbar">
                {visibleVisas.map(visa => (
                    <DestinationCard
                        key={visa.id}
                        item={{
                            ...visa,
                            name: visa.country,
                            destination: visa.type,
                            pax: visa.processingTime
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

export default VisaServices
